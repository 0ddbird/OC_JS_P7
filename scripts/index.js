import { addEventListeners } from './events.js'
import { displayResults } from './display.js'

export const searchParameters = {
    textSearch: '',
    ingredients: [],
    appliances: [],
    ustensils: []
}

function init () {
    displayResults([...Array(50).keys()])
    addEventListeners()
}

init()
