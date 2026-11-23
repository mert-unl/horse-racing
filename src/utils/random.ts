export type Rng = () => number

// mulberry32
export function createRng(seed: number): Rng {
    let a = seed >>> 0
    return () => {
        a = (a + 0x6d2b79f5) >>> 0
        let t = a
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

export const randomInt = (rng: Rng, min: number, max: number): number =>
    Math.floor(rng() * (max - min + 1)) + min

export function shuffle<T>(items: readonly T[], rng: Rng): T[] {
    const copy = [...items]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = randomInt(rng, 0, i)
        const temp = copy[i] as T
        copy[i] = copy[j] as T
        copy[j] = temp
    }
    return copy
}

let gameRng: Rng | null = null

export function getGameRng(): Rng {
    if (!gameRng) {
        const seed = Number(new URLSearchParams(window.location.search).get('seed'))
        gameRng = createRng(Number.isFinite(seed) && seed > 0 ? seed : Date.now())
    }
    return gameRng
}