import { validateHeaderName } from 'http'
import Tag from '../tags/Tag.js'

type ITemplate = Record<string, string>

type Methods = 'get' | 'post'

interface InputOtions {
  as?: 'input' | 'textarea'
}

class FormBuilder {
  constructor(private template: ITemplate) {}

  fields: string[] = []

  input(templateKeyName: string, inputOpt?: InputOtions & Record<string, string | number>) {
    const value = this.template[templateKeyName]

    if (value !== undefined) {
      const capitalizedKeyForLabel = templateKeyName[0].toUpperCase() + templateKeyName.substring(1)
      if (inputOpt !== undefined) {
        const filteredInputOpt = Object.fromEntries(Object.entries(inputOpt).filter((el) => {
          if (el[0] !== 'as') {
            return true
          }
        }))
        if (inputOpt.as === 'textarea') {
          if (filteredInputOpt.cols === undefined) {
            filteredInputOpt.cols = 20
          }
          if (filteredInputOpt.rows === undefined) {
            filteredInputOpt.rows = 40
          }
          const label = new Tag('label', { for: templateKeyName }, capitalizedKeyForLabel).toString()
          const formString = new Tag (inputOpt.as, { ...filteredInputOpt, name: templateKeyName }, value).toString()
          this.fields.push(label, formString)
        }
        else {
          const label = new Tag('label', { for: templateKeyName }, capitalizedKeyForLabel).toString()
          const formString = new Tag ('input', { name: templateKeyName, type: 'text', value: value, ...filteredInputOpt }).toString()
          this.fields.push(label, formString)
        }
      }
      else {
        const label = new Tag('label', { for: templateKeyName }, capitalizedKeyForLabel).toString()
        const formString = new Tag ('input', { name: templateKeyName, type: 'text', value: value }).toString()
        this.fields.push(label, formString)
      }
    }
    else {
      throw new Error(`Field '${templateKeyName}' does not exist in the template.`)
    }
  }

  submit(placeholder = 'Save') {
    const formString = new Tag('input', { type: 'submit', value: placeholder }).toString()
    this.fields.push(formString)
  }

  get getFields() {
    return this.fields.join('')
  }
}

export default class HexletCode {
  public static formFor(template: ITemplate, methods: { url?: string, method?: Methods }, callback: (v: FormBuilder) => void) {
    const builder = new FormBuilder(template)
    callback(builder)
    const formStrings = builder.getFields
    return new Tag('form', { method: methods.method ?? 'post', action: methods.url ?? '#' }, formStrings).toString()
  }
}
