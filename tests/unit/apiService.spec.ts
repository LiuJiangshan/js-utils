import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import ApiService, {ApiServiceListener} from "@/apiService";
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
describe('apiService', () => {
    beforeEach(() => {
    })

    it('GET请求', async () => {
        const userService = new ApiService({baseURL: '/api', url: '/user'})
        const response = await userService.get()
        expect(response.data.msg).toBe(MockHttpMessage.searchOK)
    })
    it('DELETE请求', async () => {
        const userService = new ApiService({baseURL: '/api', url: '/user'})
        const response = await userService.delete()
        expect(response.data.msg).toBe(MockHttpMessage.deleteOk)
    })
    it('后缀模式请求', async () => {
        const userService = new ApiService({baseURL: '/api', url: '/user'})
        const response = await userService.get({urlSuffix: '/job'})
        expect(response.data.msg).toBe(MockHttpMessage.searchOK)
        expect(response.data.data.name).not.toBeNull()
        expect(typeof response.data.data.wage).toBe('number')
    })
    it('全局拦截器', async () => {
        const onFulfilled = jest.fn(config => config)
        ApiService.globalAxios.interceptors.request.use(onFulfilled)
        const testCount = 5
        for (let i = 0; i < testCount; i++) await new ApiService({
            baseURL: '/api',
            url: '/user'
        }).get({urlSuffix: '/job'})
        expect(onFulfilled.mock.calls.length).toBe(testCount)
    })
    it('单实例拦截器', async () => {
        const onFulfilled = jest.fn(config => config)
        const axiosInstance = axios.create()
        axiosInstance.interceptors.request.use(onFulfilled)
        const userService = new ApiService({axiosInstance, baseURL: '/api', url: '/user'})
        const testCount = 5
        for (let i = 0; i < testCount; i++) await userService.get({urlSuffix: '/job'})
        expect(onFulfilled.mock.calls.length).toBe(testCount)
    })
    it('全局、单实例拦截器同时使用', async () => {
        const globalOnFulfilled = jest.fn(config => config)
        const instanceOnFulfilled = jest.fn(config => config)
        ApiService.globalAxios.interceptors.request.use(globalOnFulfilled)

        const axiosInstance = axios.create()
        axiosInstance.interceptors.request.use(instanceOnFulfilled)
        const userService1 = new ApiService({axiosInstance, baseURL: 'api', url: 'user'})
        const userService2 = new ApiService({baseURL: 'api', url: 'user'})
        const testCount = 5
        for (let i = 0; i < testCount; i++) {
            await userService1.get({urlSuffix: '/job'})
            await userService2.get({urlSuffix: '/job'})
        }
        expect(globalOnFulfilled.mock.calls.length).toBe(testCount)
        expect(instanceOnFulfilled.mock.calls.length).toBe(testCount)
    })
    it('listener测试', async () => {
        const onReady = jest.fn(config => null)
        const onResponse = jest.fn(response => null)
        const onError = jest.fn(() => null)
        const onEnd = jest.fn(() => null)
        const listener = {onReady, onResponse, onError, onEnd} as ApiServiceListener
        await new ApiService({baseURL: 'api', url: 'user'}).get({urlSuffix: '/job', listener})
        expect(onReady.mock.calls.length).toBe(1)
        expect(onResponse.mock.calls.length).toBe(1)
        expect(onError.mock.calls.length).toBe(0)
        expect(onEnd.mock.calls.length).toBe(1)
    })
})
