# Backend NodeJS - Proyecto Final

## 📋 Descripción
API REST desarrollada en Node.js con Express como proyecto final del curso de Backend. Implementa un sistema completo de autenticación y gestión de productos con arquitectura MVC y múltiples métodos de autenticación.

## 🚀 Tecnologías Utilizadas
- **Node.js** & **Express.js** - Framework web
- **Firebase Firestore** - Base de datos NoSQL
- **JWT (jsonwebtoken)** - Autenticación stateless
- **bcrypt** - Encriptación de contraseñas
- **cookie-session** - Manejo de sesiones
- **CORS** - Configuración de políticas de origen cruzado
- **dotenv** - Variables de entorno

## 🏗️ Arquitectura del Proyecto
```
src/
├── config/           # Configuración de Firebase
├── controllers/      # Lógica de controladores
├── middlewares/      # Middlewares de autenticación
├── models/          # Modelos de datos
├── routes/          # Definición de rutas
└── services/        # Lógica de negocio
```

## 🔐 Sistemas de Autenticación
El proyecto implementa **dos métodos de autenticación**:

### 1. Autenticación por Sesión (Web)
- Utiliza `cookie-session` para aplicaciones web tradicionales
- Almacena JWT en la sesión del servidor
- Ideal para aplicaciones con server-side rendering

### 2. Autenticación Bearer Token (API)
- Implementa JWT en headers `Authorization: Bearer <token>`
- Completamente stateless para APIs REST
- Perfecto para aplicaciones móviles y SPAs

## 📚 Endpoints Principales

### Autenticación
```http
POST /auth/register     # Registro de usuario
POST /auth/login        # Login (devuelve JWT)
POST /auth/logout       # Logout (limpia sesión)
DELETE /auth/:id        # Eliminar usuario (requiere auth)
```

### Productos
```http
GET /api/products           # Obtener todos los productos
GET /api/products/:id       # Obtener producto por ID
POST /api/products/create   # Crear nuevo producto
DELETE /api/products/:id    # Eliminar producto
GET /api/products/search/:name  # Buscar productos
```

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/MaximoAPS/backend-final-proyect.git
cd backend-final-proyect
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear archivo `.env` basado en `.env-example`:
```env
PORT=3000
JWT_SECRET_KEY=tu_clave_secreta_jwt
COOKIE_KEY=tu_clave_secreta_cookie
# Firebase configuration
FIREBASE_PROJECT_ID=tu_proyecto_id
FIREBASE_PRIVATE_KEY=tu_clave_privada
FIREBASE_CLIENT_EMAIL=tu_email_cliente
```

### 4. Ejecutar el servidor
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 🔧 Uso de la API

### Ejemplo de Login
```javascript
// Login
const response = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        emailOrName: 'usuario@email.com',
        password: 'password123'
    })
});

const { token } = await response.json();
```

### Ejemplo de Petición Autenticada
```javascript
// Obtener productos con Bearer token
const products = await fetch('/api/products', {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});
```

## 🛡️ Seguridad Implementada
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Validación de JWT tokens
- ✅ Middleware de autenticación robusto
- ✅ Manejo seguro de variables de entorno
- ✅ Validación de permisos de usuario
- ✅ Configuración CORS apropiada

## 📁 Características Destacadas
- **Arquitectura MVC** bien estructurada
- **Doble sistema de autenticación** (sesión + Bearer token)
- **Manejo de errores** consistente y profesional
- **Validaciones** en middlewares y controladores
- **Código modular** y reutilizable
- **Configuración** flexible con variables de entorno

## 🚀 Deployment
El proyecto está configurado para ser desplegado en servicios como:
- Heroku
- Railway
- Render
- AWS EC2

## 👨‍💻 Autor
**Máximo Pere** - Proyecto Final Curso Backend NodeJS

---
*Este proyecto demuestra el dominio de conceptos fundamentales del desarrollo backend: APIs REST, autenticación, bases de datos NoSQL, arquitectura MVC y mejores prácticas de seguridad.* 