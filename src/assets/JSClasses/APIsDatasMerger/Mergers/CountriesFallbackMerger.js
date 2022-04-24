export default class CountriesFallbackMerger {
    static merge({franceLive, franceInfos}) {

        return this.mergeFranceInfos({franceLive, franceInfos});

    }
    static mergeFranceInfos({franceLive, franceInfos}) {

        franceLive = franceLive[0];
        franceInfos = franceInfos[0];

        return {...franceLive, franceInfos};


    }
}