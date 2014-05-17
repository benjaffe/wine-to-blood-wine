describe("Replacement Tests", function() {
    it("expects human to become hewmon", function() {
        expect( window.Wtbw.makeReplacements('Human, human, Humans, humans, HUman') )
            .toBe('Hewmon, hewmon, Hewmons, hewmons, HUman');
    });
    it("expects wine to become bloodwine", function() {
        expect( window.Wtbw.makeReplacements('Human, human, Humans, humans, HUman') )
            .toBe('Hewmon, hewmon, Hewmons, hewmons, HUman');
    });
    it("expects beer to become Romulan ale", function() {
        expect( window.Wtbw.makeReplacements('beer, Beer') )
            .toBe('Romulan ale, Romulan Ale');
    });
    it("expects coffee to become Raktajino", function() {
        expect( window.Wtbw.makeReplacements('coffee, Coffee') )
            .toBe('raktajino, Raktajino');
    });
    it("expects tea to become Tarkalean tea", function() {
        expect( window.Wtbw.makeReplacements('tea, Tea, Earl Grey Tea, Earl Grey tea, Earl Grey') )
            .toBe('Tarkalean tea, Tarkalean Tea, Tea (Earl Grey, hot), tea (Earl Grey, hot), tea (Earl Grey, hot)');
    });
    it("expects brandy to become Saurian brandy", function() {
        expect( window.Wtbw.makeReplacements('brandy, Brandy') )
            .toBe('Saurian brandy, Saurian Brandy');
    });
    it("expects Cisco to become Sisko", function() {
        expect( window.Wtbw.makeReplacements('Cisco Systems') )
            .toBe('Sisko Systems');
    });
});