export default {
    namespaced: true,
    state: () => ({
        datas: null
    }),
    mutations: {
        COPY_OUTDATED_LOCAL_STORAGE_DATAS(state, payload) {
            state.datas = payload.datas;
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