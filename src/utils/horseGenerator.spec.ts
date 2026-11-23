import { describe, expect, it } from 'vitest'
import { createRng } from './random'
import { generateHorses } from './horseGenerator'

describe('horseGenerator', () => {
    const horses = generateHorses(createRng(42))

    it('20 at üretir', () => {
        expect(horses).toHaveLength(20)
    })

    it('her atın id değeri benzersizdir', () => {
        expect(new Set(horses.map((h) => h.id)).size).toBe(20)
    })

    it('her atın rengi benzersizdir', () => {
        expect(new Set(horses.map((h) => h.color)).size).toBe(20)
    })

    it('condition değerleri 1-100 arasındadır', () => {
        horses.forEach((h) => {
            expect(h.condition).toBeGreaterThanOrEqual(1)
            expect(h.condition).toBeLessThanOrEqual(100)
        })
    })

    it('aynı seed aynı atları üretir', () => {
        expect(generateHorses(createRng(9))).toEqual(generateHorses(createRng(9)))
    })
})