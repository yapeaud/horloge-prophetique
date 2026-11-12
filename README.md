# Horloge Prophétique

Site web du ministère **Horloge Prophétique** : présentation du ministère, podcasts, sujets de prière, bibliothèque (Horlolivre), réalisations, newsletter, dons et contact. Il comprend un espace d'administration pour gérer tout le contenu.

Le dépôt contient deux applications :

| Dossier | Rôle | Stack |
| --- | --- | --- |
| [`horloge-prophetique-Front/`](horloge-prophetique-Front/) | Site public et espace admin | React 19, Vite, React Router 7, Tailwind CSS 3, Axios |
| [`horloge-prophetique-Back/`](horloge-prophetique-Back/) | API REST | Node.js, Express 5, Prisma 7, PostgreSQL, JWT |

---

## Fonctionnalités

### Site public

| Section | Route | Contenu |
| --- | --- | --- |
| Accueil | `/` | Page d'accueil |
| À propos | `/a-propos` | Présentation du ministère |
| H-Réalisations | `/h-realisations` | Projets, équipe, témoignages, H-Médias |
| Podcasts | `/podcasts` | Épisodes (Spotify, Apple, Amazon ou hébergés en interne) |
| H-Inter | `/h-inter` | Sujets de prière mensuels et hebdomadaires, demandes de prière |
| Horlolivre | `/horlolivre` | Dévotions et librairie (livres) |
| Newsletter | `/newsletter` | Inscription à la newsletter |
| Contact | `/contact` | Formulaire de contact (envoi par e-mail) |
| Dons | `/donation` | Moyens de paiement (PayPal, Mobile Money, Wave…) |

### Espace d'administration (`/admin`)

Accessible après connexion sur `/login` avec un compte au rôle `ADMIN`. Il permet de :

- consulter le tableau de bord (statistiques) ;
- gérer les podcasts, sujets de prière, livres, membres de l'équipe et médias ;
- traiter les demandes de prière (en attente, traitée, archivée) ;
- suivre les dons et mettre à jour leur statut ;
- consulter les abonnés à la newsletter et les exporter en CSV.

---

## Prérequis

- **Node.js** 20 ou plus récent (testé avec Node 22)
- **npm**
- **PostgreSQL** (base locale ou hébergée)
- Un compte SMTP pour l'envoi des messages de contact (par exemple Gmail avec un *mot de passe d'application*)

---

## Installation

### 1. Cloner le dépôt

```bash
git clone <url-du-depot>
cd horloge-prophetique
```

### 2. Backend

```bash
cd horloge-prophetique-Back
npm install
cp .env.example .env
```

Renseignez ensuite le fichier `.env` :

| Variable | Description |
| --- | --- |
| `NODE_ENV` | `development` ou `production` |
| `PORT` | Port de l'API (5001 par défaut) |
| `DATABASE_URL` | Chaîne de connexion PostgreSQL |
| `JWT_SECRET` | Clé secrète de signature des jetons (longue et aléatoire) |
| `JWT_EXPIRES_IN` | Durée de validité des jetons, par exemple `7d` |
| `FRONTEND_URL` | URL du frontend, seule origine autorisée par CORS (ex. `http://localhost:5173`) |
| `BACKEND_URL` | URL publique de l'API |
| `SMTP_HOST`, `SMTP_PORT` | Serveur SMTP (ex. `smtp.gmail.com`, `587`) |
| `SMTP_USER`, `SMTP_PASS` | Identifiants SMTP |
| `CONTACT_EMAIL_TO` | Adresse qui reçoit les messages du formulaire de contact |

Créez les tables, puis le compte administrateur :

```bash
npx prisma migrate deploy   # applique les migrations (ou `npx prisma migrate dev` en développement)
npx prisma generate         # génère le client Prisma
npm run seed                # crée le compte administrateur initial
```

> **Important :** le script [`prisma/seed.js`](horloge-prophetique-Back/prisma/seed.js) crée un administrateur avec un mot de passe par défaut écrit dans le code. Changez ce mot de passe avant toute mise en production.

Démarrez l'API :

```bash
npm run dev     # développement, avec rechargement automatique (nodemon)
npm start       # production
```

L'API répond sur `http://localhost:<PORT>/api/`.

### 3. Frontend

Dans un second terminal :

```bash
cd horloge-prophetique-Front
npm install
cp .env.example .env
```

Dans `.env`, indiquez l'URL de l'API :

```env
VITE_API_URL=http://localhost:5001
```

Puis lancez le site :

```bash
npm run dev
```

Le site est disponible sur `http://localhost:5173`.

---

## Scripts

### Backend (`horloge-prophetique-Back`)

| Commande | Action |
| --- | --- |
| `npm run dev` | Lance l'API avec nodemon |
| `npm start` | Lance l'API avec Node |
| `npm run seed` | Crée l'administrateur initial |

