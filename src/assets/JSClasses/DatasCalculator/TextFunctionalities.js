

export default class StringCustomMethods {
    static updateClassName(className, classNameInputs) {

        let classesArray = className.split(" ");

        if (typeof classNameInputs.oldClassNames !== "undefined") {

            let oldClassNames;
            typeof classNameInputs.oldClassNames === "string" ? oldClassNames = [classNameInputs.oldClassNames] : oldClassNames = classNameInputs.oldClassNames;

            for (let i = 0; i < classesArray.length; i++) {

                if (oldClassNames.includes(classesArray[i])) {
                    classesArray.splice(i, 1);
                    i -= 1;
                }

            }

        }

        if (typeof classNameInputs.newClassNames !== "undefined") {

            let newClassNames;
            typeof classNameInputs.newClassNames === "string" ? newClassNames = [classNameInputs.newClassNames] : newClassNames = classNameInputs.newClassNames;
            classesArray = classesArray.concat(newClassNames);

        }

        return classesArray.join(" ");

    }
    static removeSpecialCharacters(countryName) {

        return countryName.match(/[a-zâäàéèùêëîïôöçñ\s,'()-]{1,}/i)[0];

    }
    static formatStatusLogosPropName(propName) {

        propName = propName.replace(/²/g, "2");
        propName = propName.replace(/'/g, "_");
        propName = propName.replace(/\//g, "_");
        propName = propName.replace(/[âäà]/g, "a");
        propName = propName.replace(/[éèêë]/g, "e");
        propName = propName.replace(/ù/g, "u");
        propName = propName.replace(/[îï]/g, "i");
        propName = propName.replace(/[ôö]/g, "o");
        propName = propName.replace(/[ñ]/g, "n");
        propName = propName.replace(/[ç]/g, "c");
        propName = propName.replace(/\s/g, "_");
        propName = propName.toLowerCase();
        
        return propName;
    
    }
}