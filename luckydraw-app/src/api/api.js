import request from '../utils/request'
export function loadGetGoods (data, token) {
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

