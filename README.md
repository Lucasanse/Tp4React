# IUPI - Catálogo de Juegos 

IUPI es una aplicación web desarrollada en **React** que funciona como un catálogo interactivo de juegos y materiales educativos e inclusivos. La plataforma está diseñada para acompañar a padres, docentes y profesionales en el proceso de enseñanza a través de materiales didácticos.

## Características Principales

* **Catálogo Dinámico**: Visualización de productos obtenida a través de una API REST (MockAPI).
* **Búsqueda en Tiempo Real**: Barra de búsqueda funcional que filtra los artículos por nombre.
* **Scroll Infinito**: Implementación de carga progresiva de productos mediante `Intersection Observer`.
* **Gestión de Favoritos**: Sistema para guardar y eliminar productos favoritos con persistencia de datos en el navegador utilizando `localStorage`.
* **Soporte Multilingüe (i18n)**: Interfaz disponible en Español e Inglés, permitiendo el cambio de idioma de forma instantánea.
* **Navegación Intuitiva**: Uso de rutas dinámicas para ver el detalle específico de cada producto.
* **Diseño Responsive**: Interfaz adaptable a dispositivos móviles y escritorio utilizando **Tailwind CSS**.

## Tecnologías utilizadas: 

* **React**: Biblioteca principal para la interfaz de usuario.
* **Vite**: Herramienta de construcción para un desarrollo rápido.
* **React Router**: Gestión de navegación y rutas de la aplicación.
* **Tailwind CSS**: Framework de utilidades CSS para el estilizado.
* **i18next**: Librería para la internacionalización y manejo de traducciones.
* **MockAPI**: Servicio utilizado para simular el backend y la persistencia de productos.

## Estructura del Proyecto

* `Components/`: Contiene los componentes reutilizables como el Header, Footer, ItemCard y SearchBar.
* `pages/`: Define las vistas principales: Home, Detalles, Favoritos y Sobre Nosotros.
* `services/`: Lógica para el consumo de la API y el manejo del LocalStorage.
* `locales/`: Archivos JSON con las traducciones para el soporte multiidioma.
* `assets/`: Recursos estáticos como imágenes y logotipos.

## Integrantes 

* **Lian Ivan Sinchez FAI-4202**
* **Lucas San Segundo FAI-1921**
* **Joaquin Ignacio Castillo FAI-5521**