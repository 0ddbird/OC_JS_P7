function onlyUnique (value, index, self) {
    return self.indexOf(value) === index
}
function getIngredients (recipes) {
    const totalIngredients = []
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(object => totalIngredients.push(object.ingredient))
    })
    const filteredIngredients = totalIngredients.filter(onlyUnique)
    filteredIngredients.sort((a, b) => a.localeCompare(b))
    return filteredIngredients
}
function getAppliances (recipes) {
    const allAppliances = []
    recipes.forEach(recipe => {
        allAppliances.push(recipe.appliance)
    })
    const uniqueAppliances = allAppliances.filter(onlyUnique)
    return uniqueAppliances
}
function getUstensils (recipes) {
    const allUstensils = []
    recipes.forEach(recipe => recipe.ustensils.forEach(ustensil => allUstensils.push(ustensil)))
    const uniqueUstensils = allUstensils.filter(onlyUnique)
    return uniqueUstensils
}

export { getIngredients, getAppliances, getUstensils }
