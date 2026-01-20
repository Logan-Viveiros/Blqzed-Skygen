import { world } from "@minecraft/server";
import { plotManager } from "Systems/plot";
world.beforeEvents.playerLeave.subscribe(data => {
    const player = data.player;
    plotManager.unloadPlot(player);
});
