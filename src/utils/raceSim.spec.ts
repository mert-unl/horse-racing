import { describe, expect, it } from 'vitest'
import type { Horse, Round } from '@/types/race'
import { createRng } from './random'
import { generateHorses } from './horseGenerator'
import { generateSchedule } from './scheduleGenerator'
import {
    advanceRace,
    computeSpeed,
    createRaceState,
    isRaceFinished,
} from './raceSim'

const makeHorse = (id: number, condition: number): Horse => ({
    id,
    name: `Horse ${id}`,
    color: '#000000',
    condition,
})

describe('raceSimulator', () => {
    describe('createRaceState', () => {
        it('tüm atları 0 metrede başlatır, bitiş sırası boştur', () => {
            const round: Round = { id: 1, distance: 1200, horseIds: [1, 2, 3] }
            const state = createRaceState(round)

            expect(state.positions).toEqual({ 1: 0, 2: 0, 3: 0 })
            expect(state.finishOrder).toEqual([])
        })
    })

    describe('computeSpeed', () => {
        it('yüksek condition daha hızlıdır (rastgelelik sabitken)', () => {
            const fixedRng = () => 0.5
            expect(computeSpeed(100, fixedRng)).toBeGreaterThan(computeSpeed(1, fixedRng))
        })

        it('rastgelelik ±%10 aralığındadır', () => {
            const base = computeSpeed(50, () => 0.5)
            expect(computeSpeed(50, () => 0)).toBeCloseTo(base * 0.9)
            expect(computeSpeed(50, () => 1)).toBeCloseTo(base * 1.1)
        })
    })

    describe('advanceRace', () => {
        it('atları ileri taşır ve mesafeyi aşan pozisyon üretmez', () => {
            const horses = [makeHorse(1, 100), makeHorse(2, 1)]
            const horsesById = Object.fromEntries(horses.map((h) => [h.id, h]))
            const round: Round = { id: 1, distance: 1200, horseIds: [1, 2] }
            const rng = createRng(3)

            let state = createRaceState(round)
            state = advanceRace(state, round, horsesById, 0.1, rng)
            expect(state.positions[1]).toBeGreaterThan(0)

            for (let i = 0; i < 5000; i++) {
                state = advanceRace(state, round, horsesById, 0.1, rng)
            }
            Object.values(state.positions).forEach((p) => expect(p).toBeLessThanOrEqual(1200))
        })

        it('aynı karede bitirenlerde çizgiyi daha çok geçen önce gelir', () => {
            const horsesById = { 1: makeHorse(1, 1), 2: makeHorse(2, 100) }
            const round: Round = { id: 1, distance: 1200, horseIds: [1, 2] }
            const state = {
                positions: { 1: 1199, 2: 1199 },
                finishOrder: [],
            }

            const next = advanceRace(state, round, horsesById, 1, () => 0.5)
            expect(next.finishOrder).toEqual([2, 1])
        })

        it('biten at bir daha sıraya eklenmez', () => {
            const horsesById = { 1: makeHorse(1, 50) }
            const round: Round = { id: 1, distance: 100, horseIds: [1] }
            let state = createRaceState(round)

            for (let i = 0; i < 50; i++) {
                state = advanceRace(state, round, horsesById, 1, () => 0.5)
            }
            expect(state.finishOrder).toEqual([1])
        })

        it('10 atlık gerçek bir tur sonunda 10 benzersiz sıralama çıkar', () => {
            const rng = createRng(42)
            const horses = generateHorses(rng)
            const horsesById = Object.fromEntries(horses.map((h) => [h.id, h]))
            const round = generateSchedule(horses, rng)[0]
            if (!round) throw new Error('schedule boş')

            let state = createRaceState(round)
            let guard = 0
            while (!isRaceFinished(state, round) && guard++ < 10_000) {
                state = advanceRace(state, round, horsesById, 0.016, rng)
            }

            expect(isRaceFinished(state, round)).toBe(true)
            expect(state.finishOrder).toHaveLength(10)
            expect(new Set(state.finishOrder).size).toBe(10)
        })
    })

    describe('isRaceFinished', () => {
        it('tüm atlar bitirmeden false döner', () => {
            const round: Round = { id: 1, distance: 1200, horseIds: [1, 2] }
            expect(isRaceFinished({ positions: {}, finishOrder: [1] }, round)).toBe(false)
            expect(isRaceFinished({ positions: {}, finishOrder: [1, 2] }, round)).toBe(true)
        })
    })
})