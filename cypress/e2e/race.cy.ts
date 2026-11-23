const generateBtn = '[data-testid=generate-btn]'
const toggleBtn = '[data-testid=toggle-btn]'

describe('Horse racing', () => {
    describe('program oluşturma', () => {
        beforeEach(() => cy.visit('/?seed=42'))

        it('başlangıçta START kapalı, GENERATE açıktır', () => {
            cy.get(toggleBtn).should('be.disabled')
            cy.get(generateBtn).should('be.enabled')
        })

        it('GENERATE 20 at, 6 tur ve 10 şerit üretir', () => {
            cy.get(generateBtn).click()
            cy.get('[data-testid=horse-list] tbody tr').should('have.length', 20)
            cy.get('[data-testid=program-round]').should('have.length', 6)
            cy.get('[data-testid^=lane-]').should('have.length', 10)
            cy.get('[data-testid=lap-label]').should('contain', '1ST Lap - 1200m')
            cy.get(toggleBtn).should('be.enabled')
        })
    })

    describe('yarış akışı', () => {
        it('6 turu sırayla bitirir ve sonuçları gösterir', () => {
            cy.visit('/?seed=42&speed=10')
            cy.get(generateBtn).click()
            cy.get(toggleBtn).click()

            cy.get(generateBtn).should('be.disabled') // yarış sürerken kapalı
            cy.get('[data-testid=result-round]', { timeout: 60_000 }).should('have.length', 6)

            cy.get('[data-testid=result-round]').first().find('tr').should('have.length', 10)
            cy.get('[data-testid=result-round]').last().should('contain', '2200m')
            cy.get(toggleBtn).should('be.disabled')
            cy.get(generateBtn).should('be.enabled')
        })

        it('PAUSE atları durdurur, RESUME devam ettirir', () => {
            cy.visit('/?seed=42')
            cy.get(generateBtn).click()
            cy.get(toggleBtn).click().should('contain', 'PAUSE')

            cy.wait(500)
            cy.get(toggleBtn).click().should('contain', 'RESUME')

            const horse = '[data-testid=lane-1] [data-testid=horse]'
            cy.get(horse).invoke('attr', 'style').then((paused) => {
                cy.wait(500)
                cy.get(horse).invoke('attr', 'style').should('eq', paused)

                cy.get(toggleBtn).click()
                cy.get(horse).invoke('attr', 'style').should('not.eq', paused)
            })
        })
    })

    describe('visual', () => {
        beforeEach(() => {
            cy.visit('/?seed=42')
        })

        it('boş ekran', () => {
            cy.get('body').matchImageSnapshot('empty-state')
        })

        it('program üretildikten sonraki ekran', () => {
            cy.get(generateBtn).click()
            cy.get('body').matchImageSnapshot('program-generated')
        })
    })
})