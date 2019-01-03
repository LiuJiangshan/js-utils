import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import MockHttpMessage from '../mockHttpMessage'

const mockAdapter = new MockAdapter(axios);
mockAdapter.onGet('/api/user').reply(200, {
    msg: MockHttpMessage.searchOK,
    ok: true,
    data: [
        {id: 1, name: 'tom'},
        {id: 2, name: 'jack'}]
})
describe('axios', () => {
    test('请求拦截器', async function () {
        const onFulfilled = jest.fn(config => {
            return config
        })
        axios.interceptors.request.use(onFulfilled)
        await axios({url: '/api/user', method: 'get'})
        expect(onFulfilled.mock.calls.length).toBe(1)
    });
})
