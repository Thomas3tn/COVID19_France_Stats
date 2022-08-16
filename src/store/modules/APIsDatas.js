import Tree from "../../assets/JSClasses/DatasStructures/Tree/Tree.js";

//Add function that get datas into treeLevelsDatas (LS)

export default {
    namespaced: true,
    state: () => ({
        datas: null
    }),
    mutations: {
        CREATE_TREE(state, {datas}) {
            state.datas = new Tree(datas);
        },
        ADD_TREE(state, {datas}) {
            state.datas = datas;
        },
        ADD_NODE(state, {datas, parentKeysValues}) {
            state.datas.add({datas, parentKeysValues});
        },
        REMOVE_NODE(state, {type, name}) {
            state.datas.remove({type, name});
        },
        SHOW_TREE(state) {
            console.log(state.datas);
        }
    },
    actions: {
        addNode({ commit, state }, {datas, parentKeysValues, idKeysValues}) {

            try {

                const mutationName = state.datas === null ? "CREATE_TREE" : "ADD_NODE";
                commit(mutationName, {datas, parentKeysValues, idKeysValues});

            } catch (error) {
                console.warn(error);
            }

        },
        remove({ commit }, {type, name}) {
            commit("REMOVE_NODE", {type, name});
        }
    },
    getters: {
        find: (state) => ({keysValues}) => {
            return state.datas.find({keysValues});
        },
        forEachBreadthFirst: (state) => (callback) => {
            state.datas.forEachBreadthFirst(callback);
        },
        getTree: (state) => () => {
            return state.datas;
        }
    }
}