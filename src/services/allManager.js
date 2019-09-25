import request from '@/utils/request';
/* 封装所有的异步请求 */
export async function findAll() {
  return request('/api/manager/findAll');
}
export async function findAllTest() {
  return request('/test/category/findAll');
}
export async function deleteManager(id) {
  return request('/api/manager/deleteManagerByid', { params: id });
}
export async function updateManager(manager) {
  return  request('/api/manager/saveOrUpdate', {
    method: 'post',
    params: manager,
    getResponse: true,
  });
}
export async function findManagerById(id) {
  return request('/api/manager/findManagerById', { params: id });
}
