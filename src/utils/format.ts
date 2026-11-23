const SUFFIXES: Record<number, string> = { 1: 'ST', 2: 'ND', 3: 'RD' }

export const ordinal = (n: number): string => `${n}${SUFFIXES[n] ?? 'TH'}`