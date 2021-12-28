import { Recipe, TagObject } from '../data/interfaces.js'

function onlyUnique (value: string, index: number, self: string[]): boolean {
    return self.indexOf(value) === index
}

function getIngredients (recipes: Recipe[]): string[] {
    const totalIngredients: string[] = []
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(object => totalIngredients.push(object.ingredient))
    })
    const filteredIngredients = totalIngredients.filter(onlyUnique)
    filteredIngredients.sort((a:string, b:string) => a.localeCompare(b))
    return filteredIngredients
}

function getAppliances (recipes: Recipe[]): string[] {
    const allAppliances: string[] = []
    recipes.forEach(recipe => {
        allAppliances.push(recipe.appliance)
    })
    const uniqueAppliances = allAppliances.filter(onlyUnique)
    return uniqueAppliances
}

function getUstensils (recipes: Recipe[]): string[] {
    const allUstensils: string[] = []
    recipes.forEach(recipe => recipe.ustensils.forEach(ustensil => allUstensils.push(ustensil)))
    const uniqueUstensils = allUstensils.filter(onlyUnique)
    return uniqueUstensils
}

function displayTag (tagObject: TagObject): void {
    const tagList = document.getElementById(`${tagObject.category}-list`)!
    tagObject.tags.forEach(tag => {
        const li = document.createElement('li')
        li.textContent = tag
        li.classList.add(`${tagObject.category}-item`)
        li.setAttribute('data-category', tagObject.category)
        li.setAttribute('data-name', tag)
        li.setAttribute('tabindex', '-1')
        tagList.appendChild(li)
    })
}

export { getIngredients, getAppliances, displayTag, getUstensils }
