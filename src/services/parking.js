import request from '@/utils/request';
/* 封装所有的异步请求 */
export async function findAll() {
  return request('/api/willpark/findAllParkWithUser');
}
