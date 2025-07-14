import { get } from "./requests.js";

function render() {}

function afterRender() {

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
    }

    async function renderEvents(data, user, events) {
        const role = user.role
        data.forEach(event => {
            
                const cardEvent = document.createElement("tr");
                cardEvent.idName = "card-event";

                let html = `
                <td>${event.name}</td>
                <td>${event.description}</td>
                <td>12</td>
                <td>08-Dec, 2021</td>
                <td>`

                if (role === "Admin") {
                    html += `<a href="#"><i class="bi bi-pencil-fill me-2"></i></a>
                    <a href="#"><i class="bi bi-trash-fill text-danger"></i></a>
                    </td>
                    `
                } else {
                    html += `<button class="btn btn-purple">Enroll</button>
                    </td>
                    `
                }
                cardEvent.innerHTML = html;
                
                events.appendChild(cardEvent);
            
        });
    }

    renderPage();
}
afterRender();