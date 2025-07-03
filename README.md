# 🚀 Next15 Auth Starter

Boilerplate moderne pour Next.js, intégrant authentification, mailing, tests et tout ce dont tu as besoin pour démarrer rapidement un projet.


<br>
<div align="center">
  <img src="https://github.com/JTissot-Dev/next-boilerplate/blob/main/readme-illustration.gif?raw=true" width="100%">
</div>
<br>


## 🧰 Prérequis

- <a href="https://git-scm.com/downloads">Git</a>
- <a href="https://www.docker.com">Docker Desktop</a>


## 🔧 Technologies

- ![Next.js](https://img.shields.io/badge/Next.js%2015-000000?style=for-the-badge&logo=next.js&logoColor=white)
- ![Better-Auth](https://img.shields.io/badge/Better--Auth-4A90E2?style=for-the-badge&logo=auth0&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Shadcn/ui](https://img.shields.io/badge/Shadcn_ui-2563EB?style=for-the-badge&logo=react&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-0C344B?style=for-the-badge&logo=prisma&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
- ![Resend](https://img.shields.io/badge/Resend-FF3F4A?style=for-the-badge&logo=mailchimp&logoColor=white)
- ![Vitest](https://img.shields.io/badge/Vitest-6E3AA7?style=for-the-badge&logo=vitest&logoColor=white)
- ![Playwright](https://img.shields.io/badge/Playwright-000000?style=for-the-badge&logo=playwright&logoColor=white)

## 🧩 Feature based architecture

Le projet adopte une architecture modulaire par fonctionnalité, apportant scalabilité, lisibilité du code et meilleure maintenabilité.  
Chaque fonctionnalité est isolée dans un module autonome regroupant ses propres composants, hooks, logique métier, types et tests.  

        features                
            └── auth             
                 ├── api         // Hooks et logique d'appels API spécifiques à l'auth
                 │   
                 ├── components  // Composants React spécifiques à l'authentification
                 │   
                 ├── context.tsx // Context React spécifique à l'authentification
                 │   
                 ├── emails      // Templates d'emails pour l'authentification
                 │   
                 ├── hooks       // Hooks React personnalisés pour l'auth
                 │   
                 ├── types       // Types TypeScript spécifiques à l'authentification
                 │   
                 └── __tests__   
                       ├── e2e   
                       │   
                       └── units 
                       

## 🛠️ Installation & setup

### 1. Cloner le dépôt

```bash
git clone https://github.com/JTissot-Dev/next-boilerplate.git
cd next-boilerplate
```

## Mode développement

### Configuration des variables d'environnement

Créer un fichier `.env.dev` à la racine du projet et renseigner les variables suivantes :

```env
# Make sure all environment variables are set before starting docker-compose.dev
APP_ENV=dev

# Database
POSTGRES_HOST=database # This is the Docker database service name
POSTGRES_PORT=5432
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
DATABASE_URL=postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}?schema=public

# better-auth
BETTER_AUTH_SECRET= # You can generate here: https://www.better-auth.com/docs/installation
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID= # You can get them from the GitHub Developer Portal: https://github.com/settings/developers
GITHUB_CLIENT_SECRET= # You can get them from the GitHub Developer Portal: https://github.com/settings/developers
GOOGLE_CLIENT_ID= # You can get them by creating a new project in the Google Cloud Console: https://console.cloud.google.com/apis/dashboard
GOOGLE_CLIENT_SECRET= # You can get them by creating a new project in the Google Cloud Console: https://console.cloud.google.com/apis/dashboard
FACEBOOK_CLIENT_ID= # You can get them from the Facebook Developer Portal: https://developers.facebook.com/
FACEBOOK_CLIENT_SECRET= # You can get them from the Facebook Developer Portal: https://developers.facebook.com/

# resend email API service
RESEND_API_KEY= # Create your account on https://resend.com/home
```

### Démarrer l'application

**Via Make :**
```bash
# Premier démarrage ou si besoin de regénérer les images Docker
make build-dev

# Démarrage avec images existantes
make run-dev
```

**Ou via Docker Compose :**
```bash
# Premier démarrage ou si besoin de regénérer les images Docker
docker compose -f docker-compose.dev.yaml up --build --detach

# Démarrage avec images existantes
docker compose -f docker-compose.dev.yaml up --detach
```

### Génération des données de développement

**Via Make :**
```bash
make db:seed
```

**Ou via Docker :**
```bash
docker exec -it my-app-web-dev npm run prisma:seed
```

### Formatage du code local (Prettier)

**Via Make :**
```bash
make format
```

**Ou via Docker :**
```bash
docker exec -it my-app-web-dev npm run format
```

### Tests statiques du code en local

**Via Make :**
```bash
make lint
```

**Ou via Docker :**
```bash
docker exec -it my-app-web-dev npm run lint
```

## Tests locaux

### Tests unitaires

```bash
cd web
npm run test
```

### Tests end-to-end (e2e)

#### Configuration de l'environnement e2e

**1. Créer un fichier `.env.e2e.local`** (environnement pour l'écriture des tests en local) :

```env
# These environment variables will be used for local e2e testing only
# Make sure all environment variables are set before starting docker-compose.e2e.local
APP_ENV=test-e2e

# Database
POSTGRES_HOST=localhost # We keep localhost for local e2e testing
POSTGRES_PORT=5432
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
DATABASE_URL=postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}?schema=public

# better-auth
BETTER_AUTH_SECRET= # You can generate here: https://www.better-auth.com/docs/installation
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID= # You can get them from the GitHub Developer Portal: https://github.com/settings/developers
GITHUB_CLIENT_SECRET= # You can get them from the GitHub Developer Portal: https://github.com/settings/developers
GOOGLE_CLIENT_ID= # You can get them by creating a new project in the Google Cloud Console: https://console.cloud.google.com/apis/dashboard
GOOGLE_CLIENT_SECRET= # You can get them by creating a new project in the Google Cloud Console: https://console.cloud.google.com/apis/dashboard
FACEBOOK_CLIENT_ID= # You can get them from the Facebook Developer Portal: https://developers.facebook.com/
FACEBOOK_CLIENT_SECRET= # You can get them from the Facebook Developer Portal: https://developers.facebook.com/

# resend email API service
RESEND_API_KEY= # Create your account on https://resend.com/home

# Playwright
PLAYWRIGHT_BASE_URL=http://localhost:3000
```

**2. Créer un fichier `.env.dev.e2e`** (pour l'environnement Docker) :

```env
# These environment variables will be used for local e2e testing only
# Make sure all environment variables are set before starting docker-compose.e2e.local
APP_ENV=test-e2e

# Database
POSTGRES_HOST=database # for docker environment
POSTGRES_PORT=5432
POSTGRES_DB= # Set the same as your .env.e2e.local
POSTGRES_USER= # Set the same as your .env.e2e.local 
POSTGRES_PASSWORD= # Set the same as your .env.e2e.local 
DATABASE_URL=postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}?schema=public

# better-auth
BETTER_AUTH_SECRET= # You can generate here: https://www.better-auth.com/docs/installation
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID= # You can get them from the GitHub Developer Portal: https://github.com/settings/developers
GITHUB_CLIENT_SECRET= # You can get them from the GitHub Developer Portal: https://github.com/settings/developers
GOOGLE_CLIENT_ID= # You can get them by creating a new project in the Google Cloud Console: https://console.cloud.google.com/apis/dashboard
GOOGLE_CLIENT_SECRET= # You can get them by creating a new project in the Google Cloud Console: https://console.cloud.google.com/apis/dashboard
FACEBOOK_CLIENT_ID= # You can get them from the Facebook Developer Portal: https://developers.facebook.com/
FACEBOOK_CLIENT_SECRET= # You can get them from the Facebook Developer Portal: https://developers.facebook.com/

# resend email API service
RESEND_API_KEY= # Create your account on https://resend.com/home
```

#### Démarrage de l'environnement de test e2e

**Via Make :**
```bash
make test-dev-e2e
```

**Ou via Docker Compose :**
```bash
docker compose -f docker-compose.e2e.local.yaml up --build --detach
```

#### Lancement des tests e2e

```bash
cd web
npm run test:e2e:local
```
