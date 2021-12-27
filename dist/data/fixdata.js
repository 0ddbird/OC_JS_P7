export function getAllRecipes(recipes) {
    const recipesToString = JSON.stringify(recipes);
    console.log(recipesToString);
    const missingCommaRegEx = /"\s+"/g;
    console.log(recipesToString.search(missingCommaRegEx));
    const fixedRecipes = recipesToString.replace(missingCommaRegEx, ',');
    const fixedJsonRecipes = JSON.parse(fixedRecipes);
    console.log(fixedJsonRecipes);
    return fixedJsonRecipes;
}
export function fixKeys(recipes) {
    let keys;
}
