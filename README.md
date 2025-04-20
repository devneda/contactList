# 📇 Web App de Contactos

Este proyecto es una aplicación web con un CRUD completo para gestionar una lista de contactos. Está desarrollada con **Node.js**, **Express** y utiliza **SQLite3** como base de datos ligera. El frontend y el backend están organizados en carpetas separadas dentro del mismo repositorio.

---

## 🚀 Características

- ✏️ Crear, leer, actualizar y eliminar contactos
- 👁️ Visualizar contactos fácilmente
- 🌐 Interfaz web amigable
- 💾 Persistencia de datos con SQLite3

---

## 🛠️ Tecnologías utilizadas

- Backend: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [SQLite3](https://www.sqlite.org/index.html)
- Frontend: HTML, Bootstrap5, JavaScript 
- Base de datos: SQLite3

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/devneda/contactList
cd contactList
```

### 2. Instalar dependencias

## Backend

```bash
cd backend
npm install
```
## Frontend

```bash
cd ../frontend
npm install
```
## ▶️ Cómo iniciar el proyecto

## Iniciar el servidor backend

```bash
cd backend
npm start
```
- Puedes aplicar lo mismo para inciar el frontend pero accediendo a su propia carpeta.
- **IMPORTANTE:** La carpeta **.\backend\images** puede que no esté creada cuando hagas un clone del repositorio, en ese caso, crea la carpeta para poder añadir **Imagenes**.

## 📁 Estructura del proyecto
```bash
contactList/
│
├── backend/                          # Backend con Node.js, Express y SQLite3
│   ├── database/                     # Base de datos SQLite
│   ├── images/                       # Carpeta donde se guardan las imágenes subidas
│   └── src/
│       └── app.js                    # Archivo principal del backend
│   └── package.json                  # Configuración y dependencias del backend
│
├── frontend/                         # Frontend de la aplicación
│   ├── scripts/                      # Scripts JS del cliente
│   │   ├── contacto.js
│   │   ├── dialogUtils.js
│   │   ├── documentUtils.js
│   │   ├── modify.js
│   │   └── registro.js
│   │
│   ├── src/                          # Páginas HTML de la app
│   │   ├── contacto.html
│   │   ├── modify.html
│   │   └── registro.html
│   │
│   └── package.json                  # Configuración y dependencias del frontend (si aplica)
│
├── .gitignore                        # Archivos ignorados por Git
└── README.md                         # Documentación del proyecto

```

