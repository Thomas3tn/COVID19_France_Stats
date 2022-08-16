import API from "../API.js";

export default class CountriesHistoricalAPI extends API {
    static STATUS = ["confirmed", "deaths", "recovered"]
    static requests = [
        new CountriesHistoricalAPI.APIRequest({
            infos: {type: "historical", status: null, location: CountriesHistoricalAPI.COUNTRY_TYPE}, 
            parentKeysValues: [{key: "type", value: "live"}, {key: "location", value: CountriesHistoricalAPI.COUNTRY_TYPE}],
            idKeysValues: [{key: "type", value: "historical"}, {key: "location", value: CountriesHistoricalAPI.COUNTRY_TYPE}]
        })
    ];
    constructor() {

        super();

        this.BASE_URL = "https://covid-api.mmediagroup.fr/v1/history?";
        this.STATUS_PARAMS = [...CountriesHistoricalAPI.STATUS];

    }
    async get({name = false, status = this.STATUS_PARAMS}) {

        const apisDatas = new this.APIsDatas({requests: CountriesHistoricalAPI.requests});

        let requestParameters = this.setRequestParameters({name, status});

        let {datas, failedRequests} = await this.launchRequests({requestParameters});
        apisDatas.datas = this.sortByStatus({datas, statusList: requestParameters.status});

        apisDatas.addRequests(this.addStatusRequests({datas: apisDatas.datas}));
        this.updateRootRequests({apisDatas, hasOneReqSucceeded: requestParameters.totalReqs !== failedRequests});

        return apisDatas;

    }
    setRequestParameters({name, status}) {

        let requestParameters = {
            location: "",
            status: [],
            totalReqs: 0
        };

        requestParameters.location = name === false ? "" : "country=" + encodeURIComponent(name);

        status = Array.from(status);
        status.forEach(currStatus => {

            if (this.STATUS_PARAMS.includes(currStatus)) {
                requestParameters.status.push(`status=${encodeURIComponent(currStatus)}`);
            }

        });
        requestParameters.totalReqs = requestParameters.status.length;

        return requestParameters;

    }
    async launchRequests({requestParameters}) {

        let failedRequests = 0;

        let datas = await Promise.all(requestParameters.status.map(
            async currStatus => {
                
                return await fetch(`${this.BASE_URL}${currStatus}&${requestParameters.location}`)
                .catch(error => {
                    this.failedRequestHandler({error, status: currStatus.split("=")[1]})
                    failedRequests++;
                });

            }
        ));

        const newDatas = await Promise.all(datas.map(data => data.json()));

        return {
            datas: newDatas,
            failedRequests
        };

    }
    failedRequestHandler({error, status}) {

        console.warn(`Unable to retrieve ${status} historical status datas. ${error}`);
        return false;

    }
    sortByStatus({datas, statusList}) {

        const sortedDatas = {};
        datas.forEach((data, index) => {

            const currentStatus = statusList[index].split("=")[1];
            sortedDatas[currentStatus] = data;

        });
        return sortedDatas;

    }
    addStatusRequests({datas}) {

        const statusRequests = [];

        Object.entries(datas).forEach(([status, data]) => {

            statusRequests.push(new CountriesHistoricalAPI.APIRequest({
                infos: {
                    type: status, 
                    status: Object.entries(data).length === 0 ? false : true,
                    location: CountriesHistoricalAPI.COUNTRY_TYPE
                },
                idKeysValues: [{key: "type", value: status}, {key: "location", value: CountriesHistoricalAPI.COUNTRY_TYPE}],
                parentKeysValues: [{key: "type", value: "historical"}, {key: "location", value: CountriesHistoricalAPI.COUNTRY_TYPE}]
            }));

        });

        return statusRequests;

    }
    updateRootRequests({apisDatas, hasOneReqSucceeded}) {

        apisDatas.forEachRequest(request => {

            if (request.infos.type === CountriesHistoricalAPI.requests[0].infos.type) {
                request.infos.status = hasOneReqSucceeded;
            }

        });

    }
}