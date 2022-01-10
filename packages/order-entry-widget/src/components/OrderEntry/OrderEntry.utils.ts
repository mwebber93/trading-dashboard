export type OrderType = 'buy' | 'sell';
export type OrderData = {
	type: OrderType;
	quantity: number;
	price: number;
};

const isNumeric = (value: string) => {
	return !isNaN(parseFloat(value)) && isFinite(+value);
};

export const validateQuantity = (value: string) => {
	if (!isNumeric(value)) {
		return 'Quantity must be numeric.';
	}

	if (+value <= 0) {
		return 'Quantity must be greater than 0.';
	}
};

export const validatePrice = (value: string) => {
	if (!isNumeric(value)) {
		return 'Price must be numeric.';
	}

	if (+value <= 0) {
		return 'Price must be greater than 0.';
	}
};

export const createOrder = async (data: OrderData): Promise<{ success: boolean; message: string }> => {
	try {
		const response = await fetch('http://localhost:4000/order', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const { message } = await response.json();
		return {
			success: response.status === 200,
			message,
		};
	} catch (error) {
		return { success: false, message: 'internal server error' };
	}
};
