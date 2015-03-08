describe('PMT Calculator', function(){
    var calculator = require('../../src/utilities/PMTCalculator'),
        expect = require('expect.js');

    describe('Interests calculation', function(){
        it('can calculate the compounded present value', function(){
            expect(calculator.compPresValue(10, 0.01)).to.equal(10.30);
        });

        it('can calculate the compounded interests', function(){
            expect(calculator.compInterests(3, 0.01)).to.equal(2.03);
        });
    });

    describe('PMT calculation', function(){
        it('can compute yearly payments for a 3 year cash in bank plan', function(){
            expect(calculator.PMT(-10, 20)).to.equal(3.20);
        });
    });

});