import { recipes } from './data/recipes.js'
import { displayRecipes } from './components/display.js'
import { recipeFactory } from './factory/recipeFactory.js'

function init ():void {
    recipes.forEach(recipe => recipeFactory(recipe))
}

const searchbar = (<HTMLInputElement>document.getElementById('searchbar'))

searchbar!.addEventListener('keyup', handleKeyUp)

function handleKeyUp ():void {
    // Note : prevent other keys than [AZ-az, space] to trigger search
    if (searchbar.value.length >= 3) {
        console.log('3 or more characters in searchbar:', searchbar.value)
    }
}

init()
