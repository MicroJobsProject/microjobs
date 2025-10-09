# Microjobs

<!-- `>` **Selecciona tu Idioma:** [Inglés](README.md) 🔄 [Alemán](README.de.md) -->

## Objetivo del Proyecto

MicroJobs es una plataforma web que conecta a personas que necesitan servicios con profesionales que pueden realizarlos. El proyecto permite a los usuarios publicar y encontrar trabajos simples como pintar casas, podar césped, reparar ventanas, cuidar mascotas, entre otros.

Este proyecto representa el **trabajo final del Bootcamp Web Full Stack de KeepCoding**, integrando todos los conocimientos adquiridos a lo largo del programa en un producto completo y funcional.

**Funcionalidades principales:**

- Visualización pública de anuncios organizados por categorías
- Sistema de filtrado avanzado (por precio, tipo, categoría, nombre)
- Paginación de resultados
- Sistema completo de autenticación (registro, login, recuperación de contraseña)
- Recuperación de contraseña mediante email con token temporal
- Gestión completa de anuncios (crear, ver detalles, filtrar)
- Categorización dinámica de servicios
- Gestión de cuenta de usuario (editar contraseña, eliminar cuenta)
- Internacionalización con múltiples idiomas
- Rutas protegidas según el estado de autenticación
- Manejo profesional de errores (404, 500, 503)
- Interfaz responsive con Tailwind CSS

## Conocimientos Aprendidos y Trabajados

Este proyecto integra los conocimientos de los 12 módulos del bootcamp:

1. **JavaScript Basics** - Fundamentos de JavaScript aplicados en toda la lógica de la aplicación
2. **HTML & CSS** - Estructura semántica y diseño con Tailwind CSS
3. **SQL Fundamentals** - Diseño de base de datos relacional para usuarios y anuncios (backend)
4. **Node Backend** - API REST desarrollada con Node.js y Express (backend)
5. **Frontend JavaScript** - Lógica del cliente, manejo del DOM e interactividad
6. **Frontend Pro** - Optimización de rendimiento, code splitting y mejores prácticas
7. **Web Components** - Componentes reutilizables y arquitectura modular con React
8. **React Fundamentals** - Arquitectura base, componentes, props, estado y ciclo de vida
9. **TDD with JavaScript** - Testing, calidad de código y buenas prácticas de desarrollo
10. **Advanced Node Backend** - Autenticación JWT, seguridad, middleware y APIs avanzadas (backend)
11. **Advanced React** - Redux para gestión de estado, hooks personalizados, selectores memorizados con Reselect
12. **Server Setup** - Configuración de entornos, variables de entorno y despliegue

**Habilidades técnicas aplicadas:**

- Arquitectura de aplicación escalable con separación de responsabilidades
- Gestión de estado global con Redux y Redux Thunk
- Programación tipada con TypeScript para mayor robustez
- Sistema de internacionalización (i18n) completo
- Autenticación JWT con refresh tokens y manejo de cookies
- Consumo de API REST con Axios
- Diseño responsive y accesible
- Manejo de formularios y validaciones
- Rutas protegidas y control de acceso basado en roles

## Detalles de la Práctica

### Características de Usuario

**Usuarios No Registrados:**

- Ver todos los anuncios publicados
- Filtrar anuncios por categorías
- Ver detalles de cada anuncio
- Cambiar el idioma de la interfaz
- Registrarse en la plataforma
- Iniciar sesión

**Usuarios Registrados:**

- Todas las funcionalidades de usuarios no registrados
- Publicar nuevos anuncios de trabajo
- Editar su contraseña
- Eliminar su cuenta
- Opción "Recordar sesión" (30 días)
- Acceso a rutas protegidas

**Sistema de Recuperación:**

- Resetear contraseña mediante email con nodemailer
- Token de recuperación con expiración de 1 hora
- Enlaces seguros con hash SHA-256
- Auto-login opcional después del reset
- Verificación de cuenta por correo electrónico (pendiente)

### Categorías de Trabajos

El sistema maneja categorías dinámicas cargadas desde la API:

- 🎨 Pintura y Decoración
- 🌿 Jardinería y Paisajismo
- 🔧 Reparaciones del Hogar
- 🐕 Cuidado de Mascotas
- 🧹 Limpieza
- 📦 Mudanzas y Transporte
- 💻 Servicios Digitales
- Y más...

### Arquitectura del Frontend

**Gestión de Estado con Redux:**

