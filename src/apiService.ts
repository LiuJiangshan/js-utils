import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosStatic} from "axios";

enum HttpRequestType {
    POST = "POST", GET = "GET", PUT = "PUT", DELETE = "DELETE", UPDATE = "UPDATE"
}

interface ApiRequestConfig extends AxiosRequestConfig {
    urlSuffix?: string
}

interface Props extends AxiosRequestConfig {
    axiosInstance?: AxiosInstance
}

export default class ApiService<ResponseDataType = any> {
    public static globalAxios: AxiosStatic = axios
    private readonly config: Props

    constructor(config: Props = {}) {
        this.config = config
    }

    private send(config: ApiRequestConfig): AxiosPromise<ResponseDataType> {
        const mergeConfig = {url: '', ...this.config, ...config}
        if (config.urlSuffix) mergeConfig.url += config.urlSuffix
        const {axiosInstance} = this.config
        /** 若不为空,则使用本实例,否则使用全局axios实例 */
        return axiosInstance ? axiosInstance(mergeConfig) : ApiService.globalAxios(mergeConfig)
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

