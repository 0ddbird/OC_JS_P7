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

type UserInput = {
    textSearch: string;
    ingredientTags: string[];
    applianceTags: string[];
    ustensilTags: string[];
}

type SearchTags = {
    category: string;
    keywords: string[];

}

export { Recipe, Ingredient, UserInput, SearchTags }
