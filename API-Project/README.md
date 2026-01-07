# E-Commerce-API

## API NEST
- Instalar o nest

```
npm i -g @nestjs/cli
nest new minha-api-nest
# Escolha npm (ou yarn/pnpm se preferir)
cd minha-api-nest
```

- Rodar
```
npm run start:dev
```

- Instalar o Prisma, criar o prisma/prisma.service.ts
e prisma/prisma.module.ts e alterar o app.module.ts

```
npm i prisma --save-dev
npm i @prisma/client
npx prisma init
```

- Mudou algo no prisma rode
```
npx prisma migrate dev 
```

- Instalar validação (equivalente ao "Yup/Joi middleware" do Express) e alterar o main.ts 
```
- npm i class-validator class-transformer
```

- Comandos para criar controllers/modules/services
```
nest g module users
nest g controller users
nest g service users 
```

Primeira coisa que fiz foi criar a pasta src/common/exceptions;
E criar 3 arquivos: validation.exception.ts, not-found.exception.ts e index.ts;
para tratar os casos de erro


EXPLICAÇÃO DO GUARDS, STRATEGIES E DECORATORS
GUARDS: DECIDEM SE A REQUEST PASSSA OU NÃO
STRATEGIES: EXPLICAM QUEM É O USUARIO
DECORATORS: DECLARAM INTENÇÃO NA ROTA (REGRA)

QUANDO ALGUEM CHAMA UMA ROTA PROTEGIDA
Request
 → JwtAuthGuard
   → JwtStrategy
     → token válido?
        → injeta req.user
 → Controller
 → Service
