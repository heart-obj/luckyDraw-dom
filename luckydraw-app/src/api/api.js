import request from '../utils/request'
let baseUrl = 'http://www.tenxunyun.xyz';
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:8080';
}
export function loadGetGoods (data, token) {
  console.log(data)
  return request ({
    methods: 'get',
    url: '/api/user/turntable/index',
    params: data,
    token: token
  })
}
export function menu_random (data, token) {
  return request ({
    methods: 'get',
    url: '/api/user/turntable/menu_random',
    params: data,
    token: token
  })
}

