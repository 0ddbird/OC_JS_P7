function recipeFactory (recipeContent) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = recipeContent
    const resultSection = document.getElementById('result-section')
    const template = document.getElementById('template_recipe').content
    const templateClone = document.importNode(template, true)
    const recipe = templateClone.querySelector('.recipe')
    const recipeTitle = templateClone.querySelector('.recipe-title')
    const recipeTime = templateClone.querySelector('.recipe-time')
    const recipeIngredients = templateClone.querySelector('.recipe-ingredients')
    const recipeDescription = templateClone.querySelector('.recipe-description')
    recipe.setAttribute('id', `${id}`)
    recipe.setAttribute('data-appliance', `${appliance}`)
    recipe.setAttribute('data-ustensils', `${ustensils}`)
    recipe.setAttribute('data-servings', `${servings}`)
    recipe.setAttribute('tabindex', '0')
    recipeTime.textContent = `${time} min`
    recipeTitle.textContent = name
    ingredients.forEach(ingredient => {
        const li = document.createElement('li')
        const b = document.createElement('b')
        b.textContent = `${ingredient.ingredient}`
        li.appendChild(b)
        if (ingredient.quantity !== null && ingredient.quantity !== undefined) {
            const span = document.createElement('span')
            span.textContent = `: ${ingredient.quantity}`
            if (ingredient.unit !== null && ingredient.unit !== undefined) {
                span.textContent = `: ${ingredient.quantity} ${ingredient.unit}`
            }
            li.appendChild(span)
        }
        recipeIngredients.appendChild(li)
    })
    recipeDescription.textContent = `${description}`
    resultSection.appendChild(templateClone)
}
export { recipeFactory }
