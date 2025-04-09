import { IFieldTemplates, InputOtions, ITemplate } from './interfaces.js'

class Form {
  constructor(private template: ITemplate, public options: { method: 'post' | 'get', action: string }) {}

  fieldsTemplates: IFieldTemplates[] = []

  input(templateKeyName: string, inputOpt?: InputOtions & Record<string, string | number>) {
    const value = this.template[templateKeyName]

    if (value === undefined) {
      throw new Error(`Field '${templateKeyName}' does not exist in the template.`)
    }
    this.fieldsTemplates.push({ opt: inputOpt, name: templateKeyName, value: value })
  }

  submit(placeholder = 'Save') {
    this.fieldsTemplates.push({ opt: { type: 'submit', value: placeholder } })
  }

  get getFields() {
    return this.fieldsTemplates
  }
}

export default Form
