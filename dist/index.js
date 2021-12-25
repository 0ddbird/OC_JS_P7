import { recipes } from './data/recipes.js';
import { recipeFactory } from './factory/recipeFactory.js';
function init() {
    recipes.forEach(recipe => recipeFactory(recipe));
}
const searchbar = document.getElementById('searchbar');
searchbar.addEventListener('keyup', handleKeyUp);
function handleKeyUp() {
    // Note : prevent other keys than [AZ-az, space] to trigger search
    if (searchbar.value.length >= 3) {
        console.log('3 or more characters in searchbar:', searchbar.value);
    }
}
init();
