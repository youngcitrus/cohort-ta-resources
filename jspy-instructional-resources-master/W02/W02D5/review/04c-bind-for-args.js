// Using bind to supply arguments to a function (problem 17 of day 4)
function allTheArgs(func, ...args) {
	return func.bind(null, ...args);
}
// // Can also be written without bind, closing over the arguments
// function allTheArgs(func, ...bindArgs) {
//   return function(...invokeArgs) {
//     return func(...bindArgs, ...invokeArgs);
//   };
// }
