let poniesInRace = [];

function addPoniesBad(ponies) {
    for (let i = 0; i < arguments.length; i++) {
        poniesInRace.push(arguments[i]);
    }
}
addPoniesBad('Rainbow Dash', 'Pinkie Pie');
console.log(poniesInRace);

function addPonies(firstPony, ...ponies) {
    for (let pony of ponies) { // for-of loop
        poniesInRace.push(pony);
    }
}
addPonies('Billie Jean', 'Pharoah', 'Sea Biscut');
console.log(poniesInRace);

function calcTaxSpread(cust1, cust2, cust3, income) {
    console.log("ES6. Calculating tax for " +
        "customers with the income ", income);
    console.log(cust1, cust2, cust3);
}
const custs = ["Smith", "Johnson", "McDonald"];
calcTaxSpread(...custs, 50000);