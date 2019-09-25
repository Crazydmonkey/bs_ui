import request from '@/utils/request';
/* 封装所有的异步请求 */
export async function findAll() {
  return request('/api/user/findAll');
}
export async function RegisterUser(par) {
  return  request('/api/user/saveOrUpdate', {
    method: 'post',
    params:par,
    getResponse: true
  });
}
export async function UpdateUser(par) {
  return  request('/api/user/Update', {
    method: 'post',
    params:par,
    getResponse: true
  });
}
export async function deleteUser(par) {
  return  request('/api/user/deleteUserById?id='+par.id, {
    method: 'get',
    getResponse: true
  });
}

export async function UpdateStatusCode(par) {
  return  request('/api/readcard/saveOrUpdate?rfid='+par.rfid);
}
