import type { Horse } from '@/types/race'
import {
    HORSE_COLORS, HORSE_COUNT, HORSE_NAMES, MAX_CONDITION, MIN_CONDITION,
} from '@/constants/race'
import { randomInt, type Rng } from './random'

export function generateHorses(rng: Rng): Horse[] {
    return Array.from({ length: HORSE_COUNT }, (_, i) => ({
        id: i + 1,
        name: HORSE_NAMES[i] ?? `Horse ${i + 1}`,
        color: HORSE_COLORS[i] ?? '#000000',
        condition: randomInt(rng, MIN_CONDITION, MAX_CONDITION),
    }))
}