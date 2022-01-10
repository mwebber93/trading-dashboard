export type Order = {
	id: string;
	type: 'buy' | 'sell';
	quantity: number;
	price: number;
};

export const NEW_ORDER_MESSAGE = 'new_order';
export const ORDER_EXECUTED_MESSAGE = 'order_executed';

export const formatToGBP = (value: number | undefined): string => {
	const GBPFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'GBP',
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	});

	return GBPFormatter.format(value ?? 0);
};

export const fetchOrders = async (): Promise<Order[] | null> => {
	try {
		const response = await fetch('http://localhost:4000/orders');
		if (response.ok) {
			return response.json();
		}
		throw response;
	} catch (error) {
		console.error('error fetching latest prices', error);
		return null;
	}
};
