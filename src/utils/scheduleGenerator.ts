import type { Horse, Round } from '@/types/race'
import { HORSES_PER_ROUND, ROUND_DISTANCES } from '@/constants/race'
import { shuffle, type Rng } from './random'

export function generateSchedule(horses: Horse[], rng: Rng): Round[] {
    return ROUND_DISTANCES.map((distance, index) => ({
        id: index + 1,
        distance,
        horseIds: shuffle(horses, rng)
            .slice(0, HORSES_PER_ROUND)
            .map((horse) => horse.id),
    }))
}