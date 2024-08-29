## Folder structure

```md
hitme.to/
│
├──actions/
|  └──register.ts
|
├── public/                    
|
├─app/
│   ├── (marketing)/
│   ├── [username]
│   ├── dashboard/
│   ├── context/
│   │     └── provider.ts
│   ├── register/
│   ├── login/
│   ├── api/
│   │    └── auth/
│   │    │     └── [...nextauth]
│   │    ├─ user/
│   │    │     └──[id]
│   │               
│   ├── not-found.ts
│   ├── error.ts          
│   └── layout.ts
│
├──components/
│   ├── ui/        
│   └── layout/
│
├──lib/
│   ├── mongodb.ts
│   ├── auth.ts        
│   └── utils.ts
│
├──models/
│   └── User.ts
├──types/
│  └── next-auth.d.ts
│
├──middleware.ts
├── .env                        
├── .env.local                        
├── next.config.ts              
├── .prettierrc              
├── package.json                
└── README.md                   
  
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
