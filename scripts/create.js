import { loadCss } from '../utils/loadCss.js';
import { add } from "./requests.js";

export function render() {

    loadCss('styles/create.css');
    loadCss('styles/events.css');
    return `

<div class="container-fluid">
    <div class="row">
      <div class="col-md-2 d-flex flex-column align-items-center py-4 sidebar">
        <h5 class="mb-4">Events</h5>
        <img src="https://i.pravatar.cc/100" class="user-pic mb-2" alt="User">
        <strong id="user-name"></strong>
        <small id="role" class="text-muted mb-4"></small>
        <nav class="nav flex-column w-100 text-center">
          <a id="button-visitors" class="nav-link" href=""></a>
          <a id="button-events" class="nav-link" href="#">Events</a>
          <a id="sign-out" class="nav-link text-muted" href="#">↪ Logout</a>
        </nav>
      </div>


<div class="col-md-10 d-flex justify-content-center align-items-center" style="height: 100vh;">
      <form id="create-event" class="bg-white p-5 rounded shadow-sm w-50">
        <h3 class="mb-4 text-center">Create Event</h3>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" id="name" name="name" class="form-control">
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea id="description" rows="3" name="description" class="form-control"></textarea>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="date" class="form-label">Date</label>
            <input type="date" id="date" name="date" class="form-control">
          </div>
          <div class="col-md-6 mb-3">
            <label for="capacity" class="form-label">Capacity</label>
            <input type="number" id="capacity" name="capacity" class="form-control">
          </div>
        </div>
        <div class="d-flex justify-content-end gap-2">
          <a id="cancel-button" href="index.html" class="btn btn-outline-purple">Cancel</a>
          <button type="submit" class="btn btn-purple">Save</button>
        </div>
      </form>
    </div>
  </div>
</div>
            
            `}

export function afterRender() {

    const signOut = document.getElementById('sign-out');
    signOut.addEventListener('click', (e) => {
        sessionStorage.clear();
        window.location.href = '#/';
    })

    const cancel = document.getElementById('cancel-button');
    signOut.addEventListener('click', (e) => {
        window.location.href = '#/dashboard';
    })

        async function renderPage() {
    
            const userName = document.getElementById('user-name');
            const role = document.getElementById('role')
            const button = document.getElementById('button-visitors')
    
            const userString = sessionStorage.getItem('session');
            const user = JSON.parse(userString);
    
            userName.innerHTML = user.name;
            role.innerHTML = user.role;
            console.log(user.role);
            
            if (user.role==='Visitor') {
                button.innerHTML = "Enrollments"
            }
            
        }

    const createEventForm = document.getElementById('create-event');

    createEventForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userString = sessionStorage.getItem('session');
        const user = JSON.parse(userString);

        const formData = new FormData(createEventForm);
        let data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        if (!data.name.trim() || !data.description.trim() || !data.date.trim() || !data.capacity.trim()) {
            alert("There are blank espaces")
        } else if (data.capacity <= 0) {
            alert("The capacity has to be a positive number")
        } else {
            createEventForm.reset();

            add(data, 'events')
            window.location.href = '#/dashboard';
        }

        
    });

    renderPage()
}



