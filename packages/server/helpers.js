const moment = require('moment');

const roundTo2DP = (num) => {
	return Math.round((num + Number.EPSILON) * 100) / 100;
};

const calculateTodaysPriceChange = (data) => {
	const currentPrice = data.priceData[data.priceData.length - 1].close;
	const todayTimestamp = moment().utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).valueOf();
	const dayOpeningPrice = data.priceData.find(({ timestamp }) => {
		return timestamp === todayTimestamp;
	}).open;
	const todaysPriceChangeValue = roundTo2DP(currentPrice - dayOpeningPrice);
	const todaysPriceChangePercent = ((currentPrice - dayOpeningPrice) / currentPrice) * 100;
	return { todaysPriceChangePercent, todaysPriceChangeValue };
};

const calculateOverallPriceChange = (data) => {
	const currentPrice = data.priceData[data.priceData.length - 1].close;
	const triggeredOrders = data.traderInfo.orders.filter(({ triggered, succeeded }) => triggered && succeeded);
	const triggeredBuyOrders = triggeredOrders.filter((order) => order.type === 'buy');
	const firstTradePrice = triggeredBuyOrders[0].price;
	const overallPriceChangeValue = roundTo2DP(currentPrice - firstTradePrice);
	const overallPriceChangePercent = ((currentPrice - firstTradePrice) / currentPrice) * 100;
	return { overallPriceChangePercent, overallPriceChangeValue };
};

module.exports = {
	calculateOverallPriceChange,
	calculateTodaysPriceChange,
	roundTo2DP,
};
