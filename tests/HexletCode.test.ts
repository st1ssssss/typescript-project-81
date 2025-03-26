import { expect, test } from 'vitest'
import HexletCode from '../src/HexletCode/HexletCode.js'

const template = { name: 'rob', job: 'hexlet', gender: 'm' }

test('empty second arg', () => {
  expect(HexletCode.formFor(template, {}, (f) => {})).toBe('<form action="#" method="post"></form>')
})

test('defined second arg', () => {
  expect(HexletCode.formFor(template, { url: '/users' }, (f) => {})).toBe('<form action="/users" method="post"></form>')
})
