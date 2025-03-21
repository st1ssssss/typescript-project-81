import { singleTags, SingleTagTypes } from "../types/tag-types/types.js";
  

export default class Tag {
    constructor (public name: SingleTagTypes|string, public attrs:{[key: string]: string} = {}, public placeholder: string|number = ''){}

    private isSingle = (x: string): x is SingleTagTypes => singleTags.includes(x);

    public toString(){
        const entries = Object.entries(this.attrs)

        const attrsString = entries.map(el=>[el[0], `"${el[1]}"`]).map(el=>el.join('=')).join(' ') 
        if(this.isSingle(this.name)){

            return `<${this.name}${entries.length ? ' ' + attrsString : ''}>`
        } else {
            return `<${this.name}${entries.length ? ' ' + attrsString : ''}>${this.placeholder}</${this.name}>`
        }

    }

}