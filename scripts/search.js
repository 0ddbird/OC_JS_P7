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
            ingredients: () => ingredientsSearch(idsFound),
            appliances: () => appliancesSearch(idsFound),
            ustensils: () => ustensilsSearch(idsFound),
            text: () => keywordSearch(idsFound)
        }
        if (value) {
            const currentBatch = []
            currentBatch.push(searchResults[`${key}`]())
            if (currentBatch.length === 0) return []
            else idsFound = currentBatch.flat()
        }
    })
    return idsFound
}

function getRecipesById (ids) {
    const result = []
    ids.forEach(id => result.push(recipes.filter(recipe => recipe.id === id)))
    return result.flat()
}

function ustensilsSearch (ids = []) {
    let singleTagMatchR = []
    const singleTagMatchIds = []
    const tags = searchParameters.ustensils
    let recipesToParse

    if (ids.length === 0) recipesToParse = recipes
    else recipesToParse = getRecipesById(ids)

    tags.forEach(tag => {
        singleTagMatchR = singleTagMatchR.concat(recipesToParse.filter(recipe => recipe.ustensils.includes(tag)))
    })
    singleTagMatchR.forEach(recipe => singleTagMatchIds.push(recipe.id))
    return filterByOccurence(singleTagMatchIds, tags.length)
}

function appliancesSearch (ids = []) {
    let singleTagMatchR = []
    const singleTagMatchIds = []
    const tags = searchParameters.appliances
    let recipesToParse

    if (ids.length === 0) recipesToParse = recipes
    else recipesToParse = getRecipesById(ids)

    tags.forEach(tag => {
        singleTagMatchR = singleTagMatchR.concat(recipesToParse.filter(recipe => recipe.appliance === tag))
    })
    singleTagMatchR.forEach(recipe => singleTagMatchIds.push(recipe.id))
    return filterByOccurence(singleTagMatchIds, tags.length)
}

function ingredientsSearch (ids = []) {
    let singleTagMatchR = []
    const singleTagMatchIds = []
    const tags = searchParameters.ingredients
    let recipesToParse

    if (ids.length === 0) recipesToParse = recipes
    else recipesToParse = getRecipesById(ids)

    tags.forEach(tag => {
        singleTagMatchR = singleTagMatchR.concat(recipesToParse.filter(recipe => hasIngredient(recipe, tag)))
    })
    singleTagMatchR.forEach(recipe => singleTagMatchIds.push(recipe.id))
    return filterByOccurence(singleTagMatchIds, tags.length)
}

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

function filterByOccurence (array, idOccurence) {
    const idCount = {}
    const result = []

    array.forEach(id => {
        if (idCount[id] === undefined) idCount[id] = 1
        else idCount[id] += 1
    })

    Object.entries(idCount).forEach(([id, count]) => {
        if (count === idOccurence) result.push(parseInt(id))
    })

    return result
}

function hasIngredient (recipe, tag) {
    if (recipe.ingredients.find(object => object.ingredient.includes(tag))) return true
    return false
}

export { updateResults }
