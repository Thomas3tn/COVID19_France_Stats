export default {
    namespaced: true,
    state: () => ({
        datas: null
    }),
    mutations: {
        ADD_TREE(state, {datas}) {
            state.datas = datas;
        }
    },
    actions: {},
    getters: {
        find: (state) => (keysValues) => {

            try {
                return state.datas.find(keysValues);
            } catch (error) {
                return false;
            }
            
        }
    }
}