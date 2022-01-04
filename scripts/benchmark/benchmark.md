# Les Petits Plats : Benchmark des performances 

Deux algorithmes de recherche ont été implémentés et comparés.

## Index

**1 - Points communs aux deux approches**  

**2 - Programmation fonctionnelle**  
___ 2.1 - Description de l'approche  

**3 - Programmation impérative**  
___ 3.1 - Description de l'approche  

**4 - Comparaison des performances**  
___ 4.1 - Cas 1 : pas de saisie, 1 tag  
___ 4.2 - Cas 2 : 1 mot clé présent dans le titre, les ingrédients, la description  
___ 4.3 - Cas 3 : 1 mot clé présent dans le titre uniquement  
___ 4.4 - Cas 4 : 1 mot clé présent dans la description uniquement  
___ 4.5 - Cas 5 : 1 mot clé présent dans la description uniquement  

**5 - Synthèse / Bilan**  

___

## 1 - Points communs aux deux approches

Ils permettent tous les deux de rechercher des recettes correspondant à un ou plusieurs critères.  

Les critères de recherches sont les suivants :

- Une saisie dans la barre de recherche déclenche une recherche parmi : le nom, les ingrédients et la description de la recette.
- La sélection d'un ou plusieurs tag(s) parmi trois catégories (ingrédients, ustensiles, appareils) déclenche la recherche dans les clés "ingredient", "ustensils" et "appliances" de chaque objet recette.  
- L'algorithme de recherche par tag est identique pour les deux approches, **seule la recherche par saisie dans la barre de recherche diffère entre les deux approches.**

Exemple de recette :

```js
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
    }
```

Lien vers [l'algorigramme de recherche](https://whimsical.com/p7-les-petits-plats-logigramme-W6cBsyYcQSZ8L751F5CXtD)

Lien vers le [diagramme des fonctions](https://whimsical.com/p7-les-petits-plats-v1-NyNKLgzuPJdexavg1fegBN).  


## 2 - Programmation fonctionnelle

```js
function keywordSearch (ids) {
    let matchR = []
    const matchIds = []
    const keyword = searchParameters.textSearch
    let recipesToParse

    if (ids.length === 0) recipesToParse = recipes
    else recipesToParse = getRecipesById(ids)

    matchR = matchR.concat(recipesToParse.filter(recipe => recipe.name.includes(keyword)))
    matchR = matchR.concat(recipesToParse.filter(recipe => recipe.description.includes(keyword)))
    matchR = matchR.concat(recipesToParse.filter(recipe => hasIngredient(recipe, [keyword])))

    matchR.forEach(recipe => matchIds.push(recipe.id))

    return matchIds.filter((value, index, filteredRecipes) => filteredRecipes.indexOf(value) === index)
}
```

### 2.1 - Description de l'approche

- Pas d'affectations requises (les variables `matchR` et `matchIds` ont été déclarés et affectées par souci de lisibilité du code mais pouvaient être évitées)
- Transparence référentielle : pas d'effet de bord produit par les fonctions
- Fonctions/méthodes passées en paramètres `concat( filter( include() ) )`

## 3 - Programmation impérative


```js
function keywordSearch (ids = []) {
    const matchR = []
    const matchIds = []
    const result = []
    const keyword = searchParameters.textSearch
    let recipesToParse

    if (ids.length === 0) recipesToParse = recipes
    else recipesToParse = getRecipesById(ids)

    for (let i = 0; i < recipesToParse.length; i++) {
        if (
            recipesToParse[i].name.includes(keyword) ||
            recipesToParse[i].description.includes(keyword) ||
            hasIngredient(recipesToParse[i], [keyword])
        ) {
            matchR.push(recipesToParse[i])
        }
    }

    for (let i = 0; i < matchR.length; i++) {
        matchIds.push(matchR[i].id)
    }

    for (let i = 0; i < matchIds.length; i++) {
        if (matchIds.indexOf(matchIds[i]) === i) result.push(matchIds[i])
    }

    return result
}
```

### 3.1 - Description de l'approche

Séquence d'instructions composée :

- d'une boucle `for`
- de structures conditionnelles `if`
- d'affectations des variables `matchR`, `matchIds`, `result`


## 4 - Comparaison des performances

### 4.1 - Cas 1 : pas de saisie, 1 tag

Les 2 algorithmes étant identiques pour la recherche par tag, ils ne présentent pas de différence de performances lorsque l'on recherche seulement un tag.

<img src="screenshots/1%20appliance.png" height="650">

*Graphique cas 1*

___

### 4.2 - Cas 2 : 1 mot clé présent dans le titre, les ingrédients, la description
Lorsqu'on saisit un mot clé "ocolat", qui renvoie des résultats basés depuis tous les champs à parcourir, la version fonctionnelle est plus performante.

<img src="screenshots/al.png" height="650">

*Graphique cas 2*

___

### 4.3 - Cas 3 : 1 mot clé présent dans le titre uniquement
Lorsqu'on saisit un mot clé "Tart", qui ne renvoie des résultats que sur le titre des recettes, la version fonctionnelle est plus performante.

<img src="screenshots/all_tart.png" height="650">

*Graphique cas 3*

___

### 4.4 - Cas 4 : 1 mot clé présent dans la description uniquement
Lorsqu'on saisit un mot clé "Commence" présent dans la description uniquement, la version fonctionnelle est plus performante.
<img src="screenshots/desc_commence.png" height="650">

*Graphique cas 4*

___

### 4.5 - Cas 5 : 1 mot clé présent dans la description uniquement
Lorsqu'on saisit un mot clé "en " (suivi d'un espace) présent dans la description uniquement, la version fonctionnelle est plus performante.
<img src="screenshots/desc_en.png" height="650">

*Graphique cas 5*

___

## 5 - Synthèse / Bilan

|Paradigme|Fonctionnel|Impératif|
|-|--|--|
|Cas 1 tag |Identique| Identique|
|Cas 2 "ocolat"|Plus rapide|1.56% plus lent|
|Cas 3 "Tart"|Plus rapide|2.73% plus lent|
|Cas 4 "Commence"|Plus rapide| 3.06% plus lent|
|Cas 5 "en "|Plus rapide|3.22% plus lent|

Bien que l'échantillon de 50 recettes soit assez réduit pour comparer de manière fiable les différences de performances entre les deux algorithmes, **l'approche fonctionnelle semble plus efficace que l'approche impérative**.  

Sur les cas 2 à 5, l'approche fonctionnelle s'est avérée plus rapide (approche impérative plus lente de 2.64% en moyenne)

Outre l'aspect des performances, l'approche fonctionnelle a l'avantage d'être plus lisible.