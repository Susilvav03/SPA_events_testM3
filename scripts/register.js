import { loadCss } from '../utils/loadCss.js';
import { add } from './requests.js';

export function render() {

    loadCss('styles/register.css');

    return `

<main>
  <form id="register-form" class="auth-form">
    <h3 class="text-center mb-4">Register</h3>
    <div class="mb-3">
      <label for="fullname" class="form-label">Full Name</label>
      <input type="text" class="form-control" id="fullname" name="name">
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" id="email" name="email">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" name="password">
    </div>
    <button type="submit" class="btn btn-purple w-100">Register</button>
  </form>
</main>
    `

}

export function afterRender() {

    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(registerForm);

            let data = {}

            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }

            if (!data.email.trim() || !data.password.trim() || !data.name.trim()) {
                alert("Hay campos vacíos");
                return;
            }

            const emailFetch = await fetch(`http://localhost:3000/users?email=${data.email}`);
            const emailResponse = await emailFetch.json();

            if (emailResponse.length > 0) {
                alert("Correo ya registrado");
                return;
            }

            if (data.email.includes('@riwi.io') ) {
                data["role"] = "Admin";
            } else {
                data["role"] = "Visitor";
            }

            await add(data, 'users');

            window.location.href = '#/dashboard'
            sessionStorage.setItem('logged', "true");
            sessionStorage.setItem('session', JSON.stringify(data));
        })
    };
}

