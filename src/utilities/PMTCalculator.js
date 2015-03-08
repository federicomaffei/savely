'use strict';

module.exports.compPresValue = function(starting, interest){
    return this.roundToTwo(starting*Math.pow(1 + interest, 3));
};

module.exports.compInterests = function(years, interest){
    var result = 0;
    for (var i = years - 1; i >= 1; i--) {
        result = result + Math.pow(1 + interest, i);
    }
    return this.roundToTwo(result);
};

module.exports.PMT = function(startingPoint, endGoal){
    var yearsPeriod = 3;
    var interestRate = 0.01;
    var compoundStartValue = this.compPresValue(startingPoint, interestRate);
    var compoundInterests = this.compInterests(yearsPeriod, interestRate);
    return this.roundToTwo((compoundStartValue + endGoal)/(compoundInterests + 1));
};

module.exports.roundToTwo = function(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}