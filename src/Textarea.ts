import Tag from './Tag.js'

export default class Textarea extends Tag {
  stringLine: string[] = []

  constructor(public attrs: Record<string, string> = {}, public placeholder: string | number = '', public withLabel = false) {
    super('textarea', attrs, placeholder)
  }

  public toString(): string {
    if (this.withLabel) {
      const capitalizedKeyForLabel = this.attrs.name[0].toUpperCase() + this.attrs.name.substring(1)
      const label = new Tag('label', { for: this.attrs.name }, capitalizedKeyForLabel).toString()
      this.stringLine.push(label)
    }
    this.stringLine.push(super.toString())
    return this.stringLine.join('')
  }
}
