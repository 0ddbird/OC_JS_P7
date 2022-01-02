# OpenClassrooms - Parcours Développeur Front-end

## <a id="start">Projet 7 - Les petits plats</a>

Les Petits Plats est un site proposant des recettes de cuisine.
Le moteur de recherche du site permet de filtrer les recettes en saisissant un ou plusieurs mots dans la barre de recherche, et/ou en sélectionnant des ingrédients, appareils et ustensiles.
___

## Liens

Lien vers la [GitHub Page](https://okuspo.github.io/P7_Les_petits_plats/).

Lien vers [l'algorigramme de recherche](https://whimsical.com/p7-les-petits-plats-logigramme-W6cBsyYcQSZ8L751F5CXtD)

Lien vers le [diagramme des fonctions](https://whimsical.com/p7-les-petits-plats-v1-NyNKLgzuPJdexavg1fegBN).  

Lien vers la [maquette Figma](https://www.figma.com/file/xqeE1ZKlHUWi2Efo8r73NK/UI-Design-Les-Petits-Plats-FR?node-id=0%3A1).  

___

## Fonctionnalités demandées

Développer un site sur base d'un fichier JavaScript contenant un tableau de 50 recettes.
Implémenter un moteur de recherche pour filtrer les recettes.
Comparer les performances entre 2 versions du projet (programmation fonctionnelle vs programmation impérative)

```js
const recipes = [
    {
        "id": 1,
        "name" : "Limonade de Coco",
        "servings" : 1,
        "ingredients": [
            {
                "ingredient" : "Lait de coco",
                "quantity" : 400,
                "unit" : "ml"
            },
            {
                "ingredient" : "Jus de citron",
                "quantity" : 2
            },
            {
                "ingredient" : "Crème de coco",
                "quantity" : 2,
                "unit" : "cuillères à soupe"
            },
            {
                "ingredient" : "Sucre",
                "quantity" : 30,
                "unit" : "grammes"
            },
            {
                "ingredient": "Glaçons"
            }
        ],
        "time": 10,
        "description": "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
        "appliance": "Blender",
        "ustensils": ["cuillère à Soupe", "verres", "presse citron" ]
    },
    {
        ...
    }
]
```

### Objectifs du projet

- Apprendre les fondamentaux de l'algorithmie.
- Manipuler des objets possédant plusieurs niveaux.
- Comparer deux approches (fonctionnelle et impérative) du point de vue des performances.
- Découvrir l'event "keyup"
- Apprendre et utiliser les méthodes filter, map et reduce
- Apprendre à utiliser les branches Git
- Optionnel : apprendre à utiliser Bootstrap

___
[:top: Retour en haut de page](#start)
