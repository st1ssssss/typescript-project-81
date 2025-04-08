import FormBuilder from './FormBuilder.js'
import { Methods, ITemplate } from './interfaces.js'
import Form from './Form.js'

class HexletCode {
  public static formFor(template: ITemplate, methods: { url?: string, method?: Methods }, callback: (v: Form) => void) {
    const form = new Form(template, { method: methods.method ?? 'post', action: methods.url ?? '#' })
    callback(form)
    return FormBuilder.builder(form.getFields, form.options)
  }
}

export default HexletCode
