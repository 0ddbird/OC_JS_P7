import { recipes } from './data/recipes.js'
import { recipeFactory } from './factory/recipeFactory.js'
import { getIngredients, getAppliances, getUstensils, displayTag } from './factory/tags.js'
import { addEventListeners } from './events.js'
import { SearchParameters, TagObject } from './data/interfaces.js'

export const searchParameters: SearchParameters = {
    textSearch: '',
    ingredients: [],
    appliances: [],
    ustensils: []
}

function init ():void {
    recipes.forEach(recipe => recipeFactory(recipe))

    const ingredients: TagObject = {
        category: 'ingredients',
        tags: getIngredients(recipes)
    }
    const appliances: TagObject = {
        category: 'appliances',
        tags: getAppliances(recipes)
    }

    const ustensils: TagObject = {
        category: 'ustensils',
        tags: getUstensils(recipes)
    }

    const allTags = [ingredients, appliances, ustensils]

    allTags.forEach(tag => displayTag(tag))

    addEventListeners()
}

init()
