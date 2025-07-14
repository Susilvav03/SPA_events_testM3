import { auth } from './authorization.js';

const routes = {
  '/dashboard': () => import('./app/events.js'),
  '/login': () => import('./app/login.js'),
  '/register': () => import('./app/register.js'),
  '/dashboard/events/enrollments': () => import('./app/enroll.js'),
  '/dashboard/events/create': () => import('./app/create.js'),
  '/dashboard/events/edit': () => import('./app/edit.js')
};

export async function renderRoute(hash, app) {
  // Quita el "#" y separa ruta de query (?scroll=id)
  const [pathPart, queryPart] = hash.slice(1).split('?');
  
  const path = pathPart || '/';
  const load = routes[path];

  auth(path);

  if (!load) {
    app.innerHTML = '<h2>Página no encontrada</h2>';
    return;
  }

  const module = await load();
  const html = await module.render();
  app.innerHTML = html;

  if (typeof module.afterRender === 'function') {
    module.afterRender();
  }

  // Scroll suave a la sección indicada
  if (queryPart) {
    const params = new URLSearchParams(queryPart);
    const sectionId = params.get('scroll');
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }
}