import { jsonRecipes } from './data/recipes.js'
import { searchParameters } from './index.js'
import { displayResults } from './display.js'

const recipes = JSON.parse(jsonRecipes)

function updateResults () {
    const result = search(searchParameters)
    displayResults(result)
}

function search (searchParameters) {
    const activeSearch = {
        ingredients: searchParameters.ingredients.length > 0,
        appliances: searchParameters.appliances.length > 0,
        ustensils: searchParameters.ustensils.length > 0,
        text: searchParameters.textSearch !== ''
    }

    if (Object.values(activeSearch).every(item => item === false)) {
        return [...Array(50).keys()]
    }

    let idsFound = []

    Object.entries(activeSearch).forEach(([key, value]) => {
        const searchResults = {
            ingredients: ingredientsSearch(idsFound),
            appliances: appliancesSearch(idsFound),
            ustensils: ustensilsSearch(idsFound),
            text: keywordSearch(idsFound)
        }
        if (value) {
            const currentBatch = []
            currentBatch.push(searchResults[`${key}`])
            if (currentBatch.length === 0) {
                return []
            } else idsFound = currentBatch.flat()
        }
    })

    return idsFound
}

function getRecipesById (ids) {
    const result = []
    ids.forEach(id => result.push(recipes.filter(recipe => recipe.id === id)))
    return result.flat()
}

function ustensilsSearch (ids) {
    const singleTagMatchR = []
    const singleTagMatchIds = []
    const tags = searchParameters.ustensils
    let recipesToParse

    if (ids.length === 0) recipesToParse = recipes
    else recipesToParse = getRecipesById(ids)

    tags.forEach(tag => singleTagMatchR.push(recipesToParse.filter(recipe => recipe.ustensils.includes(tag))))
    singleTagMatchR.flat().forEach(recipe => singleTagMatchIds.push(recipe.id))
    return filterByOccurence(singleTagMatchIds, tags.length)
}

function appliancesSearch (ids) {
    const singleTagMatchR = []
    const singleTagMatchIds = []
    const tags = searchParameters.appliances
    let recipesToParse

    if (ids.length === 0) recipesToParse = recipes
    else recipesToParse = getRecipesById(ids)

    tags.forEach(tag => singleTagMatchR.push(recipesToParse.filter(recipe => recipe.appliance === tag)))
    singleTagMatchR.flat().forEach(recipe => singleTagMatchIds.push(recipe.id))
    return filterByOccurence(singleTagMatchIds, tags.length)
}

function ingredientsSearch (ids) {
    const singleTagMatchR = []
    const singleTagMatchIds = []
    const tags = searchParameters.ingredients
    let recipesToParse

    if (ids.length === 0) recipesToParse = recipes
    else recipesToParse = getRecipesById(ids)

    tags.forEach(tag => singleTagMatchR.push(recipesToParse.filter(recipe => hasIngredient(recipe, tag))))
    singleTagMatchR.forEach(arrayOfRecipes => arrayOfRecipes.forEach(recipe => singleTagMatchIds.push(recipe.id)))
    return filterByOccurence(singleTagMatchIds, tags.length)
}

function keywordSearch (ids) {
    const matchR = []
    const matchIds = []
    const keyword = searchParameters.textSearch
    let recipesToParse

    if (ids.length === 0) recipesToParse = recipes
    else recipesToParse = getRecipesById(ids)

    matchR.push(recipesToParse.filter(recipe => recipe.name.includes(keyword)))
    matchR.push(recipesToParse.filter(recipe => recipe.description.includes(keyword)))
    matchR.push(recipesToParse.filter(recipe => hasIngredient(recipe, [keyword])))
    matchR.flat().forEach(recipe => matchIds.push(recipe.id))

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
        if (object.ingredient.includes(tag)) result = true
    })
    return result
}

export { updateResults }
