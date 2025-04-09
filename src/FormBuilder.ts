import Input from './Input.js'
import Tag from './Tag.js'
import Textarea from './Textarea.js'
import { IFieldTemplates } from './interfaces.js'

class FormBuilder {
  public static builder(template: IFieldTemplates[], options: { method: 'post' | 'get', action: string }) {
    const form = template.map((el) => {
      if (el.opt === undefined) {
        return new Input ({ name: el.name!, type: 'text', value: el.value! }, true).toString()
      }
      const filteredInputOpt = Object.fromEntries(Object.entries(el.opt).filter((el) => {
        if (el[0] !== 'as') {
          return true
        }
      }))
      if (el.opt.as === 'textarea') {
        return new Textarea ({ ...filteredInputOpt, name: el.name! }, el.value, true).toString()
      }
      if (el.opt.type === 'submit') {
        return new Input({ type: 'submit', value: el.opt.value as string }).toString()
      }
      return new Input ({ name: el.name!, type: 'text', value: el.value!, ...filteredInputOpt }, true).toString()
    })
    const formStrings = form.join('')
    return new Tag('form', options, formStrings).toString()
  }
}

export default FormBuilder
