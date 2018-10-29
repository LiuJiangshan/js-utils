/** 枚举对象类 */
import OptionObject from './option-object'

export default class EnumItem extends OptionObject {
  constructor (opt) {
    super(opt)
    if (this.value === undefined) {
      console.error(this)
      throw new Error('枚举对象必须定义值')
    }
    if (!this.name) console.log('枚举对象最好定义一个字面名称name', this)
  }
}
