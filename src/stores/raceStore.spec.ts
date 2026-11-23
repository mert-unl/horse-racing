import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useRaceStore } from './raceStore'
import { useHorseStore } from './horseStore'
import { useScheduleStore } from './scheduleStore'

function runUntilRoundEnds(race: ReturnType<typeof useRaceStore>) {
    let guard = 0
    while (!race.awaitingNextRound && race.status === 'running' && guard++ < 100_000) {
        race.tick(0.05)
    }
}

describe('raceStore', () => {
    beforeEach(() => setActivePinia(createPinia()))

    it('başlangıç durumu idle ve sonuçlar boştur', () => {
        const race = useRaceStore()
        expect(race.status).toBe('idle')
        expect(race.results).toEqual([])
        expect(race.canToggle).toBe(false)
    })

    it('generateProgram 20 at ve 6 tur üretir', () => {
        const race = useRaceStore()
        race.generateProgram()

        expect(useHorseStore().horses).toHaveLength(20)
        expect(useScheduleStore().rounds).toHaveLength(6)
        expect(race.status).toBe('scheduled')
        expect(race.currentRoundIndex).toBe(0)
    })

    it('toggle durumları doğru değiştirir', () => {
        const race = useRaceStore()
        race.toggle()
        expect(race.status).toBe('idle')

        race.generateProgram()
        race.toggle()
        expect(race.status).toBe('running')
        race.toggle()
        expect(race.status).toBe('paused')
        race.toggle()
        expect(race.status).toBe('running')
    })

    it('yarış sürerken yeni program üretilemez', () => {
        const race = useRaceStore()
        race.generateProgram()
        race.toggle()

        const before = useHorseStore().horses
        race.generateProgram()
        expect(useHorseStore().horses).toBe(before)
    })

    it('paused iken tick pozisyonları değiştirmez', () => {
        const race = useRaceStore()
        race.generateProgram()
        race.toggle()
        race.tick(0.05)
        race.toggle()

        const snapshot = JSON.stringify(race.raceState)
        race.tick(0.05)
        expect(JSON.stringify(race.raceState)).toBe(snapshot)
    })

    it('tur bitince sonuç kaydedilir ve nextRound çağrılana kadar bekler', () => {
        const race = useRaceStore()
        race.generateProgram()
        race.toggle()
        runUntilRoundEnds(race)

        expect(race.results).toHaveLength(1)
        expect(race.results[0]?.distance).toBe(1200)
        expect(race.awaitingNextRound).toBe(true)

        race.tick(0.05)
        expect(race.results).toHaveLength(1)

        race.nextRound()
        expect(race.currentRoundIndex).toBe(1)
        expect(race.awaitingNextRound).toBe(false)
    })

    it('6 turun hepsi bitince finished olur ve 6 sonuç vardır', () => {
        const race = useRaceStore()
        race.generateProgram()
        race.toggle()

        let guard = 0
        while (race.status !== 'finished' && guard++ < 100_000) {
            race.tick(0.05)
            if (race.awaitingNextRound) race.nextRound()
        }

        expect(race.status).toBe('finished')
        expect(race.results.map((r) => r.distance)).toEqual([1200, 1400, 1600, 1800, 2000, 2200])
        race.results.forEach((r) => expect(r.ranking).toHaveLength(10))
    })

    it('bittikten sonra yeniden generate edilince sonuçlar sıfırlanır', () => {
        const race = useRaceStore()
        race.generateProgram()
        race.toggle()

        let guard = 0
        while (race.status !== 'finished' && guard++ < 100_000) {
            race.tick(0.05)
            if (race.awaitingNextRound) race.nextRound()
        }

        race.generateProgram()
        expect(race.results).toEqual([])
        expect(race.status).toBe('scheduled')
    })
})