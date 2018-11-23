import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig} from "axios";

enum HttpRequestType {
    POST = "POST", GET = "GET", PUT = "PUT", DELETE = "DELETE", UPDATE = "UPDATE"
}

interface ApiRequestConfig extends AxiosRequestConfig {
    urlSuffix?: string
}

export default class ApiService {
    private config: AxiosRequestConfig
    public axiosInstance: AxiosInstance = axios

    constructor(config: AxiosRequestConfig = {}) {
        this.config = config
        this.axiosInstance = axios.create(config)
    }

    private send(config: ApiRequestConfig): AxiosPromise {
        config.url = config.url || this.config.url || ''
        if (config.urlSuffix) config.url += config.urlSuffix
        return this.axiosInstance(config)
    }

    public get(config: ApiRequestConfig = {}): AxiosPromise {
        config.method = HttpRequestType.GET
        return this.send(config)
    }

    public put(config: ApiRequestConfig = {}): AxiosPromise {
        config.method = HttpRequestType.PUT
        return this.send(config)
    }

    public delete(config: ApiRequestConfig = {}): AxiosPromise {
        config.method = HttpRequestType.DELETE
        return this.send(config)
    }

    public post(config: ApiRequestConfig = {}): AxiosPromise {
        config.method = HttpRequestType.POST
        return this.send(config)
    }

    public update(config: ApiRequestConfig = {}): AxiosPromise {
        config.method = HttpRequestType.UPDATE
        return this.send(config)
    }
}

