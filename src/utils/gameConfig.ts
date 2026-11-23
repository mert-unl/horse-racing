export function getSpeedMultiplier(): number {
    const value = Number(new URLSearchParams(window.location.search).get('speed'))
    return Number.isFinite(value) && value >= 1 && value <= 50 ? value : 1
}