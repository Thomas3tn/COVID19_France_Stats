export default class FurtherRequests {
    constructor() {

        this.FURTHER_REQUESTS_URLS = {
            ADD_VACCINATION_DATAS: "https://covid-api.mmediagroup.fr/v1/vaccines",
            ADD_FRANCE_LIVE_DATAS: "https://coronavirusapifr.herokuapp.com/data/live/france",
            ADD_COUNTRIES_INFOS: "https://restcountries.com/v3.1/all"
        }

    }
    async triggerFurtherRequests() {

        const datas = await this.get();
        const APIsRequestsStatus = this.setApisRequestsStatus({datas});

        return {
            datas : {
                vaccination: datas[0],
                franceLive: datas[1],
                countriesInfos: datas[2]
            }, 
            APIsRequestsStatus
        };

    }
    async get() {

        let datas = await Promise.all(
            Object.entries(this.FURTHER_REQUESTS_URLS).map(REQUEST => fetch(REQUEST[1]).catch(() => {return null}))
        );
        return await Promise.all(datas.map(data => data.json()));

    }
    setApisRequestsStatus({datas}) {

        const APIsRequestsStatus = {
            worldCovidDatas: [],
            franceCovidDatas: [],
            countriesInfosDatas: []
        }

        const SORTING_METHODS = ["setVaccinationRequestStatus", "setFranceLiveRequestStatus", "setCountriesInfosRequestStatus"];
        SORTING_METHODS.forEach((METHOD, index) => {

            const requestDatas = this[METHOD]({datas: datas[index]});
            APIsRequestsStatus[requestDatas.APIType] = requestDatas.APIsRequestsStatus;

        });

        return APIsRequestsStatus;

    }
    setVaccinationRequestStatus({datas}) {

        const APIsRequestsStatus = [
            {datas: {type: "vaccination", status: null}, idKeysValues: [{key: "type", value: "vaccination"}], parentKeysValues: [{key: "type", value: "root"}]}
        ];
        APIsRequestsStatus.forEach(request => request.datas.status = datas === null ? false : true);
        return {APIsRequestsStatus, APIType: "worldCovidDatas"};

    }
    setFranceLiveRequestStatus({datas}) {

        const APIsRequestsStatus = [
            {datas: {type: "root", status: null}, idKeysValues: [{key: "type", value: "root"}]},
            {datas: {type: "live", status: null, location: "country"}, parentKeysValues: [{key: "type", value: "root"}], idKeysValues: [{key: "type", value: "live"}, {key: "location", value: "country"}]}
        ];
        APIsRequestsStatus.forEach(request => request.datas.status = datas === null ? false : true)
        return {APIsRequestsStatus, APIType: "franceCovidDatas"};

    }
    setCountriesInfosRequestStatus({datas}) {

        const APIsRequestsStatus = [
            {datas: {type: "root", status: null}, idKeysValues: [{key: "type", value: "root"}]}
        ];
        APIsRequestsStatus.forEach(request => request.datas.status = datas === null ? false : true);
        return {APIsRequestsStatus, APIType: "countriesInfosDatas"};

    }
}