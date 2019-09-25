import {findAll} from '@/services/paying';

export default {
  namespace: 'paying',
  state: {
    loading: true,
    paies: []
  },
  effects: {
    *fetchAllPay(_, { call, put }) {
      const response = yield call(findAll);
      yield put({ type: 'reloadAllPay', payload: response.data });
    },
    *fetchAllPayByUser(_, { call, put }) {

      yield put({ type: 'reloadAllPay', payload: _.payload });
    }
  },
  reducers: {
    reloadAllPay(state, action) {
      return {
        ...state,
        paies: action.payload,
        loading: false,
      };
    }
  },
};
