const ws = require('ws');
const moment = require('moment');

const { PRICE_UPDATE_MESSAGE_TYPE } = require('./constants');

const initialiseData = (mockData) => {
	let price = 1000; // opening price
	const startDateTime = moment().subtract(1, 'day').set({ milliseconds: 0, seconds: 0 });
	const stopDateTime = moment();
	const currentDateTime = startDateTime;
	while (startDateTime <= stopDateTime) {
		const priceData = generatePriceData(price);
		price = priceData.close;

		mockData.push({
			datetime: currentDateTime.valueOf(),
			...priceData,
		});
		currentDateTime.add(1, 'minute');
	}

	console.log('Mock data has been generated...');
};

const generatePriceData = (openingPrice) => {
	let maxPrice = openingPrice;
	let minPrice = openingPrice;
	let price = openingPrice;
	for (let i = 0; i < 50; i++) {
		let fluctuation = Math.floor(Math.random() * (100 - 0 + 1) + 0) / 100;
		fluctuation = Math.round(fluctuation * 100) / 100;
		const isPositive = Math.random() < 0.5;
		price = isPositive ? price + fluctuation : price - fluctuation;
		price = Math.round(price * 100) / 100;

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

const simulateTrading = (wss, mockData) => {
	setInterval(() => {
		const currentDateTime = moment().set({ milliseconds: 0, seconds: 0 });
		const currentPrice = mockData[mockData.length - 1].close;
		const newPriceData = generatePriceData(currentPrice);
		const newMockData = {
			...newPriceData,
			datetime: currentDateTime.valueOf(),
		};

		mockData.push(newMockData);
		wss.clients.forEach((client) => {
			if (client.readyState === ws.OPEN) {
				client.send(
					JSON.stringify({
						type: PRICE_UPDATE_MESSAGE_TYPE,
						data: newMockData,
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
