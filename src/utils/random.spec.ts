import { describe, expect, it } from 'vitest'
import { createRng, randomInt, shuffle } from './random'

describe('random', () => {
    it('aynı seed aynı diziyi üretir', () => {
        const a = createRng(123)
        const b = createRng(123)
        expect([a(), a(), a()]).toEqual([b(), b(), b()])
    })

    it('farklı seed farklı değer üretir', () => {
        expect(createRng(1)()).not.toBe(createRng(2)())
    })

    it('randomInt min ve max dahil aralıkta kalır', () => {
        const rng = createRng(7)
        for (let i = 0; i < 1000; i++) {
            const value = randomInt(rng, 1, 100)
            expect(value).toBeGreaterThanOrEqual(1)
            expect(value).toBeLessThanOrEqual(100)
        }
    })

    it('shuffle elemanları korur ve orijinal diziyi değiştirmez', () => {
        const original = [1, 2, 3, 4, 5, 6, 7, 8]
        const copy = [...original]
        const result = shuffle(original, createRng(5))

        expect(original).toEqual(copy)
        expect([...result].sort((a, b) => a - b)).toEqual(copy)
    })
})