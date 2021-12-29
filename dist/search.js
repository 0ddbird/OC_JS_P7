import { recipes } from './data/recipes.js'
import { searchParameters } from './index.js'
import { displayResults } from './display.js'

function updateResults () {
    const result = search(searchParameters)
    displayResults(result)
}

function search (searchParameters) {
    let requiredOccurence = 0
    const resultsToFilter = []

    const activeSearch = {
        text: searchParameters.textSearch !== '',
        ingredients: searchParameters.ingredients.length > 0,
        appliances: searchParameters.appliances.length > 0,
        ustensils: searchParameters.ustensils.length > 0
    }

    const searchResults = {
        text: keywordSearch(searchParameters.textSearch),
        ingredients: ingredientsSearch(searchParameters.ingredients),
        appliances: appliancesSearch(searchParameters.appliances),
        ustensils: ustensilsSearch(searchParameters.ustensils)
    }

    if (Object.values(activeSearch).every(item => item === false)) {
        return [...Array(50).keys()]
    }

    Object.entries(searchResults).forEach(([key, value]) => {
        // console.log(`%c${key}: ${value}`, 'color: #e74c3c')
        if (activeSearch[key]) {
            requiredOccurence += 1
            resultsToFilter.push(value)
        }
    })

    return filterByOccurence(resultsToFilter.flat(), requiredOccurence)
}

function ustensilsSearch (tags) {
    const singleTagMatchR = []
    const singleTagMatchIds = []

    // Push recipes that match a single tag to singleTagMatchR
    tags.forEach(tag => singleTagMatchR.push(recipes.filter(recipe => recipe.ustensils.includes(tag))))

    // Push id of all recipes matching a single tag to singleTagMatchIds
    singleTagMatchR.flat().forEach(recipe => singleTagMatchIds.push(recipe.id))

    // Filter recipes that match every tags
    return filterByOccurence(singleTagMatchIds, tags.length)
}

function appliancesSearch (tags) {
    const singleTagMatchR = []
    const singleTagMatchIds = []

    tags.forEach(tag => singleTagMatchR.push(recipes.filter(recipe => recipe.appliance === tag)))

    singleTagMatchR.flat().forEach(recipe => singleTagMatchIds.push(recipe.id))

    return filterByOccurence(singleTagMatchIds, tags.length)
}

function ingredientsSearch (tags) {
    const singleTagMatchR = []
    const singleTagMatchIds = []
    tags.forEach(tag => singleTagMatchR.push(recipes.filter(recipe => hasIngredient(recipe, tag))))

    singleTagMatchR.forEach(arrayOfRecipes => arrayOfRecipes.forEach(recipe => singleTagMatchIds.push(recipe.id)))

    return filterByOccurence(singleTagMatchIds, tags.length)
}

function keywordSearch (keyword, matchingRecipes) {
    const matchR = []
    const matchIds = []

    matchR.push(recipes.filter(recipe => recipe.name.includes(keyword)))
    matchR.push(recipes.filter(recipe => recipe.description.includes(keyword)))
    matchR.push(recipes.filter(recipe => hasIngredient(recipe, [keyword])))
    matchR.flat().forEach(recipe => matchIds.push(recipe.id))
    // matchR.forEach(arrayOfRecipes => arrayOfRecipes.forEach(recipe => matchIds.push(recipe.id)))
    // console.log(matchIds)
    return matchIds.filter(getUniqueItems)
}

function filterByOccurence (array, count) {
    return array.filter((a, index) => array.indexOf(a) === index && array.reduce((acc, b) => +(a === b) + acc, 0) === count)
}

function getUniqueItems (value, index, self) {
    return self.indexOf(value) === index
}

function hasIngredient (recipe, tag) {
    let result = false
    recipe.ingredients.forEach(object => {
        if (object.ingredient === tag) {
            // console.log(`%c${tag} === ${object.ingredient}`, 'color: #2ecc71', true)
            result = true
        }
    })
    return result
}

export { updateResults }
