import {findAll,findByTime} from '@/services/parkHistory';

export default {
  namespace: 'parkHistory',
  state: {
    loading: true,
    histories: []
  },
  effects: {
    *fetchAllHistories(_, { call, put }) {
      const response = yield call(findAll);
      yield put({ type: 'reloadAllHistories', payload: response.data });
    },
    *fetchHistoriesByUser(_, { call, put }) {
      yield put({ type: 'reloadAllHistories', payload: _.payload });
    },
    *fetchByTime(_, { call, put }) {
      const response = yield call(findByTime,_.payload);
      
      yield put({ type: 'reloadAllHistories', payload: response.data.data });
    }
  },
  reducers: {
    reloadAllHistories(state, action) {
      return {
        ...state,
        histories: action.payload,
        loading: false,
      };
    }
  },
};
