// router.js
import { auth } from './services/auth.js';

const routes = {
  '/': () => import('./scripts/login.js'),
  '/register': () => import('./scripts/register.js'),
  '/dashboard': () => import('./scripts/events.js'),
  '/dashboard/events/create': () => import('./scripts/create.js'),
  '/dashboard/events/edit': () => import('./scripts/edit.js'),
  '/dashboard/events/enroll': () => import('./scripts/enroll.js')
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