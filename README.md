# Events management

Es una aplicación web tipo SPA (Single Page Application) para la gestión de eventos, con funcionalidades de autenticación, registro de usuarios y enrollment a eventos o creación, edición y eliminación de los mismos. El proyecto está desarrollado en JavaScript puro y utiliza un archivo JSON como base de datos simulada.

## Características principales

- **Registro y autenticación de usuarios**: Permite a los usuarios crear una cuenta y acceder mediante login, con rol de admin si es un correo con dominio @riwi.io.
- **Gestión de eventos**: Los administradores pueden crear, editar y eliminar eventos.
- **Enrolamiento de eventos**: Es posible enrolarse a eventos con perfil de visitante.
- **SPA (Single Page Application)**: Navegación fluida entre páginas sin recargar el navegador, gracias al enrutador implementado.
- **Interfaz moderna**: Utiliza Bootstrap para una apariencia atractiva y responsiva.

## Estructura del proyecto

```
db.json                # Base de datos simulada (usuarios y notas)
index.html             # Página principal de la aplicación
router.js              # Enrutador SPA
assets/styles/         # Hojas de estilo CSS para cada página
scripts/               # Scripts JS para cada funcionalidad/página
services/auth.js       # Lógica de autenticación
utils/loadCss.js       # Utilidad para cargar CSS dinámicamente
```

## Instalación y ejecución


1. **Clona el repositorio**
   ```
   https://github.com/Susilvav03/SPA_events_testM3.git
   ```
2. **Abre el proyecto en VS Code o tu editor favorito.**
3. **Simula la API REST con JSON Server (opcional pero recomendado)**:
   - Instala JSON Server globalmente si no lo tienes:
     ```
     npm install -g json-server
     ```
   - Inicia el servidor con el archivo `db.json`:
     ```
     json-server --watch db.json --port 3000
     ```
   - Esto te permitirá realizar peticiones HTTP (GET, POST, PUT, DELETE) a `http://localhost:3000` como si tuvieras una API real.
4. **No requiere instalación de dependencias adicionales**: Todo el código es JavaScript puro y HTML/CSS. Solo necesitas abrir `index.html` en tu navegador.

## Uso

- Al abrir la aplicación, puedes registrarte o iniciar sesión.
- Una vez autenticado, accedes al dashboard donde puedes gestionar los eventos.
- La navegación entre páginas es instantánea gracias al enrutador SPA.

## Base de datos

El archivo `db.json` simula la base de datos, almacenando usuarios y eventos, especificando el tipo de rol de cada usuario (`Admin` o `Visitor`).
Además, usando [JSON Server](https://github.com/typicode/json-server) puedes convertir este archivo en una API RESTful local, facilitando el desarrollo y pruebas de las funcionalidades CRUD de la aplicación.

## Tecnologías utilizadas

- **JavaScript** (ES6 Modules)
- **HTML5**
- **CSS3** (Bootstrap)

## Autor

- Susana Silva Vallejo
- Clan: Ritchie
- CC: 1001685913

## Licencia

Este proyecto es de uso libre para fines educativos y personales.
