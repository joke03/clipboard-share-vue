import axios from 'axios' //引用axios

// axios 配置
const service = axios.create({
    baseURL: '/m', //这是调用数据接口
    timeout: 5000 // request timeout
})

// request拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        return Promise.resolve(response);
    },
    error => {
        return Promise.reject(error.response);
    });

export default service;
