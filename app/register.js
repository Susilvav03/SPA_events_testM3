import { add } from './requests.js';

function render() {}

function afterRender() {

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


            await add(data, 'users');

            window.location.href = '#/dashboard'
            sessionStorage.setItem('logged', "true");
            sessionStorage.setItem('session', JSON.stringify(data));
        })
    };
}

afterRender()

