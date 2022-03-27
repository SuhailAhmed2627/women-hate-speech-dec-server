import tensor from "@tensorflow/tfjs-node";
import toxicity from "@tensorflow-models/toxicity";

const detect = async (tweets, ids) => {
	let corruptTweets = [];
	let corruptIds = [];

	const models = await toxicity.load(0.9);

	const predictions = await models.classify(tweets);
	predictions.forEach((item) => {
		item.results.forEach((result, index) => {
			if (result.match === true) {
				corruptTweets.push(tweets[index]);
				corruptIds.push(ids[index]);
			}
		});
	});
	const response = corruptIds.map((val, index) => {
		if (index % 2 == 0) {
			return val;
		}
	});
	return response;
};

export default detect;
