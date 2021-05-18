window.addEventListener('DOMContentLoaded', (event) => {
	// generate a random number
	const getRandomInt = (max) => {
		return Math.floor(Math.random() * Math.floor(max));
	};

	const checkCookieExists = (key) => {
		if (getCookie(key)) {
			return true;
		} else {
			return false;
		}
	};

	console.log('Cookie random_number exists?: ' + checkCookieExists('random_number'));
	console.log('Cookie banana exists?: ' + checkCookieExists('banana'));

	// store that number in a cookie
	document.cookie = 'random_number=' + getRandomInt(500);
	// document.cookie = `random_number=;expires=Mon, 09 Mar 2020 22:20:55 GMT;`;

	//  get the new cookie value
	function getCookie(key) {
		// () in regexp are capture groups
		// .match returns the whole match as the first element of the returned array, then each capture group as a separate element
		// first capture group is the beginning of the line/string or semicolon
		// second capture group is any number of characters after the key=, not including ;
		// third capture group is a ; or end of line/string
		// if we have a match, we return the third element of the array because is was the capture group associated with the value, key=value

		const match = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
		return match ? match[2] : null;

		// The functionality of matching the regular expression above can also be accomplished with splitting our cookie string
		// We initially would have to split on `;` in order to separate the cookies
		// We would have to trim our individual cookie in order to get rid of any whitespace that exists on the edges
		// We would have to split again on the `=` in order to separate key from value
		// We would compare the first element in our [key, value] array that we created to the key we are trying to match
		// If we have a match, we would replace our value variable to be our found value
		// After we iterate through our individual cookies, we then return our value, which is either the matching value or null
		// Using the regular expression simplifies this process for us and takes care of capturing the matched value from the key=value pair
		let val = null;
		let cookies = document.cookie.split(';'); // ['random_number=400', ' other_cookie=hey', 'fav_fruit=banana']
		cookies.forEach((cookie) => {
			let pair = cookie.trim().split('='); // ['random_number', '400']
			if (pair[0] === key) {
				val = pair[1];
			}
		});
		return val;
	}
	const randomNumberCookie = getCookie('random_number');
	console.log(randomNumberCookie);

	// open a new window
	newWindow = window.open(
		'https://www.delish.com/cooking/g1956/best-cookies/',
		'Cookies Recipes',
		'width=100, height=100'
	);

	// set the width and height to the cookie value
	newWindow.resizeTo(randomNumberCookie, randomNumberCookie);
});
