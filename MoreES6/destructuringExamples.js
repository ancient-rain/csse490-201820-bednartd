// let HttpOptions = {
//     timeout: 2000,
//     isCache: true
// };

// /* later */
// const {
//     timeout,
//     isCache
// } = HttpOptions;
// //  you now have a variable named 'timeout'
// //  and one named 'isCache' with correct values

// console.log(`The timeout value is ${timeout} and the isCache value is ${isCache}`);

// const HttpOptions={timeout: 2000, isCache: true };
// /* later */
// const {timeout, isCache: shouldCache}=HttpOptions;

// console.log(`The timeout value is ${timeout} and the isCache value is ${shouldCache}`);

// /* Nested objects */
// const HttpOptions = {
//     timeout: 2000,
//     cache: {
//         age: 2
//     }
// };
// /* later */
// const {
//     cache: {
//         age
//     }
// } = HttpOptions;

// console.log(`The cache age is ${age}`);

// const people = ["Smith", "Clinton"];
// let [name1, name2] = people;
// console.log(`name1 = ${name1}, name2 = ${name2}`);

// // What if I only wnat the second value?
// let [, person] = people;
// console.log(`person = ${person}`);

let customers = ["Adis", "Kernel", "Cedrick", "Lewis", "Pam", "Desire", "Molly"];

function processCustomers(cust1, cust2, cust3, ...otherCust) {
    console.log(`The first customer is ${cust1} and the second is ${cust2}`);
    console.log(`The third customer is ${cust3}`);
    console.log(`The other customers are ${otherCust}`);
}

processCustomers(...customers);