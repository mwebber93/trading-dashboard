const moment = require('moment');

const getPricesForLastHour = (data) => {
	const startTime = moment().subtract(1, 'hour').set({ milliseconds: 0, seconds: 0 }).valueOf();
	const startIndex = data.findIndex(({ datetime }) => datetime === startTime);
	const priceData = data.slice(startIndex);
	return priceData;
};

const getLatestPricesController = (req, res, data) => {
	const priceDataForLastHour = getPricesForLastHour(data);
	res.jsonp(priceDataForLastHour);
};

module.exports = getLatestPricesController;
