# IUPI - Catálogo de Juegos (Extension)

IUPI es una aplicación web desarrollada en **React** que funciona como un catálogo interactivo de juegos y materiales educativos e inclusivos. La plataforma está diseñada para acompañar a padres, docentes y profesionales en el proceso de enseñanza a través de materiales didácticos.

## Características Principales

* **Autenticación y Seguridad**: Sistema integrado de registro, inicio y cierre de sesión de usuarios utilizando JSON Web Tokens (JWT).
* **Protección de Datos**: Las contraseñas de los usuarios se encriptan (hash con bcrypt) antes de almacenarse en la base de datos para garantizar la seguridad.
* **Manejo de Productos**: Posibilidad de modificar, crear y eliminar productos en el catálogo.
* **Gestión de Favoritos Avanzada**: Sistema para guardar y eliminar productos favoritos, persistiendo la información directamente en la base de datos mediante una relación en Prisma, asociándola de manera exclusiva al usuario autenticado.
* **Rutas Protegidas**: Integración de un middleware de autenticación en el servidor para proteger endpoints privados, permitiendo administrar favoritos únicamente a usuarios que envíen un token JWT válido en el header `Authorization`.
* **Soporte Multilingüe (i18n)**: Interfaz disponible en Español e Inglés, permitiendo el cambio de idioma de forma instantánea. No aplica a los productos la traducción

## Endpoints de la API REST

### Productos (`/api/productos`)
* `GET /api/productos`: Obtiene la lista de todos los productos. Soporta query params para paginación (`page`, `limit`) y búsqueda por nombre (`name`).
* `GET /api/productos/:id`: Obtiene los detalles de un producto específico mediante su ID.
* `POST /api/productos`: Crea un nuevo producto validando los campos obligatorios.
* `PUT /api/productos/:id`: Actualiza la información de un producto existente.
* `DELETE /api/productos/:id`: Elimina un producto de la base de datos.

### Autenticación (`/api/auth`)
* `POST /api/auth/register`: Registra un nuevo usuario en la base de datos validando el email y hasheando la contraseña.
* `POST /api/auth/login`: Inicia sesión validando credenciales y devuelve el token de acceso (JWT).
* `POST /api/auth/logout`: Cierra la sesión activa del usuario.
* `GET /api/auth/me`: Obtiene los datos del usuario autenticado (requiere token válido).

### Favoritos (`/api/favoritos`) - *Requieren Autenticación*
* `GET /api/favoritos`: Lista todos los productos marcados como favoritos por el usuario autenticado.
* `POST /api/favoritos`: Agrega un producto a la lista de favoritos del usuario. Recibe el `productId` por body.
* `DELETE /api/favoritos/:productoId`: Elimina un producto específico de la lista de favoritos del usuario.
* `GET /api/favoritos/checker/:productoId`: Comprueba si un producto específico ya se encuentra en la lista de favoritos del usuario.

### General (Health Check)
* `GET /` o `GET /api/health`: Endpoint de prueba para verificar que el servidor esté en funcionamiento.


## Tecnologías Utilizadas 

* **React**: Biblioteca principal para la interfaz de usuario.
* **Vite**: Herramienta de construcción para un desarrollo rápido.
* **React Router**: Gestión de navegación y rutas de la aplicación.
* **Tailwind CSS**: Framework de utilidades CSS para el estilizado.
* **i18next**: Librería para la internacionalización y manejo de traducciones.
* **Express**: Framework minimalista para crear APIs y servidores en Node.js.
* **Prisma**: ORM moderno para interactuar con bases de datos, con tipado y migraciones. Se implementaron las entidades `User`, `Product` y `Favorite`.
* **PostgreSQL**: Base de datos relacional robusta y escalable.
* **JWT & bcrypt**: Tecnologías implementadas para la autenticación segura, manejo de sesiones y protección de contraseñas.
* **Postman**: Herramienta para probar y documentar APIs de manera sencilla.

## Estructura del Proyecto

* `Controllers`: Contienen la lógica que recibe las peticiones desde las rutas, procesan mediante los servicios y coordinan la respuesta.
* `Middlewares`: Funciones que se ejecutan antes de llegar al controlador (ej. `verificarToken`, `errorHandler`).
* `Prisma`: Modelado de base de datos (`schema.prisma`), cliente y scripts de seed.
* `Routes`: Contienen la lógica de enrutamiento y definición de endpoints públicos y protegidos.
* `Services`: Capa de abstracción para la lógica de negocio y consultas a base de datos (ej. `productosService`, `TokenService`).
* `Validations`: Se encargan de validar estrictamente los datos de entrada que llegan en los requests (`entity.validation.js`).

## Enlaces de Interés

* **Tablero Kanban**: [Ver Tablero](https://github.com/users/Lucasanse/projects/2/views/1)
**Tablero Kanban tp seguridad**: [Ver Tablero](https://github.com/users/Lucasanse/projects/3)
* **Deploy Vercel (este repositorio)**: [tp4-react.vercel.app](https://tp4-react.vercel.app)
* **Deploy Vercel Global**: [iupitp2react.vercel.app](https://iupitp2react.vercel.app/)

## Instalación y Configuración

1. Clonar este repositorio.
2. Ejecutar `npm install`.
3. Clonar el repositorio del frontend.
4. Ejecutar `npm install` en el proyecto del frontend.
5. Crear un archivo `.env` en la raíz del proyecto basándote en la configuración necesaria para la base de datos PostgreSQL (`DATABASE_URL`) y la clave secreta (`SECRETITO_CLAVE`).
6. Ejecutar las migraciones en la base de datos: `npx prisma migrate dev`.
7. Poblar la base de datos con información inicial (seed): `npx prisma db seed`.
8. Ejecutar el servidor con `npm run dev`.
9. ¡Disfrutar de la experiencia!

## Integrantes 

* **Lian Ivan Sinchez** (FAI-4202)
* **Lucas San Segundo** (FAI-1921)
* **Joaquin Ignacio Castillo** (FAI-5521)