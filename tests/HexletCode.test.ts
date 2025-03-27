import { expect, test } from 'vitest'
import HexletCode from '../src/HexletCode/HexletCode.js'

const template = { name: 'rob', job: 'hexlet', gender: 'm' }

test('empty second arg', () => {
  expect(HexletCode.formFor(template, {}, (f) => {})).toBe('<form method="post" action="#"></form>')
})

test('defined second arg', () => {
  expect(HexletCode.formFor(template, { url: '/users' }, (f) => {})).toBe('<form method="post" action="/users"></form>')
})

test('form with textarea and empty input', () => {
  expect(HexletCode.formFor(template, { url: '/users' }, (f) => {
    f.input('name')
    f.input('job', { as: 'textarea' })
  })).toBe('<form method="post" action="/users"><label for="name">Name</label><input name="name" type="text" value="rob"><label for="job">Job</label><textarea cols="20" rows="40" name="job">hexlet</textarea></form>')
})

test('form with classified input and empty input', () => {
  expect(HexletCode.formFor(template, {}, (f) => {
    f.input('name', { class: 'user-input' })
    f.input('job')
  })).toBe('<form method="post" action="#"><label for="name">Name</label><input name="name" type="text" value="rob" class="user-input"><label for="job">Job</label><input name="job" type="text" value="hexlet"></form>')
})

test('empty textarea with defaults', () => {
  expect(HexletCode.formFor(template, {}, (f) => {
    f.input('job', { as: 'textarea' })
  })).toBe('<form method="post" action="#"><label for="job">Job</label><textarea cols="20" rows="40" name="job">hexlet</textarea></form>')
})

test('redefine textarea defaults', () => {
  expect(HexletCode.formFor(template, {}, (f) => {
    f.input('job', { as: 'textarea', rows: 50, cols: 50 })
  })).toBe('<form method="post" action="#"><label for="job">Job</label><textarea rows="50" cols="50" name="job">hexlet</textarea></form>')
})

test('Unexisted field', () => {
  expect(() => HexletCode.formFor(template, {}, (f) => {
    f.input('name')
    f.input('job', { as: 'textarea' })
    f.input('age')
  // eslint-disable-next-line @stylistic/quotes
  })).toThrowError("Field 'age' does not exist in the template.")
})

test('Empty submit button', () => {
  expect(HexletCode.formFor(template, { method: 'post' }, (f) => {
    f.input('name')
    f.input('job')
    f.submit()
  })).toBe('<form method="post" action="#"><label for="name">Name</label><input name="name" type="text" value="rob"><label for="job">Job</label><input name="job" type="text" value="hexlet"><input type="submit" value="Save"></form>')
})

test('Non-empty submit', () => {
  expect(HexletCode.formFor(template, { method: 'post' }, (f) => {
    f.input('name')
    f.input('job')
    f.submit('Wow')
  })).toBe('<form method="post" action="#"><label for="name">Name</label><input name="name" type="text" value="rob"><label for="job">Job</label><input name="job" type="text" value="hexlet"><input type="submit" value="Wow"></form>')
})
