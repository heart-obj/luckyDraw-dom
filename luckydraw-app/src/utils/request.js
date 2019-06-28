import axios from 'axios'
if (process.env.NODE_ENV === 'development'){
  axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV === 'debug'){
  axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV === 'production') { 
  axios.defaults.baseURL = 'http://***********/';
}
// 设置超时时间
axios.defaults.timeout = 10000;
// 设置post 请求头
axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 对接接口
export function request ({methods, url, params, token}) {
  if(methods === 'get') {
    return get(url, params, token)
  } else if(methods === 'post') {
    return post(url, params, token)
  }
}
/**
 * get请求
 * @param {*} url 
 * @param {*} params 
 */
function get (url, params, token) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common['token'] = token;
    console.log(params)
    axios.get(url, {params:params}).then(res => {
      resolve(res) 
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 * post请求
 * @param {*} url 
 * @param {*} params 
 */
function post (url, params, token) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common['token'] = token;
    axios.post(url, {params:params}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default request
