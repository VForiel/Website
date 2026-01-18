# Instructions pour les assistants IA

## Objectif du projet

Ce projet est un **site web professionnel personnel** pour Vincent Foriel, doctorant en astrophotonique. Le site sert simultanément de :

- **CV / Profil** - Présentation du parcours académique et professionnel
- **Portfolio** - Projets de recherche et développements logiciels
- **Vitrine de services** - Communication scientifique, simulation optique, développement logiciel

## Principes de design

### Identité visuelle
- **Moderne, minimal, élégant, sobre, cohérent**
- Pas d'animations flashy, pas de gadgets, pas de clichés corporatifs
- Esthétique inspirée par : rigueur scientifique, confiance calme, clarté, profondeur
- Le site doit être digne de confiance, techniquement solide et intellectuellement raffiné

### Ton et positionnement
- **Doctorant** en instrumentation optique pour l'astrophysique (pas "expert")
- Ton professionnel mais humble : "recherches", "travaux", "développe"
- Éviter : mots marketing, affirmations exagérées, verbosité académique
- Privilégier : sérieux sans froideur, expert mais accessible, moderne mais intemporel

## Contraintes techniques (strictes)

### Architecture
- **Pas de CMS**
- **Site statique uniquement**
- Contenu entièrement éditable via **dépôt Git**
- Contenu écrit principalement en **Markdown**
- Support du contenu structuré (frontmatter, métadonnées, sections)
- Doit supporter **CI/CD deployment** (GitHub Actions)
- Pas de vendor lock-in

### Stack technique
- **Static site generator** : Astro (choisi pour son excellent support Markdown et performance)
- **Templating** : Composants Astro
- **JavaScript** : Minimal, uniquement si valeur ajoutée réelle (ex: toggle thème)
- **CSS** : CSS moderne custom (pas de framework), variables CSS, Grid, Flexbox
- **TypeScript** : Strict mode pour robustesse

## Structure du contenu

### Pages principales
1. **Home** - Positionnement, identité, expertise
2. **À propos** - Parcours PhD, recherches, approche
3. **Expertise** - Services (communication scientifique EN PREMIER, puis simulation, développement logiciel, analyse instrumentale)
4. **Portfolio** - Projets de recherche et outils logiciels
5. **CV** - Structuré, lisible, imprimable
6. **Contact** - Simple, professionnel

### Gestion du contenu
- Chaque page/section éditable via **fichiers Markdown**
- Utilisation de **frontmatter** pour contrôler : titres, descriptions, ordre, variantes de layout
- Les auteurs de contenu ne doivent **jamais toucher HTML ou CSS** pour les éditions normales

## Système de design

### Palette de couleurs - "Nuit étoilée"
- **Thème sombre par défaut** avec effet étoilé subtil
- Primaire : Bleu lumineux (hsl(210, 85%, 65%))
- Accent : Ambre chaleureux (hsl(35, 85%, 65%))
- Fond : Bleu marine profond (hsl(220, 22%, 9%))
- Thème clair disponible via toggle (fond blanc, pas d'étoiles)

### Typographie
- **Font principale** : Inter (Google Fonts)
- **Échelle** : Perfect Fourth (ratio 1.333)
- **Poids** : 300, 400, 500, 600, 700

### Espacement
- Système basé sur **unité de 4px**
- Variables CSS : --space-1 à --space-32

### Principes
- Accessible, lisible, responsive par défaut
- Dark mode par défaut, light mode via toggle
- Transitions douces entre thèmes

## Directives importantes

### Lors de modifications
1. **Respecter le ton "doctorant"** - ne pas survendre, rester humble
2. **Maintenir la cohérence visuelle** - utiliser les variables CSS existantes
3. **Privilégier Markdown** pour tout nouveau contenu
4. **Tester la responsivité** - mobile, tablette, desktop
5. **Vérifier l'accessibilité** - contraste, sémantique HTML, ARIA
6. **Priorité à la communication scientifique** dans la section Expertise

### Structure du code
- Composants dans `src/components/`
- Pages dans `src/pages/` (routing file-based)
- Contenu Markdown dans `src/content/`
- Styles dans `src/styles/` (global.css, reset.css, typography.css)
- Assets statiques dans `public/`

### Collections de contenu
- **Projects** (`src/content/projects/`) : title, description, date, tags, image, url, featured
- **Services** (`src/content/services/`) : title, description, icon, order

## Commandes utiles

```bash
# Développement local
npm run dev

# Build production
npm run build

# Preview build
npm run preview
```

## Déploiement

- **CI/CD** : GitHub Actions (`.github/workflows/deploy.yml`)
- **Cible** : GitHub Pages (ou Netlify, Vercel, Cloudflare Pages)
- **Trigger** : Push sur branche `main`

---

**En résumé** : Un site web statique élégant et sobre pour un doctorant en astrophysique, avec thème sombre "nuit étoilée" par défaut, contenu en Markdown, et déploiement automatisé.
