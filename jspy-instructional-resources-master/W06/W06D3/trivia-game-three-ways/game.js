import { getClue as getClueFromCallback } from './callback-version.js';
import { getClue as getClueFromPromise } from './promise-version.js';
import { getClue as getClueFromAsyncFunction } from './async-await-version.js';
import { markInvalid as markInvalidFromCallback } from './invalid-callback.js';
import { markInvalid as markInvalidFromPromise } from './invalid-promise.js';
import { markInvalid as markInvalidFromAsyncFunction } from './invalid-async-await.js';
import { createClue as createClueFromCallback } from './create-callback.js';
import { createClue as createClueFromPromise } from './create-promise.js';
import { createClue as createClueFromAsyncFunction } from './create-async-await.js';

function setHtmlFromClue(clue) {
	document.getElementById('answer').innerHTML = clue.answer;
	document.getElementById('value').innerHTML = clue.value;
	document.getElementById('category-title').innerHTML = clue.category.title;
	document.getElementById('question').innerHTML = clue.question;

	console.log(`valid_count`, clue);
	let validity = 'valid';
	let count = clue.invalid_count || clue.invalidCount; //localstorage converts name
	if (count) {
		validity = 'invalid';
	}
	document.getElementById('invalid-count').innerHTML = validity;

	// Game
	document.getElementById('check-response').classList.remove('is-hidden');
	document.getElementById('player-response').value = '';
	document.getElementById('answer').classList.add('is-hidden');

	// //Preserve by ID
	// localStorage.setItem('clueID', clue.id);

	//Preserve whole clue
	localStorage.setItem('clue', JSON.stringify(clue));
}

document.getElementById('use-callback').addEventListener('click', () => {
	getClueFromCallback((err, clue) => {
		if (err !== null) return console.error(err);
		setHtmlFromClue(clue);
	});
});

document.getElementById('use-promise').addEventListener('click', () => {
	getClueFromPromise().then((clue) => setHtmlFromClue(clue)).catch((err) => console.error(err.message));

	// Could also be the following code. Why?
	// getClueFromPromise()
	//   .then(setHtmlFromClue)
	//   .catch(err => console.error(err.message));
});

document.getElementById('use-async-await').addEventListener('click', async () => {
	try {
		const clue = await getClueFromAsyncFunction();
		setHtmlFromClue(clue);
	} catch (e) {
		console.error(e.message);
	}
});

// Game
let score = 0;

document.getElementById('check-response').addEventListener('click', () => {
	let responseVal = document.getElementById('player-response').value.trim().toLowerCase();
	let answer = document.getElementById('answer');
	let answerVal = answer.innerHTML.trim().toLowerCase();
	let value = Number(document.getElementById('value').innerHTML.trim());
	if (responseVal === answerVal) {
		score += value;
	} else {
		score -= value;
	}
	document.getElementById('score').innerHTML = score;
	answer.classList.remove('is-hidden');
	document.getElementById('check-response').classList.add('is-hidden');
	console.log(score);
});

// //Preserve by ID
// document.addEventListener('DOMContentLoaded', async () => {
// 	let clueID = localStorage.getItem('clueID');
// 	if (clueID) {
// 		const response = await fetch(`https://jservice.xyz/api/clues/${clueID}`);
// 		if (!response.ok) throw new Error(response.status);
// 		const clue = await response.json();
// 		setHtmlFromClue(clue);
// 	}
// });

// //Preserve whole clue
// document.addEventListener('DOMContentLoaded', async () => {
// 	let clue = localStorage.getItem('clue');
// 	if (clue) {
// 		setHtmlFromClue(JSON.parse(clue));
// 	}
// });

//Preserve whole clue and update
document.addEventListener('DOMContentLoaded', async () => {
	let clue = localStorage.getItem('clue');
	if (clue) {
		clue = JSON.parse(clue);
		setHtmlFromClue(clue);
		let clueID = clue.id;
		const response = await fetch(`https://jservice.xyz/api/clues/${clueID}`);
		if (!response.ok) throw new Error(response.status);
		clue = await response.json();
		setHtmlFromClue(clue);
	}
});

// Mark Invalid
document.getElementById('invalid-callback').addEventListener('click', () => {
	const clue = localStorage.getItem('clue');
	if (clue) {
		const clueID = JSON.parse(clue).id;
		markInvalidFromCallback(clueID, (err, clue) => {
			if (err !== null) return console.error(err);
			setHtmlFromClue(clue);
		});
	}
});

document.getElementById('invalid-promise').addEventListener('click', () => {
	let clue = localStorage.getItem('clue');
	if (clue) {
		const clueID = JSON.parse(clue).id;
		markInvalidFromPromise(clueID).then((clue) => setHtmlFromClue(clue)).catch((err) => console.log(err.message));
	}
});

document.getElementById('invalid-async-await').addEventListener('click', async () => {
	let clue = localStorage.getItem('clue');
	if (clue) {
		const clueID = JSON.parse(clue).id;
		try {
			clue = await markInvalidFromAsyncFunction(clueID);
			setHtmlFromClue(clue);
		} catch (e) {
			console.error(e.message);
		}
	}
});

// Submit New Question
document.getElementById('submit-callback').addEventListener('click', () => {
	const clue = createClueObject();
	createClueFromCallback(clue, (err, newClue) => {
		if (err !== null) return console.error(err);
		setHtmlFromClue(newClue);
	});
});

document.getElementById('submit-promise').addEventListener('click', () => {
	const clue = createClueObject();
	createClueFromPromise(clue).then((newClue) => setHtmlFromClue(newClue)).catch((err) => {
		// debugger;
		console.log(err.message);
	});
});

document.getElementById('submit-async-await').addEventListener('click', async () => {
	const clue = createClueObject();
	try {
		let newClue = await createClueFromAsyncFunction(clue);
		setHtmlFromClue(newClue);
	} catch (e) {
		console.error(e.message);
	}
});

function createClueObject() {
	const question = document.getElementById('new-question').value.trim();
	const answer = document.getElementById('new-answer').value.trim();
	const value = Number(document.getElementById('new-value').value.trim());
	const categoryId = Number(document.getElementById('new-category').value.trim());
	return { question, answer, value, categoryId };
}
