import request from '@/utils/request';
/* 封装所有的异步请求 */
export async function findAll() {
  return request('/api/parking/findAll');
}
export async function deleteParkChang(id) {
  return request('/api/parking/deleteParkingById', { params: id });
}
export async function updateParkChang(parkWei) {
  return  request('/api/parking/saveOrUpdate', {
    method: 'post',
    params: parkWei,
    getResponse: true,
  });
}