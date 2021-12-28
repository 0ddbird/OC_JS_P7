https://jsben.ch/
https://www.figma.com/file/xqeE1ZKlHUWi2Efo8r73NK/UI-Design-Les-Petits-Plats-FR?node-id=0%3A1
https://github.com/OpenClassrooms-Student-Center/P11-front-end-search-engine/blob/master/recipes.js

```js

/* userInput example :
    {
        textSearch: 'coco',
        ingredientTags: ['lait de coco', 'citron pressé'],
        applianceTags: ['blender'],
        ustensilTags: ['cuillère à Soupe', 'verres', 'presse citron']
    }

    Check which keys have a value.
    Exclude keys with no value from the following sequence:

    Sort tagArrays by length.
    Start by longest tagArray (narrow search as early as possible) -> Is there a better way?
    Filter recipes matching every strings in the tagArray
    Save the id of matching recipes into the local idArray
    If none, return "no recipe found"
    If one or more :
    Filter recipes matching every string in the 2nd longest array, from recipes filtered thanks to the first array
    If none, return "no recipe found"
    If one or more:
    Save the id of recipes matching both arrays into the local idArray
    Filter recipes matching every string in the 3rd array
    If none, return "no recipe found"
    If one or more:
    Save the id of recipes matching all arrays into the local idArray
    Filter recipes matching the textSearch keywords
    If none, return "no recipe found"
    Save the id of recipes matching all tag arrays and textInput into the local idArray
    return idArray
    idArray will be used by getRecipes()
    result from getRecipes will be used by recipeFactory to append them to the DOM
    getIngredients, getAppliances, getUstensils will be called again on the new the result
*/

```