// function* doSomething() {
//     console.log("Started processing");
//     yield;
//     console.log("Resumed processing");
// }

// const iterator = doSomething();
// iterator.next();
// console.log("I got control from the generator function");
// iterator.next();

function* getStockPrice(symbol) {
    while (true) {
        yield Math.random() * 100;
        console.log(`resuming for ${symbol}`);
    }
}

function getTargetPrice(symbol, target) {
    const stockPrice = getStockPrice(symbol);
    let price = stockPrice.next().value;
    while (price > target) {
        price = stockPrice.next().value;
    }

    console.log(`Buying ${symbol} at $${price}`);
}

getTargetPrice('Apple', 15);