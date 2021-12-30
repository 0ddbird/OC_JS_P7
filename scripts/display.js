import { recipes } from './data/recipes.js'
import { recipeFactory } from './factory/recipeFactory.js'
import { getIngredients, getAppliances, getUstensils } from './factory/taglists.js'
import { searchParameters } from './index.js'

export function displayResults (recipeIds) {
    const resultSection = document.getElementById('result-section')
    const noResultSpan = document.getElementById('no-result')
    resultSection.innerHTML = ''
    noResultSpan.classList.add('hidden')
    const rawResult = []

    if (recipeIds.length > 0) {
        recipeIds.forEach(id => rawResult.push(recipes.filter(recipe => recipe.id === id)))
        const flatResult = rawResult.flat()
        const allTags = [
            {
                category: 'ingredients',
                tags: getIngredients(flatResult)
            },
            {
                category: 'appliances',
                tags: getAppliances(flatResult)
            },
            {
                category: 'ustensils',
                tags: getUstensils(flatResult)
            }
        ]

        flatResult.forEach(recipe => recipeFactory(recipe))

        allTags.forEach(tagObject => {
            displayTag(tagObject)
        })
    } else {
        document.getElementById('no-result').classList.remove('hidden')
    }
}

function displayTag (tagObject) {
    const tagList = document.getElementById(`${tagObject.category}-list`)
    tagList.innerHTML = ''
    tagObject.tags.forEach(tag => {
        if (!searchParameters[tagObject.category].includes(tag)) {
            const li = document.createElement('li')
            li.textContent = tag
            li.classList.add(`${tagObject.category}-item`)
            li.setAttribute('data-category', tagObject.category)
            li.setAttribute('data-name', tag)
            li.setAttribute('tabindex', '-1')
            tagList.appendChild(li)
        }
    })
}
