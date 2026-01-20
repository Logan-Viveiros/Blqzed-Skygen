import { BlockVolume, system, world } from "@minecraft/server";
import { loadVolume } from "utilities";
/**
 * How plots work:
 * Each player gets a plot when they join, starting at 8x8 and can be upgraded to 16x16, 24x24, 32x32
 * Each plot has an id of 1-10 when the player joins, determining the position of the plot
 * The southwestern most point of each plot is (1000*id - size*4, 1000*id - size*4)
 * The player's plot data is saved as the dynamic property plotData
 * The player's plot structure is saved under the structure blqzed:${player.id}-plot
 */
class Plot {
    constructor(player, id) {
        this.player = player;
        this.id = id;
        this.data = JSON.parse(player.getDynamicProperty(`plotData`) ?? "{}");
    }
}
export const plotManager = new (class PlotManager {
    constructor() {
        this.plots = {};
        this.ids = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }
    getPlot(player) {
        if (!this.hasCreatedPlot(player))
            this.createPlot(player);
        else
            return this.plots[player.id];
    }
    hasCreatedPlot(player) {
        return (player.id in this.plots);
    }
    unloadPlot(player) {
        if (!this.hasCreatedPlot(player))
            return -1;
        const plot = this.getPlot(player);
        const plotVolume = getPlotVolume(plot.id, plot.data.size);
        const playerId = player.id;
        system.run(() => {
            loadVolume(plotVolume).then(() => {
                world.structureManager.createFromWorld(`blqzed:${playerId}-plot`, world.getDimension("overworld"), plotVolume.from, plotVolume.to);
                world.getDimension("overworld").fillBlocks(plotVolume, "air");
            });
        });
        return 0;
    }
    async createPlot(player) {
        console.warn(this.ids.values().next().value);
        const id = this.ids.values().next().value;
        this.ids.delete(id);
        const plot = new Plot(player, id);
        this.plots[player.id] = plot;
        const plotStructure = world.structureManager.get(`blqzed:${player.id}-plot`);
        if (plotStructure) {
            const plotData = JSON.parse(player.getDynamicProperty("plotData") ?? "{}");
            loadVolume(getPlotVolume(id, plotData.size)).then(() => {
                world.structureManager.place(plotStructure, world.getDimension("overworld"), {
                    x: (1000 * id) - (plotData.size * 4),
                    y: -64,
                    z: (1000 * id) - (plotData.size * 4)
                });
            });
        }
        else {
            const plotData = {
                size: 1
            };
            player.setDynamicProperty(`plotData`, JSON.stringify(plotData));
            loadVolume(getPlotVolume(id, plotData.size)).then(() => {
                world.getDimension("overworld").fillBlocks(new BlockVolume({
                    x: (1000 * id) - (plotData.size * 4),
                    y: -1,
                    z: (1000 * id) - (plotData.size * 4)
                }, {
                    x: (1000 * id) + (plotData.size * 4) - 1,
                    y: -1,
                    z: (1000 * id) + (plotData.size * 4) - 1
                }), "minecraft:grass_block");
            });
        }
        return plot;
    }
});
function getPlotVolume(plotId, size) {
    return new BlockVolume({
        x: (1000 * plotId) - (size * 4),
        y: -64,
        z: (1000 * plotId) - (size * 4)
    }, {
        x: (1000 * plotId) + (size * 4) - 1,
        y: 256,
        z: (1000 * plotId) + (size * 4) - 1
    });
}
