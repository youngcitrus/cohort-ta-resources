const fs = require('fs');

// fs.writeFile(file name, data to write, encoding, callback that takes error argument)
fs.writeFile('my-first-written-file.txt', 'hello world!!!', 'utf8', (err) => {
	if (err) {
		console.log(err);
	}

	console.log('done!');
});

// // fs.readFile(file name, encoding, callback that takes error and data arguments)
// fs.readFile('poem.txt', 'utf8', (err, data) => {
// 	if (err) {
// 		console.log(err);
// 	}

// 	console.log('the contents are:');
// 	console.log(data);
// });

// // Interacting with the data read in
// fs.readFile('poem.txt', 'utf8', (err, data) => {
// 	if (err) {
// 		console.log(err);
// 	}

// 	let lines = data.split('\n');
// 	console.log(lines);
// 	console.log(lines[0]);
// });

// // Replacing words
// fs.readFile('poem.txt', 'utf8', (err, data) => {
// 	if (err) {
// 		console.log(err);
// 	}

// 	let newData = data.split('are').join('is');

// 	fs.writeFile('poem.txt', newData, 'utf8', (err) => {
// 		if (err) {
// 			console.log(err);
// 		}

// 		console.log('done!');
// 	});
// });

// // Refactor and make it dynamic!
// function replaceStrs(file, oldStr, newStr) {
// 	fs.readFile(file, 'utf8', (err, data) => {
// 		if (err) {
// 			console.log(err);
// 		}

// 		let newData = data.split(oldStr).join(newStr);

// 		writeContents(file, newData);
// 	});
// }

// function writeContents(file, data) {
// 	fs.writeFile(file, data, 'utf8', (err) => {
// 		if (err) {
// 			console.log(err);
// 		}

// 		console.log('done!');
// 	});
// }

// replaceStrs('poem.txt', 'roses', 'tulips');
// replaceStrs('foods.txt', 'a', 'x');
