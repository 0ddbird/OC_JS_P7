import { recipes } from './data/recipes.js'
import { searchParameters } from './index.js'
import { displayResults } from './display.js'

function updateResults () {
    const result = search(searchParameters)
    displayResults(result)
}

function search (searchParameters) {
    console.log(searchParameters)

    if (searchParameters.textSearch === '' &&
        searchParameters.ingredients === [] &&
        searchParameters.appliances === [] &&
        searchParameters.ustensils === []) {
        return [...Array(50).keys()]
    }

    const textSearch = keywordSearch(searchParameters.textSearch)
    const ingredientsMatch = ingredientsSearch(searchParameters.ingredients)
    const appliancesMatch = appliancesSearch(searchParameters.appliances)
    const ustensilsMatch = ustensilsSearch(searchParameters.ustensils)
    const matchingRecipes = ingredientsMatch.concat(appliancesMatch, ustensilsMatch, textSearch)

    let range = 0;

    [textSearch, ingredientsMatch, appliancesMatch, ustensilsMatch].forEach(array => {
        if (array.length > 0) {
            range += 1
        }
    })

    const fullMatchRecipes = filterByOccurence(matchingRecipes, range)

    return fullMatchRecipes
}

function ustensilsSearch (tags) {
    const singleTagMatchR = []
    const singleTagMatchIds = []

    // Push recipes that match a single tag to singleTagMatchR
    tags.forEach(tag => singleTagMatchR.push(recipes.filter(recipe => recipe.ustensils.includes(tag))))

    // Push id of all recipes matching a single tag to singleTagMatchIds
    singleTagMatchR.forEach(arrayOfRecipes => arrayOfRecipes.forEach(recipe => singleTagMatchIds.push(recipe.id)))

    // Filter recipes that match every tags
    return filterByOccurence(singleTagMatchIds, tags.length)
}

function appliancesSearch (tags) {
    const singleTagMatchR = []
    const singleTagMatchIds = []

    tags.forEach(tag => singleTagMatchR.push(recipes.filter(recipe => recipe.appliance === tag)))

    singleTagMatchR.forEach(arrayOfRecipes => arrayOfRecipes.forEach(recipe => singleTagMatchIds.push(recipe.id)))

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
    // Search in title + ingredients + description
    const matchR = []
    const matchIds = []

    matchR.push(recipes.filter(recipe => recipe.name.includes(keyword)))
    matchR.push(recipes.filter(recipe => recipe.description.includes(keyword)))
    matchR.push(recipes.filter(recipe => hasIngredient(recipe, [keyword])))
    matchR.forEach(arrayOfRecipes => arrayOfRecipes.forEach(recipe => matchIds.push(recipe.id)))
    return matchIds.filter(onlyUnique)
}

function filterByOccurence (array, count) {
    return array.filter((a, index) => array.indexOf(a) === index && array.reduce((acc, b) => +(a === b) + acc, 0) === count)
}

function onlyUnique (value, index, self) {
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
