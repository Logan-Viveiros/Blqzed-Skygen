import { world } from "@minecraft/server";
import { plotManager } from "Systems/plot";
import { teleportManager } from "Systems/teleports";
world.afterEvents.playerSpawn.subscribe((data) => {
    if (!data.initialSpawn)
        return;
    teleportManager.teleportToHub(data.player);
    plotManager.getPlot(data.player); //makes sure plot is created
});
