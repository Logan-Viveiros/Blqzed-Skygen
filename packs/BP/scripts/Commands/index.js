import { system } from "@minecraft/server";
import hub from "./hub";
import plot from "./plot";
system.beforeEvents.startup.subscribe(data => {
    data.customCommandRegistry.registerCommand(hub.command, hub.callback);
    data.customCommandRegistry.registerCommand(plot.command, plot.callback);
});
