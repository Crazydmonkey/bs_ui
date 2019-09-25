import {findAll,UpdateStatusCode,RegisterUser,deleteUser,UpdateUser} from '@/services/cuser';
import {fetchAllRfid} from '@/models/rfidCard'
export default {
  namespace: 'cusers',
  state: {
    loading: true,
    users: []
  },
  effects: {
    *fetchAllUsers(_, { call, put }) {
      const response = yield call(findAll);
      yield put({ type: 'reloadAllUsers', payload: response.data });
    },
    *fetchAllUserByName(_, { call, put }) {
      yield put({ type: 'reloadAllUsers', payload: _.payload });
    },
    *fetchUpdateStatusCode(_, { call, put }) {
      const response = yield call(UpdateStatusCode,_.payload);
      yield put({ type: 'fetchAllUsers' });
    },
    *fetchRegisterUser(_, { call, put }) {
      const response = yield call(RegisterUser,_.payload);
      yield put({ type: 'fetchAllUsers'});
      yield put({ type: fetchAllRfid});
    },
    *fetchUpdateUser(_, { call, put }) {
      const response = yield call(UpdateUser,_.payload);
      yield put({ type: 'fetchAllUsers'});
      
    },
    *fetchdeleteUser(_, { call, put }) {
      const response = yield call(deleteUser,_.payload);
      yield put({ type: 'fetchAllUsers', payload: response.data });
    },
  },
  reducers: {
    reloadAllUsers(state, action) {
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    }
  },
};
