const detect = (tweets) => {
	let corruptTweets = [];

	tweets.forEach((tweet) => {
		if (checkForHatred(tweet.data) == true) {
			corruptTweets.push(tweet.id);
		}
	});

	return corruptTweets;
};
