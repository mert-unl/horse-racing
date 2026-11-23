export interface Horse {
    id: number
    name: string
    color: string
    condition: number
}

export interface Round {
    id: number
    distance: number
    horseIds: number[]
}

export interface RoundResult {
    roundId: number
    distance: number
    ranking: number[]
}

export interface RaceState {
    positions: Record<number, number>
    finishOrder: number[]
}

export type RaceStatus = 'idle' | 'scheduled' | 'running' | 'paused' | 'finished'