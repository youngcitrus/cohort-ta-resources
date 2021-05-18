import React, { useState, useEffect, useContext } from 'react';
import { apiBaseUrl } from './config';
import { GifContext } from './GifContext';

const Gif = () => {
	const context = useContext(GifContext);
	const [ imgUrl, setImgUrl ] = useState();
	const [ isLoading, setIsLoading ] = useState(true);

	const [ minutes, updateTimer ] = useState(0);
	useEffect(
		() => {
			const timeout = setTimeout(() => {
				updateTimer(minutes + 1);
				clearInterval(interval);
			}, 60000);

			let seconds = 0;
			const interval = setInterval(() => {
				console.log(`Timeout is still running! Minute: ${minutes} Seconds: ${seconds}`);
				seconds++;
			}, 1000);

			// // To perform cleanup when our component unmounts, we return a function to invoke
			// // In this demo, we want to clear the timeout so that it no longer runs in the background
			// return () => {
			// 	clearTimeout(timeout);
			// };
		},
		[ minutes ]
	);

	useEffect(
		() => {
			(async () => {
				try {
					const res = await fetch(`${apiBaseUrl}&q=${context.searchQuery}`);
					if (!res.ok) throw res;
					const giphyRes = await res.json();
					const gifUrl = giphyRes.data[0].images.fixed_width.url;

					setImgUrl(gifUrl);
					setIsLoading(false);
				} catch (err) {
					console.error(err);
				}
			})();
		},
		[ context.searchQuery ]
	);

	if (isLoading) {
		return <h1>Searching for gif...</h1>;
	}

	return (
		<div>
			<img src={`${imgUrl}`} alt='gif' />
			<p>{`It's been ${minutes} "minute${minutes === 1 ? '' : 's'}" since this component mounted.`}</p>
		</div>
	);
};

export default Gif;
