import World from "../../../staticDatas/World.js";
import _ from "lodash";

export default class WorldMerger {
    static merge({countries}) {

        const world = _.cloneDeep(countries["Global"]);
        delete countries["Global"];

        Object.entries(World).forEach(([status, value]) => world.All[status] = value);

        return {Global: world};

    }
}