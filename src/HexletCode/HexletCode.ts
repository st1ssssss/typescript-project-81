import Input from '../Input.js'
import Tag from '../Tag.js'
import Textarea from '../Textarea.js'

type ITemplate = Record<string, string>

type Methods = 'get' | 'post'

interface InputOtions {
  as?: 'input' | 'textarea'
}
interface IFieldTemplates {
  opt?: InputOtions & Record<string, string | number>
  name?: string
  value?: string
}

class FormBuilder {
  public static builder(template: IFieldTemplates[]) {
    const form = template.map((el) => {
      if (el.opt !== undefined) {
        const filteredInputOpt = Object.fromEntries(Object.entries(el.opt).filter((el) => {
          if (el[0] !== 'as') {
            return true
          }
        }))
        if (el.opt?.as === 'textarea') {
          const formString = new Textarea ({ ...filteredInputOpt, name: el.name! }, el.value, true).toString()
          return formString
        }
        else if (el.opt?.type === 'submit') {
          const formString = new Input({ type: 'submit', value: el.opt.value as string }).toString()
          return formString
        }
        else {
          const formString = new Input ({ name: el.name!, type: 'text', value: el.value!, ...filteredInputOpt }, true).toString()
          return formString
        }
      }
      else {
        const formString = new Input ({ name: el.name!, type: 'text', value: el.value! }, true).toString()
        return formString
      }
    })
    return form.join('')
  }
}
class Form {
  constructor(private template: ITemplate, public options: { method: 'post' | 'get', action: string }) {}

  fieldsTemplates: IFieldTemplates[] = []

  input(templateKeyName: string, inputOpt?: InputOtions & Record<string, string | number>) {
    const value = this.template[templateKeyName]

    if (value !== undefined) {
      if (inputOpt !== undefined) {
        this.fieldsTemplates.push({ opt: inputOpt, name: templateKeyName, value: value })
      }
      else {
        this.fieldsTemplates.push({ name: templateKeyName, value: value })
      }
    }
    else {
      throw new Error(`Field '${templateKeyName}' does not exist in the template.`)
    }
  }

  submit(placeholder = 'Save') {
    this.fieldsTemplates.push({ opt: { type: 'submit', value: placeholder } })
  }

  get getFields() {
    return this.fieldsTemplates
  }
}

export default class HexletCode {
  public static formFor(template: ITemplate, methods: { url?: string, method?: Methods }, callback: (v: Form) => void) {
    const form = new Form(template, { method: methods.method ?? 'post', action: methods.url ?? '#' })
    callback(form)
    const formStrings = FormBuilder.builder(form.getFields)
    return new Tag('form', form.options, formStrings).toString()
  }
}
