import {stringHash} from '@/hash'

describe('hash', () => {
    it('获取hash', () => {
        let hashStr = stringHash('ljs')
        expect(hashStr).not.toBeNull()
    })
})
