import { CommandPermissionLevel, CustomCommand, CustomCommandOrigin, CustomCommandResult, CustomCommandStatus, Player } from "@minecraft/server";

export default {
    command: {
        name: "blqzed:command",
        description: "command description",
        permissionLevel: CommandPermissionLevel.Any
    },
    callback(origin, args) {
        return undefined
    }
} as { command: CustomCommand, callback: (origin: CustomCommandOrigin, ...args: any[]) => CustomCommandResult | undefined }