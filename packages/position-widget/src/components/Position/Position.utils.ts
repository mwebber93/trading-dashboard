export type PositionData = {
	cashAvailable: number;
	unitsHeld: number;
	currentPrice: number;
	totalValue: number;
	totalCost: number;
	todaysPriceChangeValue: number;
	todaysPriceChangePercent: number;
	overallPriceChangeValue: number;
	overallPriceChangePercent: number;
	firstDealTimestamp: number;
	lastDealTimestamp: number;
	totalDeals: number;
};

export type PriceData = {
	timestamp: number;
	open: number;
	close: number;
	max: number;
	min: number;
	todaysPriceChangeValue: number;
	todaysPriceChangePercent: number;
	overallPriceChangeValue: number;
	overallPriceChangePercent: number;
	totalValue: number;
};

export const ORDER_EXECUTED_MESSAGE = 'order_executed';

export const fetchPositionData = async (): Promise<PositionData | null> => {
	try {
		const response = await fetch('http://localhost:4000/position');
		if (response.ok) {
			return response.json();
		}
		throw response;
	} catch (error) {
		console.error('error fetching latest prices', error);
		return null;
	}
};

export const formatToGBP = (value: number | undefined): string => {
	const GBPFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'GBP',
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
		signDisplay: 'always',
	});

	return GBPFormatter.format(value ?? 0);
};

export const formatToPercent = (value: number | undefined): string => {
	const PercentFormatter = new Intl.NumberFormat('en-US', {
		style: 'percent',
		maximumFractionDigits: 2,
		signDisplay: 'always',
	});

	return PercentFormatter.format((value ?? 0) / 100);
};

export const formatToDate = (value: number | undefined): string => {
	const DateFormatter = new Intl.DateTimeFormat('en-US', {
		month: '2-digit',
		day: '2-digit',
		year: 'numeric',
	});

	return DateFormatter.format(value ? new Date(value) : new Date());
};
