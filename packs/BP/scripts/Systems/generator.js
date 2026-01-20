import { world } from "@minecraft/server";
export const generatorManager = new (class GeneratorManager {
    onGeneratorPlace(data) {
        const generatorEntity = data.dimension.spawnEntity("blqzed:generator", data.block.bottomCenter(), {
            initialPersistence: true
        });
        generatorEntity.nameTag = "Generator";
    }
});
world.afterEvents.playerInteractWithEntity.subscribe(data => {
    if (data.target.typeId === "blqzed:generator")
        data.player.sendMessage("something doing something idk type shit");
});
