function getValueOfElemById(id) {
    var pElem = document.getElementById(id);
    var originals = pElem.querySelectorAll('.wtbw-original');
    var str = '';
    for (var i = 0; i < originals.length; i++) {
        originals[i].parentNode.removeChild(originals[i]);
    }
    return pElem.textContent;
}
describe("Replacement Tests", function() {
    it("expects human to become hewmon", function() {
        expect( getValueOfElemById('human') )
            .toBe('Hewmon, hewmon, Hewmons, hewmons, hewmon');
    });
    it("expects wine to become bloodwine", function() {
        expect( getValueOfElemById('wine') )
            .toBe('bloodwine, Bloodwine');
    });
    it("expects beer to become Romulan ale", function() {
        expect( getValueOfElemById('beer') )
            .toBe('Romulan ale, Romulan Ale');
    });
    it("expects coffee to become Raktajino", function() {
        expect( getValueOfElemById('coffee') )
            .toBe('raktajino, Raktajino');
    });
    it("expects tea to become Tarkalean tea", function() {
        expect( getValueOfElemById('tea') )
            .toBe('Tarkalean tea, Tarkalean Tea, Tea (Earl Grey, hot), tea (Earl Grey, hot), Earl Grey');
    });
    it("expects brandy to become Saurian brandy", function() {
        expect( getValueOfElemById('brandy') )
            .toBe('Saurian brandy, Saurian Brandy');
    });
    it("expects Cisco to become Sisko", function() {
        expect( getValueOfElemById('cisco') )
            .toBe('Sisko, Sisko');
    });
});