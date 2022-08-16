export default class ObjectCustomMethods {
    static setPath({object = {}, path}) {

        if (Array.isArray(path) === false) {
            console.error("The setPath function path argument must an array containing properties in access order");
            return;
        }

        let currPath = object;

        path.forEach(currProp => currPath = currPath[currProp]);

        return currPath;

    }
    static zeroValueHandler({object, propNames, defaultValue = null}) {

        let path = propNames.find(prop => {

            if (object[prop] !== undefined) {
                return prop;
            }
        
        });
        
        return path === undefined ? defaultValue : path;

    }
}