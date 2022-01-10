const ws = require('ws');
const moment = require('moment');

const { PRICE_UPDATE_MESSAGE_TYPE } = require('./constants');
const { roundTo2DP, calculateOverallPriceChange, calculateTodaysPriceChange } = require('./helpers');

const initialiseData = (mockData) => {
	let price = 1000; // opening price
	const startDateTime = moment().subtract(1, 'day').set({ milliseconds: 0, seconds: 0 });
	const stopDateTime = moment();
	const currentDateTime = startDateTime;
	while (startDateTime <= stopDateTime) {
		const priceData = generatePriceData(price, true);
		price = priceData.close;

		mockData.priceData.push({
			timestamp: currentDateTime.valueOf(),
			...priceData,
		});
		currentDateTime.add(1, 'minute');
	}

	console.log('Mock data has been generated...');
};

const generatePriceData = (openingPrice, isHistorical, mockData) => {
	let maxPrice = openingPrice;
	let minPrice = openingPrice;
	let price = openingPrice;
	for (let i = 0; i < 50; i++) {
		let fluctuation = Math.floor(Math.random() * (100 - 0 + 1) + 0) / 100;
		fluctuation = roundTo2DP(fluctuation);
		const isPositive = Math.random() < 0.5;
		price = isPositive ? price + fluctuation : price - fluctuation;
		price = roundTo2DP(price);

		// If not generating historical price data then, if triggered, ensure any order entries are committed.
		if (!isHistorical) {
			actionOutstandingOrders(price, mockData);
		}

		if (price > maxPrice) {
			maxPrice = price;
		} else if (price < minPrice) {
			minPrice = price;
		}
	}

	return {
		open: openingPrice,
		close: price,
		max: maxPrice,
		min: minPrice,
	};
};

const actionOutstandingOrders = (newPrice, mockData) => {
	mockData.traderInfo.orders = mockData.traderInfo.orders.map((order) => {
		const { triggered, price, type } = order;
		if (triggered) {
			return order;
		}

		if (type === 'buy' && price >= newPrice) {
			// if the buy order's price is breached then trigger the purchase.
			const succeeded = triggerBuyOrder(order, mockData);
			return {
				...order,
				triggered: true,
				succeeded,
			};
		} else if (type === 'sell' && price <= newPrice) {
			// if the sell order's price is breached then trigger the sale.
			const succeeded = triggerSellOrder(order, mockData);
			return {
				...order,
				triggered: true,
				succeeded,
			};
		}

		return order;
	});
};

const triggerBuyOrder = (order, mockData) => {
	const currentPrice = data.priceData[data.priceData.length - 1].close;
	const { quantity } = order;
	const totalPrice = roundTo2DP(quantity * currentPrice);
	if (mockData.traderInfo.cashAvailable >= totalPrice) {
		mockData.traderInfo.cashAvailable -= totalPrice;
		mockData.traderInfo.unitsHeld += quantity;
		return true;
	}
	return false;
};

const triggerSellOrder = (order, mockData) => {
	const currentPrice = data.priceData[data.priceData.length - 1].close;
	const { quantity } = order;
	const totalPrice = roundTo2DP(quantity * currentPrice);
	if (mockData.traderInfo.unitsHeld < quantity) {
		mockData.traderInfo.cashAvailable += totalPrice;
		mockData.traderInfo.unitsHeld -= quantity;
		return true;
	}
	return false;
};

const simulateTrading = (wss, mockData) => {
	setInterval(() => {
		// Generate new price changes and broadcast them.
		const currentDateTime = moment().set({ milliseconds: 0, seconds: 0 });
		const currentPrice = mockData.priceData[mockData.priceData.length - 1].close;
		const newPriceData = {
			timestamp: currentDateTime.valueOf(),
			...generatePriceData(currentPrice, false, mockData),
		};
		mockData.priceData.push(newPriceData);

		const broadcastData = {
			timestamp: currentDateTime.valueOf(),
			...newPriceData,
			...calculateOverallPriceChange(mockData),
			...calculateTodaysPriceChange(mockData),
			totalValue: roundTo2DP(mockData.traderInfo.unitsHeld * newPriceData.close),
		};

		wss.clients.forEach((client) => {
			if (client.readyState === ws.OPEN) {
				client.send(
					JSON.stringify({
						type: PRICE_UPDATE_MESSAGE_TYPE,
						data: broadcastData,
					})
				);
			}
		});
		console.log('Latest price data has been broadcasted.');
	}, 60 * 1000);
};

const initialiseTradeSimulator = (wss, mockData) => {
	initialiseData(mockData);
	simulateTrading(wss, mockData);
};

module.exports = { initialiseTradeSimulator };
