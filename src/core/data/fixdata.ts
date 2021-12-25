import { Recipe } from './interfaces'
export function getAllRecipes (recipes: Recipe[]):object {
    const recipesToString = JSON.stringify(recipes)

    console.log(recipesToString)

    const missingCommaRegEx = /"\s+"/g

    console.log(recipesToString.search(missingCommaRegEx))

    const fixedRecipes = recipesToString.replace(missingCommaRegEx, ',')
    const fixedJsonRecipes = JSON.parse(fixedRecipes)
    console.log(fixedJsonRecipes)
    return fixedJsonRecipes
}

export function fixKeys (recipes: Recipe[]):void {
    let keys: string[]
    console.log(keys)
}
