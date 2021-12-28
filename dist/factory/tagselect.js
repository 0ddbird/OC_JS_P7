import { searchParameters } from '../index.js'
import { updateResults } from '../search.js'

export function addTag (name, category) {
    const searchTagsDiv = document.getElementById('search-tags')
    const template = document.getElementById('template_tag').content
    const templateClone = document.importNode(template, true)
    const tag = templateClone.querySelector('.tag')
    const tagTitle = templateClone.querySelector('.tag-title')
    const tagButton = templateClone.querySelector('.tag-btn')

    tagTitle.textContent = name
    tag.classList.add(`${category}-tag`)
    tag.setAttribute('data-category', category)
    tag.setAttribute('data-name', name)
    tagButton.setAttribute('data-category', category)
    tagButton.setAttribute('data-name', name)
    searchTagsDiv.appendChild(templateClone)

    tagButton.addEventListener('click', removeTag)
}

function removeTag (e) {
    const button = e.target
    const tag = e.target.parentNode
    console.log(searchParameters[button.dataset.category])
    searchParameters[button.dataset.category] = searchParameters[button.dataset.category].filter(keyword => keyword !== button.dataset.name)
    tag.parentNode.removeChild(tag)
    e.target.removeEventListener('click', removeTag)

    updateResults()
}
