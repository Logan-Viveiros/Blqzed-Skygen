import { CommandPermissionLevel, CustomCommandStatus, system } from "@minecraft/server";
import { teleportManager } from "Systems/teleports";
export default {
    command: {
        name: "blqzed:plot",
        description: "Teleports you to your plot",
        permissionLevel: CommandPermissionLevel.Any
    },
    callback(origin, args) {
        if (!origin.sourceEntity || origin.sourceEntity.typeId !== "minecraft:player")
            return {
                status: CustomCommandStatus.Failure,
                message: "This command can only be executed by players!"
            };
        const player = origin.sourceEntity;
        system.run(() => teleportManager.teleportToPlot(player));
        return {
            status: CustomCommandStatus.Success,
            message: "Teleported to your plot."
        };
    }
};
