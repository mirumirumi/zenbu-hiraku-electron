import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

export interface State {
  like: number,
}

export const store = createStore<State>({
  state: {
    like: 13,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

export const key: InjectionKey<Store<State>> = Symbol();
export const useStore = () => {  //eslint-disable-line
  return baseUseStore(key)
}
