<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Règles de responsivité des composants UI

Ces règles s’appliquent à chaque nouveau composant de la bibliothèque et à toute modification d’un composant existant. Leur objectif est d’éviter qu’un aperçu paraisse correct uniquement parce qu’il a été artificiellement compressé, alors que le composant casserait sur un véritable appareil.

Checklist obligatoire avant de considérer un composant comme terminé :

- Construire le composant en **mobile-first**, puis enrichir sa mise en page aux breakpoints supérieurs.
- Associer chaque profil d’appareil du playground à un **vrai breakpoint CSS** : Mobile sous `sm`, Tablette à partir de `md`, Desktop à partir de `xl`.
- Ne jamais réduire la largeur interne du composant pour le faire tenir dans l’aperçu. Le viewport émulé conserve ses dimensions réelles ; seule son **échelle visuelle** peut être réduite dans l’interface du playground.
- Tester le composant sur les trois profils du playground : **Mobile, Tablette et Desktop**. Vérifier notamment les débordements, les éléments masqués, la navigation, les overlays et le sens des layouts flex/grid.
- Lorsqu’un élément disparaît faute de place (navigation, sidebar, actions), fournir un moyen explicite et accessible de l’afficher, par exemple un bouton menu avec un libellé et `aria-expanded`.
- Ajouter ou mettre à jour les captures de régression visuelle automatisées pour les trois profils dès que cette infrastructure est disponible.

Pourquoi : les media queries se déclenchent selon la largeur interne réelle du viewport, pas selon la taille visuelle de l’aperçu. Modifier artificiellement cette largeur peut activer le mauvais breakpoint et masquer des défauts comme un Kanban empilé sur Desktop, une sidebar inaccessible sur Mobile ou un composant tronqué sur Tablette.
