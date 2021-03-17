// function num1() {
//     return 1;
// }
// async function num2() {
//     return 2;
// }

// async function waiting() {
//     const value = await num2();
//     console.log('waiting', value);
// }

// waiting();

// async function waitForMyPromise() {
//     const promise = new Promise((resolve) => {
//         setTimeout(() => {
//             console.log('I happened first');
//             resolve('done!');
//         }, 1500)
//     }).then(r => console.log('then my other promise is', r));

//     const result = await promise;
//     // console.log('my promise is', result);
// }
// waitForMyPromise();

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// async function doStuff() {
//     await wait(2000)
//     console.log('The waiting is over!')
// }
// doStuff();

// const expoloratoryExample = async () => {
//     const start = Date.now();
//     const createDelayPromise = (delay) => new Promise(res => setTimeout(res, delay));
//     const delays = [500, 1000, 5000];
//     delays.forEach(async (delay) => {
//         await createDelayPromise(delay);
//         console.log(Date.now() - start);
//     });
// };

// expoloratoryExample();

const tryRandomPromise = (random) => new Promise((resolve, reject) => {
    if (random > 0.5) {
        resolve('success!!!');
    } else {
        reject('random error');
    }
});

// for (let i = 1; i < 10; i++) {
//     const random = Math.random();
//     wait(2000 + random * 1000)
//         .then(() => tryRandomPromise(random))
//         .then(result => console.log('random try #', i, result))
//         .catch(error => console.error('random try #', i, error));
// }

const tryTryAgain = async (i) => {
    const random = Math.random();

    // no need for try-catch if there's no possibility of error (rarely happens)
    await wait(3000 + random * 1000);

    // usually you need to wrap the await to gracefully handle the error
    try {
        const result = await tryRandomPromise(random);
        console.log('random again #', i, result);
    } catch (error) {
        console.error('random again #', i, error);
    }
};

for (let i = 1; i < 10; i++) {
    tryTryAgain(i);
}

console.log('END OF PROGRAM');