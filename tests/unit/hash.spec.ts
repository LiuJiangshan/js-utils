import {stringHash} from '@/hash.js'

test('hash', () => {
    let hashStr = stringHash('ljs')
    expect(hashStr).not.toBeNull()
})
