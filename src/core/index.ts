import { recipes } from './data/recipes.js'
import { fixedRecipes } from './data/recipes-fixed.js'
import { recipeFactory } from './factory/recipeFactory.js'
import { getIngredients, displayIngredients, getAppliances, displayAppliances, getUstensils, displayUstensils } from './factory/combobox.js'
import { addEventListeners } from './events.js'
import { fixKeys, getAllRecipes } from './data/fixdata.js'

function init ():void {
    fixedRecipes.forEach(recipe => recipeFactory(recipe))
    const ingredients = getIngredients(fixedRecipes)
    const appliances = getAppliances(fixedRecipes)
    const ustensils = getUstensils(fixedRecipes)
    displayIngredients(ingredients)
    displayAppliances(appliances)
    displayUstensils(ustensils)
    addEventListeners()
    const cleanRecipes = getAllRecipes(recipes)
    // fixKeys(cleanRecipes)
}

init()
