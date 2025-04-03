import Tag from './Tag.js'

export default class Input {
  stringLine: string[] = []
  constructor(public attrs: Record<string, string> = {}, public withLabel = false) {}

  public toString(): string {
    if (this.withLabel) {
      const capitalizedKeyForLabel = this.attrs.name[0].toUpperCase() + this.attrs.name.substring(1)
      const label = new Tag('label', { for: this.attrs.name }, capitalizedKeyForLabel).toString()
      this.stringLine.push(label)
    }
    this.stringLine.push(new Tag('input', this.attrs).toString())
    return this.stringLine.join('')
  }
}
