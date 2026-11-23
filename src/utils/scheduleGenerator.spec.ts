import { describe, expect, it } from 'vitest'
import { createRng } from './random'
import { generateHorses } from './horseGenerator'
import { generateSchedule } from './scheduleGenerator'

describe('scheduleGenerator', () => {
    const rng = createRng(1)
    const horses = generateHorses(rng)
    const schedule = generateSchedule(horses, rng)
    const horseIds = new Set(horses.map((h) => h.id))

    it('6 tur üretir', () => {
        expect(schedule).toHaveLength(6)
    })

    it('mesafeler doğru sıradadır', () => {
        expect(schedule.map((r) => r.distance)).toEqual([1200, 1400, 1600, 1800, 2000, 2200])
    })

    it('tur id değerleri 1den 6ya sıralıdır', () => {
        expect(schedule.map((r) => r.id)).toEqual([1, 2, 3, 4, 5, 6])
    })

    it('her turda 10 benzersiz at vardır', () => {
        schedule.forEach((round) => {
            expect(round.horseIds).toHaveLength(10)
            expect(new Set(round.horseIds).size).toBe(10)
        })
    })

    it('turlardaki atlar mevcut 20 atın içinden seçilir', () => {
        schedule.forEach((round) => {
            round.horseIds.forEach((id) => expect(horseIds.has(id)).toBe(true))
        })
    })
})