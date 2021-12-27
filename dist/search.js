function search(userInput) {
    // Search recipes matching the input (keywords and/or tag(s))
    const matchingIngredients = ingredientSearch(userInput.ingredients);
    const matchingAppliances = applianceSearch(userInput.appliances);
    const matchingUstensils = ustensilsSearch(userInput.ustensils);
    let idArray;
    /* userInput example :
    {
        textSearch: 'coco',
        ingredientTags: ['lait de coco', 'citron pressé'],
        applianceTags: ['blender'],
        ustensilTags: ['cuillère à Soupe', 'verres', 'presse citron']
    }

    Check which keys have a value.
    Exclude keys with no value from the following sequence:

    Sort tagArrays by length.
    Start by longest tagArray (narrow search as early as possible) -> Is there a better way?
    Filter recipes matching every strings in the tagArray
    Save the id of matching recipes into the local idArray
    If none, return "no recipe found"
    If one or more :
    Filter recipes matching every string in the 2nd longest array, from recipes filtered thanks to the first array
    If none, return "no recipe found"
    If one or more:
    Save the id of recipes matching both arrays into the local idArray
    Filter recipes matching every string in the 3rd array
    If none, return "no recipe found"
    If one or more:
    Save the id of recipes matching all arrays into the local idArray
    Filter recipes matching the textSearch keywords
    If none, return "no recipe found"
    Save the id of recipes matching all tag arrays and textInput into the local idArray
    return idArray
    idArray will be used by getRecipes()
    result from getRecipes will be used by recipeFactory to append them to the DOM
    getIngredients, getAppliances, getUstensils will be called again on the new the result
    */
}
function tagSearch(tags) {
    /* Takes tags object as input
    *
    * Example of tags for Ingredients : {category: 'recipe', keywords: ['lait de coco', 'jus de citron']}
    * Example of tags for Appliance : {category: 'appliance', keywords: ['blender']}
    * Example of tags for Ustensils : {category: 'ustensils', keywords: ['moule à tarte', 'saladier', 'fourchette']}
    * For each string of tags.keywords: filter matching strings in recipes object
    * Return an array of numbers: ids from matching recipes
    */
    return [];
}
function getUserInput(keywords, applianceTags, ustensilsTags) {
    // Gets all inputs from the user. Triggered by click on tag and/or 3+ characters in the text input
    // This should be the callback function to the inputs event listeners (text input, tag select)
}
export {};
