### ApiService
#### 一、介绍
##### 一劳永逸、面向对象的http请求方案,更适合restful api访问
#### 二、简单使用
###### 有如下api:
|Url|Params|Method|Info|
|-----|:----|:----|-----|
|/api/user|{name:""}|GET|获取用户列表|
|/api/user| {id:""}       |DELETE|删除指定用户|
|/api/user/job|{id:""}|GET|获取指定用户职位信息|

同时访问这些api只需创建一次apiService实例

```typescript
import ApiService from "@/apiService"
// 创建实例
const userService = new ApiService({baseURL:"/api",url:"/user"})
// 查询用户列表
userService.get({params:{name:"tom"}}).then(
    response=>{
        console.log(response.data)
    })
// 查询指定用户职位信息
userService.get({urlSuffix:"/job",params:{id:99}}).then(
    response=>{
        console.log(response.data)
    })
// 删除指定用户
userService.delete({data:{id:99}}).then(
    response=>{
        console.log(response.data)
    })
```
#### 三、拦截器
##### 1.全局拦截器
```typescript
import ApiService from '@/apiService'
// 设置全局拦截器
ApiService.globalAxios.interceptors...
```
##### 2.单实例拦截器
```typescript
import ApiService from '@/apiService'
import axios from 'axios'
const axiosInstance = axios.create()
// 设置单实例拦截器
axiosInstance.interceptors...
// 注意:使用单例拦截器后,全局拦截器将失效
const userService = new ApiService({axiosInstance})
```
