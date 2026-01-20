import { GameMode } from "@minecraft/server";
import { plotManager } from "./plot";
import { messageManager } from "./messages";
export const teleportManager = new (class TeleportManager {
    constructor() {
        this.playerLocations = {};
    }
    teleportToPlot(player) {
        this.playerLocations[player.id] = "plot";
        const plot = plotManager.getPlot(player);
        if (!plot)
            return messageManager.sendUnsuccessfulMessage(player, `Your plot isn't loaded in yet!`);
        player.teleport({
            x: 1000 * plot.id,
            y: 0,
            z: 1000 * plot.id
        });
        if (player.getGameMode() !== GameMode.Creative)
            player.setGameMode(GameMode.Survival);
    }
    teleportToHub(player) {
        this.playerLocations[player.id] = "hub";
        player.teleport({
            x: 0.5,
            y: 1,
            z: 0.5
        });
        if (player.getGameMode() !== GameMode.Creative)
            player.setGameMode(GameMode.Adventure);
    }
    getPlayerLocation(player) {
        return this.playerLocations[player.id] ?? "hub";
    }
});
