# 📇 Contact Manager Web App

Este proyecto es una aplicación web con un CRUD completo para gestionar una lista de contactos. Está desarrollada con **Node.js**, **Express** y utiliza **SQLite3** como base de datos ligera. El frontend y el backend están organizados en carpetas separadas dentro del mismo repositorio.

---

## 🚀 Características

- ✏️ Crear, leer, actualizar y eliminar contactos
- 🔍 Buscar contactos fácilmente
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

## 📁 Estructura del proyecto
```bash
contactList/
│
├── database/          # Archivos relacionados con SQLite3
│
├── images/            # Imágenes utilizadas en la app (por ejemplo, fotos de contacto)
│
├── src/               # Carpeta principal del proyecto
│   ├── app.js         # Archivo principal del backend (Express)
│   │
│   ├── frontend/      # Frontend de la aplicación
│   │   ├── scripts/   # Scripts JS del lado del cliente
│   │   │   └── index.js
│   │   │
│   │   └── src/       # HTML u otros recursos del frontend
│   │       └── index.html
│
├── package.json       # Configuración y dependencias del backend
└── README.md
```

