import Tag from "./tags/Tag.js"

const br = new Tag('br')

const input = new Tag('input', {type: 'radio'})

const img = new Tag('img', {alt: 'someImg', class: 'someImg', atr: 'sdsdd'})

const div = new Tag('div',{}, 'ghbdtn')
  

console.log(br.toString())

console.log(input.toString())

console.log(div.toString())