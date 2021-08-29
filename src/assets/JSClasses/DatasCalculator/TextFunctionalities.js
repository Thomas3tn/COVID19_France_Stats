

export default {
    textFunctionalities: {
        updateClassName(className, classNameInputs) {

            let classesArray = className.split(" ");

            if (classNameInputs.oldClassNames !== "undefined") {

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

                for (let i = 0; i < newClassNames.length; i++) {
                    classesArray.push(newClassNames[i]);
                }

            }

            return classesArray.join(" ");

        }
    }
}