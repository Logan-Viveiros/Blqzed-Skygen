import { CommandPermissionLevel, CustomCommand, CustomCommandOrigin, CustomCommandResult, CustomCommandStatus, Player, system } from "@minecraft/server";
import { teleportManager } from "Systems/teleports";

export default {
    command: {
        name: "blqzed:hub",
        description: "Teleports you to the hub",
        permissionLevel: CommandPermissionLevel.Any
    },
    callback(origin, args) {
        if (!origin.sourceEntity || origin.sourceEntity.typeId !== "minecraft:player") return {
            status: CustomCommandStatus.Failure,
            message: "This command can only be executed by players!"
        }
        const player = origin.sourceEntity as Player
        system.run(() => teleportManager.teleportToHub(player))
        return {
            status: CustomCommandStatus.Success,
            message: "Teleported to the hub."
        }
    }
} as { command: CustomCommand, callback: (origin: CustomCommandOrigin, ...args: any[]) => CustomCommandResult | undefined }