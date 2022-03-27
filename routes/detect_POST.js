import { fetch } from "cross-fetch";
import config from "../config.js";

const options = {
	method: "GET",
	headers: {
		Authorization: "Bearer " + config.BEARER_TOKEN,
	},
};

const detect_POST = async (req, res) => {
	if (!req.body || !req.body.username || req.body.username === "") {
		return res.status(400).json({ message: "Invalid Request" });
	}

	let userData, tweetsData;

	const getUserIDEndpoint = `https://api.twitter.com/2/users/by?usernames=${req.body.username}`;
	try {
		const user = await fetch(getUserIDEndpoint, options);
		userData = await user.json();
	} catch {
		return res.status(400).json({ message: "Error Fetching User Details" });
	}

	const getMentionsEndpoint = `https://api.twitter.com/2/users/${userData.data[0].id}/mentions`;
	try {
		const tweets = await fetch(getMentionsEndpoint, options);
		tweetsData = await tweets.json();
	} catch {
		return res.status(400).json({ message: "Error Fetching Tweet Details" });
	}

	return res.status(200).json(tweetsData);
};

export default detect_POST;
