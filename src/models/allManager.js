import {findAll,updateManager, findAllTest} from '@/services/allManager';

export default {
  namespace: 'allManager',
  state: {
    loading: true,
    managers: [],
    login_manager:{},
    test:[]
  },
  effects: {
    *fetchAllManager(_, { call, put }) {
      const response = yield call(findAll);
      yield put({ type: 'reloadAllManager', payload: response.data });
    },
    *fetchAllTest(_, { call, put }) {
      const response = yield call(findAllTest);
      yield put({ type: 'reloadAllTest', payload: response.data });
    },
    *UpdateManager(_, { call, put }) {
      const response = yield call(updateManager,_.payload);
    },
    *setLogin_Manager(_, { call, put }) {
      yield put({ type: 'setLoginManager', payload: _.payload });
    },
  },
  reducers: {
    reloadAllManager(state, action) {
      return {
        ...state,
        managers: action.payload,
        loading: false,
      };
    },
    reloadAllTest(state, action) {
      return {
        ...state,
        test: action.payload,
        loading: false,
      };
    },
    setLoginManager(state,action){
        return {
            ...state,login_manager:action.payload
        }
    },
    
  },
};
