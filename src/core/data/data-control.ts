interface Ingredient {
    ingredient: string
    quantity?: number | string
    unit?: string
}

interface Recipe {
    id: number
    name: string
    servings: number
    ingredients: Ingredient[]
    time: number
    description: string
    appliance: string
    ustensils: string[]
}

export { Recipe, Ingredient }
