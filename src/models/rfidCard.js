import {findAll} from '@/services/rfidcard';

export default {
  namespace: 'rfidcard',
  state: {
    loading: true,
    rfidcards: []
  },
  effects: {
    *fetchAllRfid(_, { call, put }) {
      const response = yield call(findAll);
      yield put({ type: 'reloadAllRfidCard', payload: response.data });
    },
   

  },
  reducers: {
    reloadAllRfidCard(state, action) {
      return {
        ...state,
        rfidcards: action.payload,
        loading: false,
      };
    }
  },
};
