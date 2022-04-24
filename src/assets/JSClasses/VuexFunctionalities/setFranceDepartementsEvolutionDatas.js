export default class DepartementHistoricalDatasAPI {
    constructor() {
        
        this.baseURL = "https://coronavirusapifr.herokuapp.com/data/departement/";

    }
    getDatas(departement) {

        fetch(this.setURL(`${this.baseURL}${departement}`))
        .then(response => response.json())
        .then(response => {

            resolve(response);

        })
        .catch(error => {
            console.error(error);
            reject(false);
        })

    }
}