- Actions asíncronas con Redux Thunk
- Selectores memoizados para optimización
- Estado global para autenticación, UI, anuncios y categorías

**Sistema de Filtrado:**

- Filtros múltiples combinables (nombre, precio mín/máx, tipo, categoría)
- Persistencia de filtros en URL params
- Reset de filtros con un click

**Componentes Reutilizables:**

- `AdvertCard` - Tarjeta de anuncio
- `AdvertFilter` - Sistema de filtrado
- `Pagination` - Navegación entre páginas
- `Alert` - Notificaciones del sistema
- `Page` - Layout wrapper

**Formularios:**

- Validación en cliente
- Manejo de estados de carga
- Feedback visual de errores

### Gestión de Errores

- **404 - Página No Encontrada**: Redirección cuando la ruta no existe
- **500 - Error del Servidor**: Pantalla de error cuando falla el servidor
- **503 - Servicio No Disponible**: Cuando el servicio está temporalmente caído

### Seguridad

- Rutas protegidas que requieren autenticación
- Tokens JWT almacenados en cookies HTTP-only
- Refresh tokens para renovación automática de sesión (7 días)
- Tokens de reset hasheados en base de datos
- Enlaces de recuperación con expiración temporal
- Validación de datos en cliente y servidor
- Protección contra XSS y CSR

## Tecnologías Utilizadas

- **Lenguajes:** TypeScript, JavaScript, HTML5, CSS3.
- **Dependencias a destacar (Node.js):** React, Redux, React Router, Axios, i18next, Tailwind CSS, Vite.

## Instrucciones de Instalación, Configuracion y de Uso

### 1. Requisitos de Software

- **[Node.js](https://nodejs.org/en/download/)** (**Node:** >=v24.8.0)
- **[Git](https://git-scm.com/downloads)** (2.48.1)
- **[Visual Studio Code](https://code.visualstudio.com/)** (1.104.2)
- **[microjobs-api (API REST)](https://github.com/MicroJobsProject/microjobs-api.git)**

> **📝 Nota:** Este proyecto **depende** de la API REST `nodepop-api`. Para poder interactuar con la base de datos simulada, es **primordial** levantar primero el servidor que pone en funcionamiento a la API.

### 2. Clonación del Repositorio

```bash
git clone https://github.com/MicroJobsProject/microjobs.git

cd microjobs
```

### 3. Configuración de Variables de Entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000    # URL de tu API backend
VITE_APP_NAME=MicroJobs                    # Nombre de la aplicación

# Session & Authentication
VITE_REMEMBER_ME_DURATION_DAYS=30          # Duración de "recordar sesión"
VITE_REFRESH_TOKEN_DURATION_DAYS=7         # Duración del refresh token
VITE_DEFAULT_COOKIE_DURATION_DAYS=30       # Duración por defecto de cookies
```

> **⚠️ Importante:** Nunca subas el archivo `.env` a git. Solo sube `.env.example` como plantilla.

### 4. Comandos

```sh
# Instala las dependencias del proyecto.
npm install

# Inicia el servidor de desarrollo.
npm run dev

# Genera la carpeta dist para producción.
npm run build

# Corre Eslint en busca de errores.
npm run lint

# Previsualiza la compilación de producción localmente.
npm run preview

# Formatea el código con Prettier.
npm run format
```

### 5. Acceso a la Aplicación

Una vez iniciado el servidor de desarrollo, abre tu navegador en:

```sh
http://localhost:5173
```

## Recursos del Proyecto

- **Backend (API):** 🔗 [microjobs-api](https://github.com/MicroJobsProject/microjobs-api.git)
- **Vista Previa del Proyecto:** 👀 [Vista Previa](preview.md)

- **Documentación técnica:** 📚 [React](https://react.dev) | [Redux](https://redux.js.org) | [TypeScript](https://www.typescriptlang.org) | [Tailwind](https://tailwindcss.com)
- **Herramientas:** 📚 [Vite](https://vitejs.dev) | [React Router](https://reactrouter.com) | [Axios](https://axios-http.com) | [i18next](https://www.i18next.com)
- **Diseño:** 🎨 [Material Icons](https://fonts.google.com/icons) | [Google Fonts](https://fonts.google.com)

## Contribuciones y Licencias

Proyecto bajo licencia MIT. Uso y distribución libres con atribución. No se aceptan contribuciones externas, pero las sugerencias son bienvenidas.
