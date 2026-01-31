# Mon Petit Tour

Application Vue 3 + TypeScript + Tailwind CSS pour visualiser des parcours GPX et intégrer des segments Strava.

## Fonctionnalités

- 🗺️ Affichage de fichiers GPX sur une carte interactive (Leaflet)
- 🚴 Intégration de l'API Strava pour afficher les segments
- ✅ Sélection multiple de segments pour créer votre parcours
- 🎨 Interface moderne avec Tailwind CSS

## Installation

```bash
npm install
```

## Configuration

1. Copiez le fichier `.env.example` vers `.env`
2. Ajoutez vos clés API Strava dans le fichier `.env`

## Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## Build

```bash
npm run build
```

## Technologies utilisées

- **Vue 3** - Framework JavaScript
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utility-first
- **Leaflet** - Bibliothèque de cartes interactives
- **Vue Router** - Routing pour Vue 3
- **Vite** - Build tool et dev server

## Structure du projet

```
mon-petit-tour/
├── src/
│   ├── assets/          # Fichiers CSS et ressources
│   ├── components/      # Composants Vue réutilisables
│   │   └── MapComponent.vue
│   ├── views/           # Pages/vues de l'application
│   │   └── HomeView.vue
│   ├── App.vue          # Composant racine
│   └── main.ts          # Point d'entrée
├── public/              # Fichiers statiques
├── index.html           # Template HTML
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## TODO

- [ ] Implémenter l'upload de fichiers GPX
- [ ] Intégrer l'API Strava pour récupérer les segments
- [ ] Décoder les polylines Strava
- [ ] Ajouter la gestion d'authentification Strava
- [ ] Permettre l'export du parcours final
