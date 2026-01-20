const fs = require("fs")

const generator = JSON.parse(fs.readFileSync(`BP/blocks/generator.json`).toString())

const generatorTypes = ["dirt", "sand"]
const terrainTextures = JSON.parse(fs.readFileSync(`RP/textures/terrain_texture.json`).toString())

for (const type of generatorTypes) {
    generator["minecraft:block"].description.states["blqzed:generator_type"].push(type)
    generator["minecraft:block"].permutations.push({
        condition: `q.block_state('blqzed:generator_type') == '${type}'`,
        components: {
            "minecraft:material_instances": {
                "up": {
                    "texture": "blqzed:generator_top"
                },
                "sides": {
                    "texture": "blqzed:generator_" + type
                },
                "north": "sides",
                "south": "sides",
                "east": "sides",
                "west": "sides",
                "down": {
                    "texture": "blqzed:generator_bottom"
                }
            }
        }
    })
    terrainTextures["texture_data"][`blqzed:generator_${type}`] = { textures: `textures/blocks/generator_${type}` }
}

fs.writeFileSync(`RP/textures/terrain_texture.json`, JSON.stringify(terrainTextures))
fs.writeFileSync(`BP/blocks/generator.json`, JSON.stringify(generator))