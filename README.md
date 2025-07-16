---

## 🌐 Frontend del proyecto

Puedes acceder al frontend funcional de este proyecto en el siguiente enlace:

🔗 [https://v0-gestutela.vercel.app/login](https://v0-gestutela.vercel.app/login)

### 👥 Cuentas de prueba disponibles:

```text
🛡️ Usuario Administrador:
  Correo:    admin@admin.com
  Contraseña: admin

🎓 Usuario Estudiante:
  Correo:    estudiante@prueba.com
  Contraseña: 123456789

👨‍🏫 Usuario Profesor:
  Correo:    profesor@prueba.com
  Contraseña: 123456789
````
**NOTA IMPORTANTE:** Este proyecto es un entorno de pruebas. NO subas documentos reales, confidenciales ni sensibles. Toda la información puede ser eliminada o reiniciada en cualquier momento.

# 🛠️ Backend – Prototipo "Panyqueso"

Este es un backend prototipo desarrollado con **Node.js**, **TypeScript**, **Express** y **PostgreSQL**. Utiliza Supabase, autenticación JWT y middleware para validaciones, subida de archivos, logs, entre otros.

## 🚀 Clonación e instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/tu-repo.git

# 2. Entra al directorio del proyecto
cd backend

# 3. Instala las dependencias
npm install
````

> Reemplaza el link del repositorio si corresponde.

---

## ⚙️ Configuración del entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
JWT_SECRET=ESCRIBE TU CLAVE SEGURA
SUPABASE_URL=https://xyzcompany.supabase.co
SUPABASE_KEY= CLAVE DEL SUPABASE
```

---

## 📦 Scripts disponibles

| Script          | Descripción                                               |
| --------------- | --------------------------------------------------------- |
| `npm run build` | Compila el código TypeScript a JavaScript (modo watch)    |
| `npm run dev`   | Ejecuta el servidor usando `nodemon` en modo desarrollo   |
| `npm test`      | Muestra un mensaje indicando que no hay pruebas definidas |

---

## 🧬 Estructura recomendada

```
backend/
├── src/
│   ├── index.ts
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── config/
├── build/             # Archivos compilados por TypeScript
├── .env
├── package.json
└── tsconfig.json
```

---

## 🧩 Dependencias clave

* `express`, `cors`, `jsonwebtoken`
* `pg`, `pg-promise`
* `bcrypt`, `bcryptjs`
* `multer`, `morgan`
* `@supabase/supabase-js`
* Tipado para todas las herramientas en `devDependencies`

---

## 👨‍💻 Autor

**Daniel Florez**
📫 [danflorezmartinez@gmail.com](mailto:danflorezmartinez@gmail.com)

---
