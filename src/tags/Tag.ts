import { singleTags, SingleTagTypes } from '../types/tag-types/types.js'

export default class Tag {
  constructor(public name: string, public attrs: Record<string, string> = {}, public placeholder: string | number = '') {}

  private isSingle = (x: string): x is SingleTagTypes => (singleTags as readonly string[]).includes(x)

  public toString() {
    const name = this.name
    const entries = Object.entries(this.attrs)

    const attrsString = entries
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')

    if (this.isSingle(name)) {
      return `<${name}${attrsString ? ` ${attrsString}` : ''}>`
    }
    else {
      return `<${name}${attrsString ? ` ${attrsString}` : ''}>${this.placeholder}</${name}>`
    }
  }
}
