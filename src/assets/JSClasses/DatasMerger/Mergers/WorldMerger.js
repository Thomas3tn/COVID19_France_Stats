import World from "../../../staticDatas/World.js";
import _ from "lodash";
import Merger from "../Merger.js";

export default class WorldMerger extends Merger {
    static merge({countries}) {

        const world = WorldMerger.mergingErrorHandler((() => {

            const world = _.cloneDeep(countries["Global"]);
            delete countries["Global"];

            Object.entries(World).forEach(([status, value]) => world.All[status] = value);
            console.log(_.cloneDeep(world));
            return world;

        })());

        console.log(world)

        return {Global: world};

    }
}