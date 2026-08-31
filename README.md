# Convertisseur d’unités

Application web permettant de convertir des longueurs, des volumes, des masses et des températures.

## Installation

```bash
export PATH="$PWD/.tools/node/bin:$PATH" # si Node.js est installé localement dans .tools
npm install
npm run install:all
```

## Développement

```bash
npm run dev
```

Le frontend est alors accessible sur `http://localhost:5173` et l’API sur `http://localhost:3001`.

## Vérifications

```bash
npm test
npm run build
```

## API

- `GET /api/categories` retourne les catégories et leurs unités.
- `POST /api/convert` accepte `{ "category": "length", "value": 10, "from": "ft", "to": "m" }`.
