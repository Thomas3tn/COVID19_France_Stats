import Node from "./Node.js";
//import _ from "lodash";

export default class Tree {
    constructor(data) {
        this._root = new Node(data);
    }
    find({keysValues, node = this._root}) {

        const isRequestedNode = keysValues.every(req => node.data[req.key] === req.value);

        if (isRequestedNode) {

            /*if (keysValues[keysValues.length - 1].value === "France") {
                console.log(keysValues, node);
            }*/

            return node;
        }

        for (let child of node.children) {

            if (this.find({keysValues, node: child})) {
                return child;
            }

        }

        return null;

    }
    add({datas, parentKeysValues, idKeysValues = false}) {

        if (idKeysValues) {

            const doesNodeAlreadyExists = this.find({keysValues: idKeysValues});

            if (doesNodeAlreadyExists) {
                return this.update({datas, keysValues: idKeysValues});
            }

        }

        const node = new Node(datas);
        let parent = this.find({keysValues: parentKeysValues});

        /*if (parentKeysValues[parentKeysValues.length - 1].value === "France") {
            console.log(parent);
        }*/

        if (parent) {

            parent.children.push(node);
            node.parent = parent;

            return node;

        } else {

            let keysValuesStr = "";
            parentKeysValues.forEach(keyValue => keysValuesStr += `${keyValue.key}: ${keyValue.value} |`)
            throw new Error(`Unable to add node with the corresponding parent: ${keysValuesStr}`);

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