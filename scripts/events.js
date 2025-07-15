import { get } from "./requests.js";
import { loadCss } from '../utils/loadCss.js';

export function render() {

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
          <a id="button-events" class="nav-link active" href="#">Events</a>
          <a id="sign-out" class="nav-link text-muted" href="#">↪ Logout</a>
        </nav>
      </div>

    <div class="col-md-10 p-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>Events</h2>
          <a id="button-new" href="create.html" class="btn btn-purple"></a>
        </div>
        <table class="table table-hover bg-white rounded shadow-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Capacity</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="events-board">
            
          </tbody>
        </table>
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

        const eventsBoard = document.getElementById('events-board');
        const userName = document.getElementById('user-name');
        const role = document.getElementById('role')
        const button = document.getElementById('button-visitors')

        const data = await get('events');
        const userString = sessionStorage.getItem('session');
        const user = JSON.parse(userString);

        userName.innerHTML = user.name;
        role.innerHTML = user.role;
        console.log(user.role);
        
        if (user.role==='Visitor') {
            button.innerHTML = "Enrollments"
        }
        
        renderEvents(data, user, eventsBoard);
        manageEvents(data, user)
    }

  async function renderEvents(data, user, events) {
        const role = user.role
        data.forEach(event => {

                const cardEvent = document.createElement('tr');
                cardEvent.idName = `card-event${event.id}`;

                let html = `
                <td> ${event.name} </td>
                <td> ${event.description} </td>
                <td> ${event.capacity} </td>
                <td> ${event.date} </td>
                <td>`

                if (role === "Admin") {
                    html += `<a class="btn btn-purple" id="${event.id} edit-event" href="#">Edit</a>
                    </td>
                    `
                    const newEvent = document.getElementById('button-new')
                    newEvent.innerHTML = "ADD NEW EVENT"
                } else {
                    html += `<button class="btn btn-purple ">Enroll</button>
                    </td>
                    `
                }
                cardEvent.innerHTML = html;
                
                events.appendChild(cardEvent);
            
        });
    }

    

    function manageEvents(data, user) {
        const newEvent = document.getElementById('button-new')
        const edit = document.getElementById('edit-event')

        if (user.role=='Visitor') {

        }

        if (user.role=='Admin') {
            newEvent.addEventListener('click', (e) => {
              e.preventDefault();
                window.location.href = '#/dashboard/events/create';
            })
            edit.addEventListener('click', (e) => {
              e.preventDefault();
                const id = edit.target.id
                sessionStorage.setItem('eventAccess', JSON.stringify({ "id": id}));
                window.location.href = '#/dashboard/events/edit';
            })

        }
    }
    renderPage();
}