## Folder structure

```md
hitme.to/
│
├── public/                     # Archivos estáticos (imágenes, fuentes, etc.)
│   └── images/
│       └── logo.png
│
├── src/
│   ├── components/             # Componentes reutilizables de UI
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── ProfileCard.js
│   │   ├── ServiceCard.js
│   │   └── ...
│   │
│   ├── lib/                    # Bibliotecas y funciones utilitarias
│   │   ├── mongodb.js           # Conexión a MongoDB
│   │   └── auth.js              # Funciones de autenticación personalizadas (opcional)
│   │
│   ├── models/                 # Modelos de MongoDB
│   │   ├── User.js
│   │   ├── Service.js
│   │   └── ...
│   │
│   ├── app/
│   │   ├── api/                # Rutas API (Server Actions)
│   │   │   ├── auth/           # Configuración de autenticación
│   │   │   │   └── [...nextauth]/route.js
│   │   │   ├── services/       # Servicios (CRUD)
│   │   │   │   ├── [id]/       # Rutas dinámicas para servicios
│   │   │   │   │   └── route.js
│   │   │   │   └── route.js
│   │   │   ├── users/          # Usuarios (CRUD)
│   │   │   │   └── route.js
│   │   │
│   │   ├── admin/
│   │   │   ├── page.js         # Página de administración de usuarios
│   │   │   └── [userId]/
│   │   │       └── page.js     # Página de detalles del usuario
│   │   │
│   │   ├── dashboard/
│   │   │   ├── page.js         # Página principal del dashboard
│   │   │   └── edit-profile/
│   │   │       └── page.js     # Página para editar el perfil
│   │   │
│   │   ├── layout.js           # Layout global para la aplicación
│   │   ├── error.js            # Página de error global
│   │   ├── not-found.js        # Página 404
│   │   └── [username]/          # Ruta dinámica para perfiles de usuario
│   │       └── page.js         # Página de perfil pública
│   │
│   └── styles/                 # Archivos CSS y Tailwind
│       ├── globals.css
│       └── tailwind.config.js
│
├── .env                        # Variables de entorno (MongoDB, autenticación, etc.)
├── next.config.js              # Configuración de Next.js
├── package.json                # Dependencias y scripts
└── README.md                   # Documentación del proyecto
  
  ```

## Frontend
- Tailwind
- Shadcn UI
- Lucide React

## Auth
- NextAuth
- GitHub
- Google

## Pricing
- Lemonsqueeze

## DataBase
- MongoDB
