# Vincent Foriel - Professional Website

Un site web professionnel moderne et élégant pour présenter mon expertise en instrumentation astrophotonique, simulation optique et développement logiciel scientifique.

🌐 **Site en ligne** : [vincent.foriel.xyz](https://vincent.foriel.xyz)

## 📋 Table des matières

- [À propos](#à-propos)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Développement local](#développement-local)
- [Édition du contenu](#édition-du-contenu)
- [Déploiement](#déploiement)
- [Licence](#licence)

## À propos

Ce site web sert trois objectifs principaux :
1. **CV / Profil** - Présenter mon parcours et mes compétences
2. **Portfolio** - Mettre en valeur mes projets de recherche et développements logiciels
3. **Services** - Détailler mes offres de collaboration, conseil et communication scientifique

### Philosophie de design

- **Minimalisme** - Design épuré sans animations excessives
- **Rigueur scientifique** - Inspiré par la clarté et la précision
- **Accessibilité** - Conçu pour être lisible et accessible à tous
- **Performance** - Site statique ultra-rapide sans JavaScript superflu

## Technologies utilisées

- **[Astro](https://astro.build/)** - Générateur de site statique moderne
- **TypeScript** - Pour un code robuste et maintenable
- **CSS moderne** - Variables CSS, Grid, Flexbox (pas de framework)
- **Markdown** - Pour tout le contenu éditable
- **GitHub Actions** - CI/CD automatisé

### Pourquoi Astro ?

- ✅ Excellente prise en charge de Markdown avec frontmatter
- ✅ Architecture basée sur des composants
- ✅ Zéro JavaScript par défaut (performances optimales)
- ✅ Collections de contenu typées avec Zod
- ✅ Déploiement simple via GitHub Pages, Netlify, Vercel

## Structure du projet

```
New-Website/
├── .github/
│   └── workflows/          # CI/CD (à créer)
├── public/                 # Assets statiques
│   ├── images/
│   └── fonts/
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Navigation.astro
│   │   ├── ProjectCard.astro
│   │   └── Section.astro
│   ├── content/            # Contenu Markdown
│   │   ├── config.ts       # Schémas des collections
│   │   ├── projects/       # Projets du portfolio
│   │   └── services/       # Services proposés
│   ├── layouts/            # Layouts de base
│   │   ├── BaseLayout.astro
│   │   └── PageLayout.astro
│   ├── pages/              # Pages du site (routing automatique)
│   │   ├── index.astro     # Accueil
│   │   ├── about.astro     # À propos
│   │   ├── expertise.astro # Services
│   │   ├── portfolio.astro # Portfolio
│   │   ├── cv.astro        # CV
│   │   └── contact.astro   # Contact
│   └── styles/             # Système de design
│       ├── reset.css
│       ├── typography.css
│       └── global.css
├── astro.config.mjs        # Configuration Astro
├── package.json
├── tsconfig.json
└── README.md
```

## Développement local

### Prérequis

- Node.js 18+ ([télécharger](https://nodejs.org/))
- npm (inclus avec Node.js)

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/VForiel/New-Website.git
cd New-Website

# Installer les dépendances
npm install
```

### Commandes disponibles

| Commande          | Action                                           |
|-------------------|--------------------------------------------------|
| `npm run dev`     | Lance le serveur de développement sur `localhost:4321` |
| `npm run build`   | Construit le site pour la production dans `./dist/` |
| `npm run preview` | Prévisualise le build de production localement   |

### Développement

```bash
# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur **http://localhost:4321**. Les modifications seront appliquées en temps réel (hot reload).

## Édition du contenu

### Ajouter un nouveau projet

1. Créer un fichier Markdown dans `src/content/projects/` :

```markdown
---
title: "Mon nouveau projet"
description: "Description courte du projet"
date: 2025-01-18
tags: ["Python", "Optique", "Simulation"]
image: "/images/projects/mon-projet.jpg"
url: "https://github.com/VForiel/mon-projet"
featured: true
---

Contenu détaillé du projet en Markdown...

## Section 1
...
```

2. Ajouter l'image (optionnelle) dans `public/images/projects/`

3. Le projet apparaîtra automatiquement sur la page Portfolio

### Ajouter un nouveau service

1. Créer un fichier Markdown dans `src/content/services/` :

```markdown
---
title: "Mon service"
description: "Description du service"
icon: "🔬"
order: 5
---

Description détaillée en Markdown...
```

2. Le service apparaîtra automatiquement sur la page Expertise

### Modifier les pages principales

Les pages sont dans `src/pages/*.astro`. Vous pouvez les éditer directement :

- **Accueil** : `src/pages/index.astro`
- **À propos** : `src/pages/about.astro`
- **Expertise** : `src/pages/expertise.astro`
- **Portfolio** : `src/pages/portfolio.astro`
- **CV** : `src/pages/cv.astro`
- **Contact** : `src/pages/contact.astro`

### Personnaliser le design

Le système de design est centralisé dans `src/styles/global.css`. Vous pouvez modifier :

- **Couleurs** : Variables CSS `--color-*`
- **Typographie** : Variables `--text-*` et `--font-*`
- **Espacements** : Variables `--space-*`
- **Autres tokens** : Voir le fichier pour tous les tokens disponibles

## Déploiement

### Déploiement manuel

```bash
# Construire le site
npm run build

# Le dossier dist/ contient le site prêt à déployer
```

### Déploiement automatique via GitHub Actions

**À créer** : Fichier `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Autres options de déploiement

- **Netlify** : Connecter le dépôt GitHub, build command: `npm run build`, publish directory: `dist`
- **Vercel** : Import du projet GitHub, détection automatique d'Astro
- **Cloudflare Pages** : Connecter le dépôt, build command: `npm run build`, output: `dist`

## Mode sombre

Le site supporte automatiquement le mode sombre via `prefers-color-scheme`. Les couleurs s'adaptent selon les préférences système de l'utilisateur.

## Licence

© 2025 Vincent Foriel. Tous droits réservés.

---

## Support & Contact

Pour toute question concernant ce site :
- **Email** : vincent.foriel@gmail.com
- **GitHub** : [@VForiel](https://github.com/VForiel)
