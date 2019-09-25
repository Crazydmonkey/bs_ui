import request from '@/utils/request';
/* 封装所有的异步请求 */
export async function findAll() {
  return request('/api/parkHistory/findAllParkingHistoryWithUser');
}
export async function findByTime(par) {
  return  request('/api/parkHistory/query?endtime='+par.endtime+'&startime='+par.startime, {
    method: 'get',
    getResponse: true,
  });
}
