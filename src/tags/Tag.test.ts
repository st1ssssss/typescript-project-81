import { expect, test } from 'vitest'
import Tag from './Tag.js'

test('<br> tag layout', () => {
    expect(new Tag('br').toString()).toBe('<br>')
  })

  test('<img> tag layout', () => {
    expect(new Tag('img', { alt: 'someImg', class: 'someImg', atr: 'sdsdd' }).toString()).toBe('<img alt="someImg" class="someImg" atr="sdsdd">')
  })

  test('<div> tag layout', () => {
    expect(new Tag('div', {}, 'ghbdtn').toString()).toBe('<div>ghbdtn</div>')
  })