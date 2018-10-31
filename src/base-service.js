import axios from 'axios'
import OptionObject from './option-object'

class BaseService extends OptionObject {
  constructor (opt) {
    super(opt)
    if (!this.name) throw new Error('service name can\'t null')
    if (this.baseUrl === undefined) this.baseUrl = BaseService.config.baseUrl
  }

  getFixUrl (fixAppendName) {
    return fixAppendName ? `${this.baseUrl}/${fixAppendName}` : this.baseUrl
  }

  getAxiosConfig (type, fixAppendName) {
    return {
      url: this.getFixUrl(fixAppendName),
      method: type
    }
  }

  // get请求
  GET (params, fixAppendName) {
    const axiosConfig = this.getAxiosConfig('GET', fixAppendName)
    if (params) axiosConfig.params = params
    return axios(axiosConfig)
  }

  // post请求
  POST (data = {}, fixAppendName) {
    const axiosConfig = this.getAxiosConfig('POST', fixAppendName)
    axiosConfig.data = data
    return axios(axiosConfig)
  }

  // put请求
  PUT (data = {}, fixAppendName) {
    const axiosConfig = this.getAxiosConfig('PUT', fixAppendName)
    if (data) axiosConfig.data = data
    return axios(axiosConfig)
  }

  // delete请求
  DELETE (data = {}, fixAppendName) {
    const axiosConfig = this.getAxiosConfig('DELETE', fixAppendName)
    if (data) axiosConfig.data = data
    return axios(axiosConfig)
  }

  // 添加
  add (data) {
    return this.POST(data)
  }

  // 删除
  remove (data) {
    return this.DELETE(data)
  }

  // 更新
  update (data) {
    return this.PUT(data)
  }

  // 搜索
  search (params) {
    return this.GET(params)
  }

  // 回复
  reply (id, replay = {body: '', superId: ''}) {
    return this.POST(replay, `${id}/reply`)
  }

  // 查询相关讨论
  replies (opt = {id: undefined, page: 1, pageSize: 5}) {
    return opt.id && this.GET({page: opt.page, pageSize: opt.pageSize}, `${opt.id}/replies`)
  }
}

BaseService.config = {baseUrl: ''}
export default BaseService
