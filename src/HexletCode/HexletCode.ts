import Tag from '../tags/Tag.js'

type ITemplate = Record<string, string>

type Methods = 'get' | 'post'

export default class HexletCode {
  public static formFor(template: ITemplate, methods: { url?: string, method?: Methods }, callback: (v: unknown) => void) {
    return new Tag('form', { action: methods.url ?? '#', method: methods.method ?? 'post' }).toString()
  }
}
