import { system } from "@minecraft/server";
import { generatorManager } from "Systems/generator";
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent("blqzed:generator", {
        onPlace: generatorManager.onGeneratorPlace,
    });
});
