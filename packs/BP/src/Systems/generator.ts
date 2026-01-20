import { Block, BlockComponentPlayerInteractEvent, BlockComponentPlayerPlaceBeforeEvent, world } from "@minecraft/server";

class Generator {
    constructor(block: Block) {

    }
}

export const generatorManager = new (class GeneratorManager {
    generatorPlace(data: BlockComponentPlayerPlaceBeforeEvent) {

    }
    playerInteract(data: BlockComponentPlayerInteractEvent) {
        if (!data.player) return
        const generator = data.block
        //@ts-ignore
        const generatorType = generator.permutation.getState("blqzed:generator_type") as string

    }
})