import { loadCss } from '../utils/loadCss.js';
import { get, remove, update } from "./requests.js";

let access = null;
const URL_DATA = 'http://localhost:3000/'

export async function render() {

    access = JSON.parse(sessionStorage.getItem('eventAccess'));
    loadCss('styles/create.css');
    loadCss('styles/events.css');
    const id = access.id;
    const res = await fetch(`${URL_DATA}/events/${id}`);
    const event = await res.json();

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
      <form id="edit-event" class="bg-white p-5 rounded shadow-sm w-50">
        <h3 class="mb-4 text-center">Edit Event</h3>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" id="name" name="name" placeholder="${event.name}" class="form-control">
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
    `

}

export function afterRender() {

    const signOut = document.getElementById('sign-out');
    signOut.addEventListener('click', (e) => {
        sessionStorage.clear();
        window.location.href = '#/';
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


    const formUpdate = document.getElementById('formUpdate');
    if (formUpdate) {
        formUpdate.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(formUpdate);

            let data = {}

            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }

            if (!data.name.trim()) {
                alert('You can not leave the event without name');
                return;
            }

            update(data, 'events', id);
            window.location.href = "#/dashboard";

        })

    }

    const deleteEvent = document.getElementById('deleteevent');
    if (deleteEvent) {
        deleteEvent.addEventListener('click', (e) => {
            e.preventDefault();
            const val = confirm('Are you sure you wan to delete the event?')

            if (val) {
                remove('events', id);
                window.location.href = "#/dashboard";
            }

        })
    }

    
}