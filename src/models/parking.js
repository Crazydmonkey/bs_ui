import {findAll} from '@/services/parking';

export default {
  namespace: 'parking',
  state: {
    loading: true,
    parks: []
  },
  effects: {
    *fetchAllPark(_, { call, put }) {
      const response = yield call(findAll);
      yield put({ type: 'reloadAllPark', payload: response.data });
    },
    *fetchParkByUser(_, { call, put }) {
      yield put({ type: 'reloadAllPark', payload: _.payload });
    },
  },
  reducers: {
    reloadAllPark(state, action) {
      return {
        ...state,
        parks: action.payload,
        loading: false,
      };
    }
  },
};
