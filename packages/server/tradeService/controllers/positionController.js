const moment = require('moment');
const { roundTo2DP, calculateOverallPriceChange, calculateTodaysPriceChange } = require('../../helpers');

const getTraderPosition = (data) => {
	const { cashAvailable, unitsHeld, orders } = data.traderInfo;
	const currentPrice = data.priceData[data.priceData.length - 1].close;

	const successfulOrders = orders.filter(({ triggered, succeeded }) => triggered && succeeded);

	// Calculate total cost.
	const successfulBuyOrders = successfulOrders.filter((order) => order.type === 'buy');
	const buyOrdersTotalCost = successfulBuyOrders.reduce((accumulator, order) => accumulator + order.price, 0);
	const averageCost = buyOrdersTotalCost / successfulBuyOrders.length;
	const totalCost = averageCost * unitsHeld;

	// calculate today's price change as a percentage.
	const { todaysPriceChangePercent, todaysPriceChangeValue } = calculateTodaysPriceChange(data);
	// calculate overall price change (since first trade) as a percentage.
	const { overallPriceChangePercent, overallPriceChangeValue } = calculateOverallPriceChange(data);

	// calculate overall gain (since first trade) as a percentage.

	const firstDealTimestamp = successfulOrders[0].timestamp;
	const lastDealTimestamp = successfulOrders[successfulOrders.length - 1].timestamp;
	const totalDeals = successfulOrders.length;

	return {
		cashAvailable,
		unitsHeld,
		currentPrice,
		totalValue: roundTo2DP(currentPrice * unitsHeld),
		totalCost: roundTo2DP(totalCost),
		todaysPriceChangeValue,
		todaysPriceChangePercent,
		overallPriceChangeValue,
		overallPriceChangePercent,
		firstDealTimestamp,
		lastDealTimestamp,
		totalDeals,
	};
};

const getTraderPositionController = (req, res, data) => {
	const traderPosition = getTraderPosition(data);
	res.jsonp(traderPosition);
};

module.exports = getTraderPositionController;
