import { recipes } from './data/recipes.js'
import { recipeFactory } from './factory/recipeFactory.js'
import { getIngredients, displayIngredients, getAppliances, displayAppliances, getUstensils, displayUstensils } from './factory/combobox.js'
import { addEventListeners } from './events.js'

function init ():void {
    recipes.forEach(recipe => recipeFactory(recipe))
    const ingredients = getIngredients(recipes)
    const appliances = getAppliances(recipes)
    const ustensils = getUstensils(recipes)
    displayIngredients(ingredients)
    displayAppliances(appliances)
    displayUstensils(ustensils)
    addEventListeners()
}

init()
