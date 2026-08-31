# Laboratoire 2 — Application de conversion

## Dépôt GitHub

Le code source de l’application est disponible dans le dépôt suivant :

<https://github.com/Seguaiie/exploration-des-technologies-lab-2>

## Modification apportée à l’étape 7

L’arrière-plan de l’application a été modernisé sans modifier la boîte principale
du convertisseur. Le nouveau décor comprend un dégradé violet, blanc et menthe,
une grille géométrique subtile, des halos lumineux animés, des anneaux orbitaux et
une légère texture de profondeur. L’affichage s’adapte aux appareils mobiles et
les animations sont automatiquement désactivées lorsque l’utilisateur demande
une réduction des mouvements dans les préférences de son système.

Une description plus détaillée de cette modification est disponible dans le
fichier [`MODIFICATIONS.txt`](MODIFICATIONS.txt).

## Commits réalisés

1. `3292758` — **Initial commit: application de conversion**
2. `07943db` — **Améliore l’arrière-plan animé de l’application**

## Exécution de l’application

### Prérequis

- Node.js 20 ou une version plus récente;
- npm.

### Installation

À la racine du dépôt, exécuter :

```bash
npm install
npm run install:all
```

### Démarrage en mode développement

```bash
npm run dev
```

L’interface React sera accessible à l’adresse suivante :

<http://localhost:5173>

L’API Node.js sera accessible à l’adresse suivante :

<http://localhost:3001>

### Vérifications facultatives

Pour exécuter les tests du backend :

```bash
npm test
```

Pour compiler le frontend en vue d’un déploiement :

```bash
npm run build
```

### Installation locale incluse dans l’environnement de travail

Si le projet est exécuté dans l’environnement où Node.js a été installé dans le
dossier local `.tools`, il faut d’abord exécuter :

```bash
export PATH="$PWD/.tools/node/bin:$PATH"
```

Le dossier `.tools` n’est pas inclus dans Git; sur une autre machine, une
installation normale de Node.js et npm est donc nécessaire.
