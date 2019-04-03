import axios, {AxiosInstance, AxiosRequestConfig, AxiosStatic} from 'axios'

enum HttpRequestType {
    POST = 'POST', GET = 'GET', PUT = 'PUT', DELETE = 'DELETE', UPDATE = 'UPDATE'
}

interface ApiRequestConfig extends AxiosRequestConfig {
    urlSuffix?: string
    listener?: ApiServiceListener
}

interface Props extends AxiosRequestConfig {
    axiosInstance?: AxiosInstance
}

/**请求拦截器*/
export interface ApiServiceListener<ResponseDataType = any> {
    /**请求前回调
     * @param config 请求参数
     * */
    onReady: (config: ApiRequestConfig) => void
    /**
     * 错误回调
     * @param e 错误
     * */
    onError: (e: any) => void
    /**
     * 响应回调
     * @param response
     * */
    onResponse: (response: ResponseDataType) => void
    /**
     * 请求结束回调
     * */
    onEnd: () => void
}


export default class ApiService<ResponseDataType = any> {
    public static globalAxios: AxiosStatic = axios
    private readonly config: Props

    constructor(config: Props = {}) {
        this.config = config
    }

    private async send(config: ApiRequestConfig) {
        const {listener} = config
        listener && listener.onReady(config)
        const mergeConfig = {url: '', ...this.config, ...config}
        if (config.urlSuffix) mergeConfig.url += config.urlSuffix
        const {axiosInstance} = this.config
        /** 若不为空,则使用本实例,否则使用全局axios实例 */
        let response: ResponseDataType | undefined
        try {
            response = (axiosInstance ? await axiosInstance(mergeConfig) : await ApiService.globalAxios(mergeConfig)) as unknown as ResponseDataType
            listener && listener.onResponse(response)
        } catch (e) {
            listener && listener.onError(e)
        } finally {
            listener && listener.onEnd()
        }
        return response
    }

    public get(config: ApiRequestConfig = {}) {
        config.method = HttpRequestType.GET
        return this.send(config)
    }

    public put(config: ApiRequestConfig = {}) {
        config.method = HttpRequestType.PUT
        return this.send(config)
    }

    public delete(config: ApiRequestConfig = {}) {
        config.method = HttpRequestType.DELETE
        return this.send(config)
    }

    public post(config: ApiRequestConfig = {}) {
        config.method = HttpRequestType.POST
        return this.send(config)
    }

    public update(config: ApiRequestConfig = {}) {
        config.method = HttpRequestType.UPDATE
        return this.send(config)
    }
}

