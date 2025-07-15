import { loadCss } from '../utils/loadCss.js';

export function render() {

    loadCss('styles/login.css');

    return `

<main>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <form id="login-form" class="auth-form">
          <h3 class="text-center mb-4">Login</h3>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email">
          </div>
          <div class="mb-4">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" name="password">
          </div>
          <button type="submit" class="btn btn-purple w-100">Log in</button>
        </form>
        
        <p class="text-secondary text-center mt-4">Don't have an account? <a id="register">Register</a></p>
      </div>
</main>
    `
}

export function afterRender() {
  const loginForm = document.getElementById('login-form');
  const register = document.getElementById('register')

  if (register) {
    register.addEventListener('click', (e) => {
      window.location.href = '#/register';
    })
  }
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(loginForm);
      let data = {};
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }

      if (!data.email || !data.password) {
        alert("There are blank spaces");
        return;
      }

      const emailFetch = await fetch(`http://localhost:3000/users?email=${data.email}`);
      const emailResponse = await emailFetch.json();

      if (emailResponse[0]) {
        if (emailResponse[0].password === data.password) {
          alert("Inicio de sesión exitoso.");
          sessionStorage.setItem('logged', "true");
          sessionStorage.setItem('session', JSON.stringify(emailResponse[0]));
          window.location.href = '#/dashboard';
        } else {
          alert("Email or Password are incorrect");
        }
      } else {
        alert("Email or Password are incorrect");
      }
    });
  }
}



