import Tree from "../../assets/JSClasses/DatasStructures/Tree.js";

export default {
    namespaced: true,
    state: () => ({
        worldCovidDatas: null,
        franceCovidDatas: null,
        countriesInfosDatas: null
    }),
    mutations: {
        CREATE_TREE(state, {APIType, datas}) {
            state[APIType] = new Tree(datas);
        },
        COPY_LOCAL_STORAGE_DATAS(state, {APIType, requestsStatus}) {
            state[APIType] = requestsStatus;
        },
        ADD_NODE(state, {APIType, datas, parentKeysValues, idKeysValues}) {
            state[APIType].add({datas, parentKeysValues, idKeysValues});
        },
        REMOVE_NODE(state, {APIType, type, name}) {
            state[APIType].remove({type, name});
        },
    },
    actions: {
        copyLocalStorageDatas({ commit }, datas) {

            Object.entries(datas).forEach(([key, value]) => commit("COPY_LOCAL_STORAGE_DATAS", {APIType: key, requestsStatus: value}))

        },
        addNode({ commit, state }, {APIType, datas, parentKeysValues, idKeysValues}) {

            const mutationName = state[APIType] === null ? "CREATE_TREE" : "ADD_NODE";
            commit(mutationName, {APIType, datas, parentKeysValues, idKeysValues});

        },
        remove({ commit }, {type, name}) {
            commit("REMOVE_NODE", {type, name});
        }
    },
    getters: {
        find: (state) => ({APIType, keysValues}) => {
            return state[APIType].find({keysValues});
        }
    }
}