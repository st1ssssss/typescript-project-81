export type ITemplate = Record<string, string>

export type Methods = 'get' | 'post'

export interface InputOtions {
  as?: 'input' | 'textarea'
}

export interface IFieldTemplates {
  opt?: InputOtions & Record<string, string | number>
  name?: string
  value?: string
}
