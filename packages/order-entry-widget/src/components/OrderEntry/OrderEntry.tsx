import { FC, useState } from 'react';
import styles from './OrderEntry.module.css';
import { createOrder, OrderType, validatePrice, validateQuantity } from './OrderEntry.utils';

interface Props {}

const OrderEntry: FC<Props> = () => {
	const [type, setType] = useState<OrderType>('buy');
	const [quantity, setQuantity] = useState('');
	const [price, setPrice] = useState('');
	const [error, setError] = useState('');

	const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setType(e.target.value as OrderType);
	};

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuantity(e.target.value);
	};

	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPrice(e.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const quantityError = validateQuantity(quantity);
		if (quantityError) {
			setError(quantityError);
			return;
		}

		const priceError = validatePrice(price);
		if (priceError) {
			setError(priceError);
			return;
		}

		const { success, message } = await createOrder({
			type,
			quantity: +quantity,
			price: +price,
		});

		if (success) {
			resetForm();
		} else {
			setError(message);
		}
	};

	const resetForm = () => {
		setType('buy');
		setQuantity('');
		setPrice('');
		setError('');
	};

	return (
		<div className={styles.Wrapper}>
			<h1>Order Entry</h1>
			<form className={styles.Form} onSubmit={handleSubmit}>
				<label>Order Type:</label>
				<div className={styles.RadioOptions}>
					<div className={styles.RadioOption}>
						<input
							type="radio"
							id="radio-btn-buy"
							name="order-type"
							value="buy"
							checked={type === 'buy'}
							onChange={handleTypeChange}
						/>
						<label htmlFor="radio-btn-buy">Buy</label>
					</div>
					<div className={styles.RadioOption}>
						<input
							type="radio"
							id="radio-btn-sell"
							name="order-type"
							value="sell"
							checked={type === 'sell'}
							onChange={handleTypeChange}
						/>
						<label htmlFor="radio-btn-sell">Sell</label>
					</div>
				</div>
				<label>Quantity:</label>
				<input
					type="text"
					className={styles.Input}
					name="quantity"
					value={quantity}
					onChange={handleQuantityChange}
				/>
				<label>Price (GBP):</label>
				<input type="text" className={styles.Input} name="price" value={price} onChange={handlePriceChange} />
				<input type="submit" value="Place Order" className={styles.Submit} />
				{error && <span className={styles.Error}>{error}</span>}
			</form>
		</div>
	);
};

export default OrderEntry;
