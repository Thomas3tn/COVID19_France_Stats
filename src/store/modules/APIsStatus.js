import Tree from "../../assets/JSClasses/DatasStructures/Tree/Tree.js";

export default {
    namespaced: true,
    state: () => ({
        datas: new Tree({
            type: "root",
            status: true,
        })
    }),
    mutations: {
        CREATE_TREE(state, {datas}) {
            state = new Tree(datas);
        },
        COPY_LOCAL_STORAGE_DATAS(state, {requestsStatus}) {
            state = requestsStatus;
        },
        ADD_NODE(state, {infos, parentKeysValues, idKeysValues}) {
            state.datas.add({datas: infos, parentKeysValues, idKeysValues});
        },
        REMOVE_NODE(state, {type, name}) {
            state.remove({type, name});
        },
        SHOW_TREE(state) {
            console.log(state.datas);
        }
    },
    actions: {
        copyLocalStorageDatas({ commit }, datas) {

            Object.values(datas).forEach(APIRequest => commit("COPY_LOCAL_STORAGE_DATAS", {requestsStatus: APIRequest}))

        },
        addNode({ commit }, {infos, parentKeysValues, idKeysValues}) {

            commit("ADD_NODE", {infos, parentKeysValues, idKeysValues});

        },
        remove({ commit }, {type, name}) {
            commit("REMOVE_NODE", {type, name});
        }
    },
    getters: {
        find: (state) => ({keysValues}) => {
            return state.datas.find({keysValues});
        },
        getTree: (state) => () => {
            return state.datas;
        },
        forEachBreadthFirst: (state) => (callback) => {
            state.datas.forEachBreadthFirst(callback);
        },
    }
}