import { BlockVolume, system, Vector3, world } from "@minecraft/server";

export function loadVolume(volume: { to: Vector3, from: Vector3 }, dimension = world.getDimension("overworld")): Promise<void> {
    const id = randomId()
    dimension.runCommand(`tickingarea add ${volume.from.x} ${volume.from.y} ${volume.from.z} ${volume.to.x} ${volume.to.y} ${volume.to.z} ${id}`)
    return new Promise((resolve) => {
        const intervalId = system.runInterval(() => {
            if (!dimension.isChunkLoaded(volume.from)) return
            dimension.runCommand(`tickingarea remove ${id}`)
            system.clearRun(intervalId)
            resolve()
        }, 1)
    })
}

export function randomId(length: number = 8) {
    const characters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
    let id = ""
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        id += characters[randomIndex]
    }
    return id
}