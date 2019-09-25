import {findAll,updateParkChang,deleteParkChang} from '@/services/parkChang';

export default {
  namespace: 'parkChang',
  state: {
    loading: true,
    parkWeis: []
  },
  effects: {
    *fetchAllParkWei(_, { call, put }) {
      const response = yield call(findAll);
      yield put({ type: 'reloadAllParkWei', payload: response.data });
    },
    *fetchDeleteParkWei(_, { call, put }) {
        const response = yield call(deleteParkChang, { id: _.payload });
        yield put({ type: 'fetchAllParkWei' });
      },
    *UpdateParkWei(_, { call, put }) {
      const response = yield call(updateParkChang,_.payload);
      yield put({ type: 'fetchAllParkWei' });
    },
  },
  reducers: {
    reloadAllParkWei(state, action) {
      return {
        ...state,
        parkWeis: action.payload,
        loading: false,
      };
    }
  },
};
