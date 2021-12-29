import { addTag } from './factory/tagselect.js'
import { searchParameters } from './index.js'
import { updateResults } from './search.js'

const controls = [document.getElementById('ingredients-controls'), document.getElementById('appliances-controls'), document.getElementById('ustensils-controls')]
const buttons = [document.getElementById('ingredients-btn'), document.getElementById('appliances-btn'), document.getElementById('ustensils-btn')]
const inputs = [document.getElementById('ingredients-input'), document.getElementById('appliances-input'), document.getElementById('ustensils-input')]
const searchbar = document.getElementById('searchbar')

export function addEventListeners () {
    buttons.forEach(button => button.addEventListener('click', expandList))
    inputs.forEach(input => input.addEventListener('click', expandList))
    inputs.forEach(input => input.addEventListener('keyup', handleTagKeyup))
    inputs.forEach(input => input.addEventListener('focusout', () => {
        input.value = ''
    }))
    controls.forEach(control => control.addEventListener('focusout', (evt) => {
        const combobox = evt.target.parentNode.parentNode
        const category = evt.target.dataset.type
        const comboboxDOM = {
            combobox: document.getElementById(`${category}-combobox`),
            controls: document.getElementById(`${category}-controls`),
            button: document.getElementById(`${category}-btn`),
            input: document.getElementById(`${category}-input`),
            list: document.getElementById(`${category}-list`)
        }

        if (!combobox.contains(evt.relatedTarget)) {
            hideList(comboboxDOM, category)
        }
    }))
    searchbar.addEventListener('keyup', handleKeyUp)
}

function expandList (evt) {
    const target = evt.target
    const category = target.dataset.type
    const comboboxDOM = {
        combobox: document.getElementById(`${category}-combobox`),
        controls: document.getElementById(`${category}-controls`),
        button: document.getElementById(`${category}-btn`),
        input: document.getElementById(`${category}-input`),
        list: document.getElementById(`${category}-list`)

    }
    const categoryEquivalences = {
        ingredients: 'ingrédient',
        appliances: 'appareil',
        ustensils: 'ustensile'
    }
    comboboxDOM.input.setAttribute('placeholder', `Rechercher un ${categoryEquivalences[category]}`)
    comboboxDOM.input.setAttribute('size', 20)
    comboboxDOM.input.classList.add('expanded')
    const listArray = [].slice.call(comboboxDOM.list.children)
    if (evt.target === comboboxDOM.button || evt.target === comboboxDOM.input) {
        comboboxDOM.list.classList.remove('hidden')
    }
    listArray.forEach(element => element.addEventListener('click', selectTag))
}

function hideList (comboboxDOM, category) {
    const listArray = [].slice.call(comboboxDOM.list.children)
    listArray.forEach(element => element.removeEventListener('click', selectTag))
    const categoryEquivalences = {
        ingredients: 'Ingrédients',
        appliances: 'Appareils',
        ustensils: 'Ustensiles'
    }

    comboboxDOM.list.classList.add('hidden')
    comboboxDOM.input.setAttribute('placeholder', `${categoryEquivalences[category]}`)
    comboboxDOM.input.setAttribute('size', 10)
    comboboxDOM.input.classList.remove('expanded')
}

function handleKeyUp () {
    // Note : prevent other keys than [AZ-az, space] to trigger search
    if (searchbar.value.length < 3 && searchParameters.textSearch.length > 0) {
        searchParameters.textSearch = ''
        updateResults()
    }

    if (searchbar.value.length >= 3) {
        searchParameters.textSearch = searchbar.value
        updateResults()
    }
}

function handleTagKeyup (evt) {
    const currentInput = evt.target
    const category = currentInput.dataset.type
    const currentTags = [].slice.call(document.querySelectorAll(`li[data-category=${category}]`))
    if (currentInput.value.length >= 3) {
        currentTags.forEach(tag => tag.classList.remove('hidden'))
        const tagsToHide = currentTags.filter(li => !li.dataset.name.includes(currentInput.value))
        tagsToHide.forEach(tag => tag.classList.add('hidden'))
    }
    if (currentInput.value.length < 3) {
        currentTags.forEach(tag => tag.classList.remove('hidden'))
    }
}

function selectTag (e) {
    const category = e.target.dataset.category
    const comboboxDOM = {
        combobox: document.getElementById(`${category}-combobox`),
        controls: document.getElementById(`${category}-controls`),
        button: document.getElementById(`${category}-btn`),
        input: document.getElementById(`${category}-input`),
        list: document.getElementById(`${category}-list`)

    }
    const name = e.target.dataset.name
    searchParameters[category].push(name)
    addTag(name, category)
    hideList(comboboxDOM, category)
    updateResults()
}
