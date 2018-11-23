import forIn from 'lodash/forIn'

/** 将传入的对象转为类对象 */
export default class OptionObject {
    constructor(option: object) {
        option && forIn(option, (val, key) => {
            this[key] = val
        })
    }
}
