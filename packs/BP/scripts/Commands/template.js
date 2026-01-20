import { CommandPermissionLevel } from "@minecraft/server";
export default {
    command: {
        name: "blqzed:command",
        description: "command description",
        permissionLevel: CommandPermissionLevel.Any
    },
    callback(origin, args) {
        return undefined;
    }
};
