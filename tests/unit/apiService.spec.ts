import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import ApiService from "@/apiService";
import MockHttpMessage from '../mockHttpMessage'

const mockAdapter = new MockAdapter(axios);
mockAdapter.onGet('/api/user').reply(200, {
    msg: MockHttpMessage.searchOK,
    ok: true,
    data: [
        {id: 1, name: 'tom'},
        {id: 2, name: 'jack'}]
})
mockAdapter.onDelete('/api/user').reply(200, {
    msg: MockHttpMessage.deleteOk,
    ok: true,
    data: {}
})
mockAdapter.onGet('/api/user/job').reply(200, {
    msg: MockHttpMessage.searchOK,
    ok: true,
    data: {name: 'CEO', wage: 10000}
})
const userService = new ApiService({baseURL: '/api', url: '/user'})
test('GET请求', async () => {
    const response = await userService.get()
    expect(response.data.msg).toBe(MockHttpMessage.searchOK)
})
test('DELETE请求', async () => {
    const response = await userService.delete()
    expect(response.data.msg).toBe(MockHttpMessage.deleteOk)
})
test('后缀模式请求', async () => {
    const response = await userService.get({urlSuffix: '/job'})
    expect(response.data.msg).toBe(MockHttpMessage.searchOK)
    expect(response.data.data.name).not.toBeNull()
    expect(typeof response.data.data.wage).toBe('number')
})

