const moment = require('moment');

const getPricesForLastHour = (priceData) => {
	const startTime = moment().subtract(1, 'hour').set({ milliseconds: 0, seconds: 0 }).valueOf();
	const startIndex = priceData.findIndex(({ timestamp }) => timestamp === startTime);
	const priceDataForLastHour = priceData.slice(startIndex);
	return priceDataForLastHour;
};

const getLatestPricesController = (req, res, data) => {
	const priceDataForLastHour = getPricesForLastHour(data.priceData);
	res.jsonp(priceDataForLastHour);
};

module.exports = getLatestPricesController;
