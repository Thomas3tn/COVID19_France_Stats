import store from "../../store/index.js";
import LocalStorageManager from "../../assets/JSClasses/LocalStorage/Save.js";

export default (router) => {

    router.beforeEach(to => {
    
        if (typeof to.name === "undefined") {

            localStorage.setItem("newTest", "Gooood!");
            LocalStorageManager.save({store});

        }
    
    });

}

