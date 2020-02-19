import {
  ADD_CAT,
  REMOVE_ALL_CATS
} from '@/constants/mutationTypes.js';

export const initialState = {
  dataList: []
};

export default {
  state: {...initialState},
  mutations: {
    [ADD_CAT](state, {data: data}) {
      state.dataList.push(data);
    },
    [REMOVE_ALL_CATS](state) {
      state.dataList = [];
    }
  }
};
