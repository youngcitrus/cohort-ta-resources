/**
 * In this file, create a function named `delayedLogging` that takes
 * a message and a number of seconds to delay before printing the message to
 * the console using console.log.
 *
 * YOU MUST USE AWAIT IN `delayedLogging` TO ACHIEVE THIS.
 * YOU MUST USE THE `delay` FUNCTION THAT YOU WROTE IN THE PREVIOUS TEST.
 *
 * Function name: delayedLogging
 * Parameters:
 *   message: a string to display
 *   n: the number of seconds
 * Return value: a Promise that resolves with no value after an n second delay
 *
 * For example, the following code would wait two seconds, print "I do not want
 * to wake up", wait 1.5 seconds, and print "Fine. I'm up!"
 *
 *   delayedLogging('I do not want to wake up', 2)
 *     .then(() => delayedLogging("Fine! I'm up!", 1.5));
 */

// Your code here
const { delay } = require('./01-create-a-delay-promise');
function delayedLogging(message, n) {
    return new Promise(async resolve => {
        await delay(n);
        console.log(message);
        resolve();
    })
}
/**
 * DO NOT CHANGE ANY CODE BELOW THIS LINE.
 */
try {
    exports.delayedLogging = delayedLogging;
} catch {
    module.exports = null;
}