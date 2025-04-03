const singleTags = ['br', 'img', 'input'] as const

type SingleTagTypes = (typeof singleTags)[number]

export default class Tag {
  constructor(public name: string, public attrs: Record<string, string | number> = {}, public placeholder: string | number = '') {}

  private isSingle = (x: string): x is SingleTagTypes => (singleTags as readonly string[]).includes(x)

  public toString() {
    const name = this.name
    const entries = Object.entries(this.attrs)

    const attrsString = entries
      .map(([key, value]) => ` ${key}="${value}"`).join('')

    if (this.isSingle(name)) {
      return `<${name}${attrsString}>`
    }
    else {
      return `<${name}${attrsString}>${this.placeholder}</${name}>`
    }
  }
}
