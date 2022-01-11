import dayjs from 'dayjs';

export type PriceData = {
	timestamp: number;
	open: number;
	close: number;
	max: number;
	min: number;
};

export const PRICE_UPDATE_MESSAGE = 'latest_price_update';

export const chartOptions = {
	chart: {
		fontFamily: 'Roboto',
		height: 300,
		type: 'candlestick' as const,
		zoom: {
			enabled: false,
		},
		toolbar: {
			show: false,
		},
		foreColor: '#000',
	},
	title: {
		text: 'FKC/GBP - Last Hour',
		align: 'left' as const,
	},
	tooltip: {
		enabled: true,
	},
	xaxis: {
		type: 'category' as const,
		labels: {
			formatter: (val: string | number | Date | dayjs.Dayjs | null | undefined) => {
				return dayjs(val).format('HH:mm');
			},
		},
	},

	yaxis: {
		tooltip: {
			enabled: true,
		},
	},
};

export const fetchLatestPrices = async (): Promise<PriceData[] | null> => {
	try {
		const response = await fetch('http://localhost:4000/prices');
		if (response.ok) {
			return response.json();
		}
		throw response;
	} catch (error) {
		console.error('error fetching latest prices', error);
		return null;
	}
};

export const dispatchPriceUpdateEvent = (latestPriceData: PriceData) => {
	const priceUpdateEvent = new CustomEvent('price-update', { detail: latestPriceData });
	window.dispatchEvent(priceUpdateEvent);
};
