import { expect, test } from 'vitest'
import path from 'path'
import fs from 'fs'
import HexletCode from '../src/HexletCode/HexletCode.js'

const getFixturePath = (filename: string) => path.join(__dirname, '__fixtures__', filename)
const readFile = (filename: string) => fs.readFileSync(getFixturePath(filename), 'utf-8')

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
  })).toBe(readFile('TextareaWithEmptyInput.html'))
})

test('form with classified input and empty input', () => {
  expect(HexletCode.formFor(template, {}, (f) => {
    f.input('name', { class: 'user-input' })
    f.input('job')
  })).toBe(readFile('ForWithClassifiedAndEmptyInputs.html'))
})

test('empty textarea with defaults', () => {
  expect(HexletCode.formFor(template, {}, (f) => {
    f.input('job', { as: 'textarea' })
  })).toBe(readFile('EmptyTextareaWithDefaults.html'))
})

test('redefine textarea defaults', () => {
  expect(HexletCode.formFor(template, {}, (f) => {
    f.input('job', { as: 'textarea', rows: 50, cols: 50 })
  })).toBe(readFile('RedefineTextareaDefaults.html'))
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
  })).toBe(readFile('EmptySubmitButton.html'))
})

test('Non-empty submit', () => {
  expect(HexletCode.formFor(template, { method: 'post' }, (f) => {
    f.input('name')
    f.input('job')
    f.submit('Wow')
  })).toBe(readFile('NonEmptySubmit.html'))
})
