import OptionObject from './option-object'
import forIn from 'lodash/forIn'
import EnumItem from './enum-item'

export default class Enum extends OptionObject {
  constructor (opt) {
    super(opt)
    forIn(opt, (val, key) => {
      if ((!(val instanceof EnumItem))) {
        console.error(val, key, val)
        throw new Error('枚举项不是枚举单项类型')
      }
    })
  }

  /** 获取该枚举的所有枚举项 */
  get enums () {
    const enums = []
    forIn(this, (val, key) => val instanceof EnumItem && enums.push(val))
    return enums
  }

  /** 从值转换得到枚举对象重的单个枚举项 */
  parseFromValue (value) {
    try {
      return this.enums.filter(it => it.value === value)[0]
    } catch (e) {
      console.warn('枚举转换失败', value, this)
    }
  }
}
