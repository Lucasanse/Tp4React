# IUPI - Catálogo de Juegos (Extension)

IUPI es una aplicación web desarrollada en **React** que funciona como un catálogo interactivo de juegos y materiales educativos e inclusivos. La plataforma está diseñada para acompañar a padres, docentes y profesionales en el proceso de enseñanza a través de materiales didácticos.

## Características Principales

* **Guardado perdurable**: Visualización de productos obtenida a través de una BD.
* **Manejo de productos**: Posiblidad de modificar, crear y eliminar productos.
* **Datos reales**: Cargados datos reales.
* **Gestión de Favoritos**: Sistema para guardar y eliminar productos favoritos con persistencia de datos en el navegador utilizando `BD`.
* **Soporte Multilingüe (i18n)**: Interfaz disponible en Español e Inglés, permitiendo el cambio de idioma de forma instantánea.

## Tecnologías utilizadas: 

* **React**: Biblioteca principal para la interfaz de usuario.
* **Vite**: Herramienta de construcción para un desarrollo rápido.
* **React Router**: Gestión de navegación y rutas de la aplicación.
* **Tailwind CSS**: Framework de utilidades CSS para el estilizado.
* **i18next**: Librería para la internacionalización y manejo de traducciones.
* **Express**: Framework minimalista para crear APIs y servidores en Node.js.
* **Prisma**: ORM moderno para interactuar con bases de datos, con tipado y migraciones.
* **PostgreSQL**: Base de datos relacional robusta y escalable.
* **Postman**: Herramienta para probar y documentar APIs de manera sencilla.

## Estructura del Proyecto

* `Controllers`: Contienen la lógica que recibe las peticiones desde las rutas y coordinan la respuesta.
* `Middlewares`: Funciones que se ejecutan antes de llegar al controlador.
* `Prisma`: Funciones necesarias para la correcta funcionalidad de prisma.
* `Routes`: Contienen la lógica de negocio y las consultas a la base de datos.
* `Services`: Recursos estáticos como imágenes y logotipos.
* `Validations`: Se encargan de validar los datos que llegan en las peticiones.

* **Tablero Kanban** : https://github.com/users/Lucasanse/projects/2/views/1
* **Link Vercel (este repo)**: https://tp4-react.vercel.app
* **Link Vercel global**: https://iupitp2react.vercel.app/

* Instalacion y configuracion:
* 1.Clonar el repositorio
* 2.Ejecutar npm install
* 3.Cloonar el otro repositorio
* 4.Ejecutar npm install
* 5.Creá un archivo .env en la raíz del proyecto con la configuración de la base de datos PostgreSQL
* 6.Cuando cambies el modelo en schema.prisma, generá y aplicá una migración npx prisma migrate dev --name nombre_migracion
* 7.Poblá la BD con la seed: npx prisma db seed
* 8.Ejecuta npm run dev en los dos proyectos
* 9.Enjoy the experience

* 
## Integrantes 

* **Lian Ivan Sinchez FAI-4202**
* **Lucas San Segundo FAI-1921**
* **Joaquin Ignacio Castillo FAI-5521**
