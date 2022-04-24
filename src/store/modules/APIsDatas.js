import Tree from "../../assets/JSClasses/DatasStructures/Tree.js";

export default {
    namespaced: true,
    state: () => ({
        datas: null
    }),
    mutations: {
        CREATE_TREE(state, {datas}) {
            state.datas = new Tree(datas);
        },
        COPY_LOCAL_STORAGE_DATAS(state, {datas}) {
            state.datas = datas;
        },
        ADD_NODE(state, {datas, parentKeysValues}) {
            state.datas.add({datas, parentKeysValues});
        },
        REMOVE_NODE(state, {type, name}) {
            state.datas.remove({type, name});
        },
    },
    actions: {
        addNode({ commit, state }, {datas, parentKeysValues, idKeysValues}) {

            const mutationName = state.datas === null ? "CREATE_TREE" : "ADD_NODE";
            commit(mutationName, {datas, parentKeysValues, idKeysValues});

        },
        remove({ commit }, {type, name}) {
            commit("REMOVE_NODE", {type, name});
        }
    },
    getters: {
        find: (state) => ({keysValues}) => {
            return state.datas.find({keysValues});
        }
    }
}