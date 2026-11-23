import type { Horse, RaceState, Round } from '@/types/race'
import {
    BASE_SPEED, SPEED_NOISE, SPEED_PER_CONDITION, TIME_SCALE,
} from '@/constants/race'
import type { Rng } from './random'

export function createRaceState(round: Round): RaceState {
    return {
        positions: Object.fromEntries(round.horseIds.map((id) => [id, 0])),
        finishOrder: [],
    }
}

export function computeSpeed(condition: number, rng: Rng): number {
    const base = BASE_SPEED + condition * SPEED_PER_CONDITION
    const noise = 1 + (rng() * 2 - 1) * SPEED_NOISE
    return base * noise
}

export function advanceRace(
    state: RaceState,
    round: Round,
    horsesById: Record<number, Horse>,
    deltaSec: number,
    rng: Rng,
): RaceState {
    const positions = { ...state.positions }
    const crossed: { id: number; overshoot: number }[] = []

    for (const id of round.horseIds) {
        if (state.finishOrder.includes(id)) continue
        const horse = horsesById[id]
        if (!horse) continue
        const current = positions[id] ?? 0
        const speed = computeSpeed(horse.condition, rng)
        const next = current + speed * deltaSec * TIME_SCALE
        positions[id] = Math.min(next, round.distance)
        if (next >= round.distance) {
            crossed.push({ id, overshoot: next - round.distance })
        }
    }

    // Aynı karede bitirenlerde çizgiyi daha fazla geçen önce gelir
    crossed.sort((a, b) => b.overshoot - a.overshoot)

    return {
        positions,
        finishOrder: [...state.finishOrder, ...crossed.map((c) => c.id)],
    }
}

export const isRaceFinished = (state: RaceState, round: Round): boolean =>
    state.finishOrder.length === round.horseIds.length