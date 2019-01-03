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
describe('apiService', () => {
    beforeEach(() => {
    })

    it('GET请求', async () => {
        const response = await userService.get()
        expect(response.data.msg).toBe(MockHttpMessage.searchOK)
    })
    it('DELETE请求', async () => {
        const response = await userService.delete()
        expect(response.data.msg).toBe(MockHttpMessage.deleteOk)
    })
    it('后缀模式请求', async () => {
        const response = await userService.get({urlSuffix: '/job'})
        expect(response.data.msg).toBe(MockHttpMessage.searchOK)
        expect(response.data.data.name).not.toBeNull()
        expect(typeof response.data.data.wage).toBe('number')
    })
    it('全局拦截器', async () => {
        const onFulfilled = jest.fn(config => config)
        ApiService.globalAxios.interceptors.request.use(onFulfilled)
        await new ApiService({baseURL: '/api', url: '/user', method: 'get'}).get({urlSuffix: '/job'})
        expect(onFulfilled.mock.calls.length).toBe(1)
    })
    it('单实例拦截器', async () => {
        const onFulfilled = jest.fn(config => config)
        const axiosInstance = axios.create()
        axiosInstance.interceptors.request.use(onFulfilled)
        await new ApiService({axiosInstance, baseURL: '/api', url: '/user', method: 'get'}).get({urlSuffix: '/job'})
        expect(onFulfilled.mock.calls.length).toBe(1)
    })
    it('全局、单实例拦截器混合', () => {
        const globalOnFulfilled = jest.fn(config => config)
        const instanceOnFulfilled = jest.fn(config => config)
    })
})
