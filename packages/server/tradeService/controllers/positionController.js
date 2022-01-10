const moment = require('moment');
const { roundTo2DP, calculateOverallPriceChange, calculateTodaysPriceChange } = require('../../helpers');

const getTraderPosition = (data) => {
	const { cashAvailable, unitsHeld, orders } = data.traderInfo;
	const currentPrice = data.priceData[data.priceData.length - 1].close;

	const executedOrders = orders.filter(({ executed }) => executed);

	// Calculate total cost.
	const executedBuyOrders = executedOrders.filter((order) => order.type === 'buy');
	const buyOrdersTotalCost = executedBuyOrders.reduce((accumulator, order) => accumulator + order.price, 0);
	const averageCost = buyOrdersTotalCost / executedBuyOrders.length;
	const totalCost = averageCost * unitsHeld;

	// calculate today's price change as a percentage.
	const { todaysPriceChangePercent, todaysPriceChangeValue } = calculateTodaysPriceChange(data);
	// calculate overall price change (since first trade) as a percentage.
	const { overallPriceChangePercent, overallPriceChangeValue } = calculateOverallPriceChange(data);

	// calculate overall gain (since first trade) as a percentage.

	const firstDealTimestamp = executedOrders[0].timestamp;
	const lastDealTimestamp = executedOrders[executedOrders.length - 1].timestamp;
	const totalDeals = executedOrders.length;

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
