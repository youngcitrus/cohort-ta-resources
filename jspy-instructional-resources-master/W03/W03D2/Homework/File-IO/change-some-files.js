// change-some-files.js

const fs = require('fs');

// Part 1
fs.writeFile('foo.txt', 'Hello world!', 'utf8', (err) => {
	if (err) {
		console.log(err);
	}
	console.log('write is complete');
});

// Part 2
fs.readFile('poetry.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
	}
	console.log('THE CONTENTS ARE:');
	console.log(data);
});

// Part 3

fs.readFile('poetry.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
	}

	let lines = data.split('\n');
	console.log('THE CONTENTS ARE:');
	console.log(lines);
	console.log('The third line is ' + lines[2]);
});

// Part 4
fs.readFile('poetry.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
	}

	let newData = data.split('do not').join('should');

	fs.writeFile('new-poetry.txt', newData, 'utf8', (err) => {
		if (err) {
			console.log(err);
		}

		console.log('done!');
	});
});

// Part 5
function replaceContents(file, oldStr, newStr) {
	fs.readFile(file, 'utf8', (err, data) => {
		if (err) {
			console.log(err);
		}
		let newData = data.split(oldStr).join(newStr);
		writeContents(file, newData);
	});
}

function writeContents(file, data) {
	fs.writeFile('new-' + file, data, 'utf8', (err) => {
		if (err) {
			console.log(err);
		}
		console.log('done!');
	});
}

replaceContents('poetry.txt', 'do not', 'should');
