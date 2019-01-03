import {stringHash} from '@/hash.js'

describe('hash', () => {
    it('获取hash', () => {
        let hashStr = stringHash('ljs')
        expect(hashStr).not.toBeNull()
    })
})
