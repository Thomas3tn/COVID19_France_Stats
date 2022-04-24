import Node from "./Node.js";
//import _ from "lodash";

export default class Tree {
    constructor(data) {
        this._root = new Node(data);
    }
    find({keysValues, node = this._root}) {

        //[{key: "name", value: "France"}];

        let validProperties = 0;
        keysValues.forEach(property => {

            if (node.data[property.key] === property.value) {
                validProperties++;
            }

        });

        if (keysValues.length === validProperties) {

            if (keysValues.length === 1 && keysValues[0].key === "type") { 
                return node.parent === null ? node : node.parent.children;
            } else {
                return node;
            }

        }

        for (let child of node.children) {

            if (this.find({keysValues, node: child})) {
                return child;
            }

        }

        return null;

    }
    add({datas, parentKeysValues, idKeysValues = false}) {

        /*console.log("Currently adding node:", datas);
        console.log("From these keysValues:", parentKeysValues);*/

        if (idKeysValues) {

            const doesNodeAlreadyExists = this.find({keysValues: idKeysValues});

            if (doesNodeAlreadyExists) {
                return this.update({datas, keysValues: idKeysValues});
            }

        }

        const node = new Node(datas);
        let parent = this.find({keysValues: parentKeysValues});
        //console.log("Parent node found:", parent);

        if (parent) {

            parent.children.push(node);
            node.parent = parent;

            return node;

        } else {

            let keysValuesStr = "";
            parentKeysValues.forEach(keyValue => keysValuesStr += `${keyValue.key}: ${keyValue.value} |`)
            throw new Error(`Cannot add node: parent with data ${keysValuesStr} not found.`)

        }

    }
    update({datas, keysValues}) {

        let node = this.find({keysValues});

        //Bug Quick fix
        //Find method might return the parent node from the desired node
        if (datas.type !== node.data.type) {
            node = node.children[0]
        }

        if (node) {

            Object.entries(datas).forEach(([key, value]) => {
                node.data[key] = value;
            });

        }

        return node;

    }
    remove({type, name}) {

        let node = this.find({type, name});

        if (node) {

            let parent = node.parent;
            let nodeIndex = parent.children.indexOf(node);
            parent.children.splice(nodeIndex, 1);

        } else {

            throw new Error(`Cannot remove node: node with name ${name} not found.`)

        }

    }
    forEach(callback, node = this._root) {

        for (let child of node.children) {
            this.forEach(callback, child);
        }

        callback(node);

    }
    forEachBreadthFirst(callback) {

        let queue = [];
        queue.push(this._root);

        while (queue.length > 0) {
            
            let node = queue.shift();

            callback(node);

            for (let child of node.children) {
                queue.push(child);
            }

        }

    }
}