### Frontend (`horloge-prophetique-Front`)

| Commande | Action |
| --- | --- |
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Analyse ESLint |

---

## Structure du projet

```text
horloge-prophetique/
├── horloge-prophetique-Back/
│   ├── prisma/
│   │   ├── schema.prisma      # Modèles de données
│   │   ├── migrations/        # Migrations SQL
│   │   └── seed.js            # Création de l'admin
│   ├── prisma.config.js
│   └── src/
│       ├── server.js          # Point d'entrée
│       ├── app.js             # Configuration Express (helmet, CORS, morgan…)
│       ├── routes/            # Définition des routes (préfixe /api)
│       ├── controllers/       # Traitement des requêtes
│       ├── services/          # Accès aux données (Prisma)
│       ├── middlewares/       # Auth JWT, rôles, rate limit, upload, erreurs
│       ├── lib/prisma.js      # Client Prisma
│       └── uploads/           # Fichiers envoyés (créé automatiquement)
│
└── horloge-prophetique-Front/
    ├── public/img/
    └── src/
        ├── api/axios.js       # Instance Axios + injection du jeton JWT
        ├── context/           # AuthContext (session utilisateur)
        ├── routes/            # Routes publiques et admin
        ├── layouts/           # PublicLayout, AdminLayout (protégé)
        ├── pages/             # Pages publiques et pages admin
        ├── components/        # Composants réutilisables et UI
        ├── hooks/             # useBooks, usePodcasts, usePrayerTopics
        └── services/          # Appels à l'API par ressource
```

Le backend suit le découpage **routes → controllers → services**.

---

## API

Toutes les routes sont préfixées par `/api`. Les routes marquées 🔒 exigent un en-tête `Authorization: Bearer <jeton>` d'un utilisateur au rôle `ADMIN`.

| Ressource | Public | Admin 🔒 |
| --- | --- | --- |
| `GET /` | Vérification de l'état de l'API | — |
| `/auth` | `POST /login` (5 tentatives/min par IP) | `GET /me` (tout utilisateur connecté) |
| `/podcasts` | `GET /`, `GET /:id` | `POST /`, `PUT /:id`, `DELETE /:id` |
| `/prayer-topics` | `GET /`, `GET /:id` | `POST /`, `PUT /:id`, `DELETE /:id` |
| `/prayer-requests` | `POST /` | `GET /`, `PATCH /:id`, `DELETE /:id` |
| `/books` | `GET /`, `GET /:id` | `POST /`, `PUT /:id`, `DELETE /:id` |
| `/team` | `GET /`, `GET /:id` | `POST /`, `PUT /:id` (photo via champ `photo`), `DELETE /:id` |
| `/medias` | `GET /`, `GET /:id` | `POST /`, `PUT /:id`, `DELETE /:id` |
| `/newsletter` | `POST /subscribe` | `GET /subscribers`, `GET /export`, `DELETE /unsubscribe/:id` |
| `/donations` | `POST /` | `GET /`, `PATCH /:id` |
| `/contact` | `POST /` | — |
| `/admin` | — | `GET /stats` |

Les fichiers envoyés sont servis publiquement sous `/uploads` (photos d'équipe : images uniquement, 5 Mo maximum).

---

## Modèle de données

Défini dans [`schema.prisma`](horloge-prophetique-Back/prisma/schema.prisma) :

| Modèle | Contenu |
| --- | --- |
| `User` | Comptes (rôles `ADMIN` / `USER`), mot de passe chiffré avec bcrypt |
| `Podcast` | Titre, description, image, URL audio, plateforme |
| `PrayerTopic` | Sujets de prière (`HEBDOMADAIRE`, `MENSUEL`, `CONTINENTAL`) |
| `PrayerRequest` | Demandes de prière et leur statut |
| `Book` | Livres de la librairie (fichier, image, catégorie) |
| `TeamMember` | Membres de l'équipe (poste, photo, ordre d'affichage) |
| `Media` | Projets H-Médias (tag, objectif, icône lucide-react) |
| `NewsletterSubscriber` | Abonnés à la newsletter |
| `Donation` | Dons (montant, moyen de paiement, statut) |

---

## Sécurité

- Authentification par **JWT** ; mots de passe chiffrés avec **bcrypt**.
- Routes d'administration protégées côté API (`protect` + `requireAdmin`) et côté interface (`AdminLayout` redirige vers `/login`).
- **Helmet** pour les en-têtes HTTP, **CORS** limité à `FRONTEND_URL`.
- Limitation des tentatives de connexion (**express-rate-limit**).
- Les fichiers `.env` ne sont pas versionnés : ne committez jamais de secrets.

---

## Auteur

Yapeaud Abedo
