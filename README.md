# Sistema de Gestión Hospitalaria

Este es un proyecto enfocado en el diseño y la mejora de la Experiencia de Usuario (UX) y Accesibilidad para la gestión de clínicas y centros de salud. 

El sistema permite administrar información hospitalaria básica (pacientes y citas médicas) a través de una interfaz moderna, responsiva y accesible, construida con React y Ant Design.

## 🚀 Características Principales

- **Dashboard Administrativo:** Visualización de KPIs y gráficas de carga hospitalaria en tiempo real.
- **Gestión de Pacientes (CRUD):** Registro, lectura y eliminación de pacientes conectados a una base de datos simulada.
- **Agenda de Citas Médicas:** Sistema relacional para asignar consultas entre pacientes y médicos.
- **♿ Motor de Accesibilidad (Context API):** - Botón flotante para escalado dinámico de tipografía (aumento de texto).
  - Cambio de tema global a modo de "Alto Contraste" para reducir la fatiga visual.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React + Vite
- **UI Framework:** Ant Design (AnTD) + @ant-design/plots
- **Enrutamiento:** React Router Dom
- **Peticiones HTTP:** Axios
- **Backend / Base de Datos:** json-server (API REST simulada)

## ⚙️ Instrucciones de Instalación y Ejecución

Para correr este proyecto en tu entorno local, necesitas tener [Node.js](https://nodejs.org/) instalado. Sigue estos pasos:

### 1. Clonar el repositorio e instalar dependencias
Abre tu terminal y ejecuta:
```bash
git clone <URL_DE_TU_REPOSITORIO>
cd hospital-sistema
npm install