import { fetch } from "cross-fetch";
import config from "../config.js";

const options = {
	method: "GET",
	headers: {
		Authorization: "Bearer " + config.BEARER_TOKEN,
	},
};

const detect_POST = async (req, res) => {
	const getUserIDEndpoint = `https://api.twitter.com/2/users/by?usernames=${req.body.username}`;
	const user = await fetch(getUserIDEndpoint, options);
	const userData = await user.json();

	const getMentionsEndpoint = `https://api.twitter.com/2/users/${userData.data[0].id}/mentions`;
	const tweets = await fetch(getMentionsEndpoint, options);
	const tweetsData = await tweets.json();

	res.status(200).json(tweetsData);
};

export default detect_POST;
