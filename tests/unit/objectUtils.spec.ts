import {toArray} from '@/objectUtils'

describe('objectUtils', () => {
    it('toArray', () => {
        const item1 = {name: 'a', age: 1}
        const item2 = {name: 'a', age: 1}
        const obj = {item1, item2}
        const targetArray = [item1, item2]
        const paresedArray = toArray(obj)
        const str1 = JSON.stringify(targetArray)
        const str2 = JSON.stringify(paresedArray)
        expect(str1 === str2).toEqual(true)
    })
})
