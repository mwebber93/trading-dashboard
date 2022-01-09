import { FC } from 'react';
import styles from './OrderEntry.module.css';

interface Props {}

const OrderEntry: FC<Props> = () => {
	return (
		<div className={styles.Wrapper}>
			<h1>Order Entry</h1>
			<form method="post" className={styles.Form}>
				<label>Order Type:</label>
				<div className={styles.RadioOptions}>
					<div className={styles.RadioOption}>
						<input type="radio" id="radio-btn-buy" name="order-type" value="buy" />
						<label htmlFor="radio-btn-buy">Buy</label>
					</div>
					<div className={styles.RadioOption}>
						<input type="radio" id="radio-btn-sell" name="order-type" value="sell" />
						<label htmlFor="radio-btn-sell">Sell</label>
					</div>
				</div>
				<label>Quantity:</label>
				<input type="number" min={0} max={9999999} step={1} placeholder="0" className={styles.Input} />
				<label>Price (GBP):</label>
				<input type="number" min={0} max={9999999} step={0.01} placeholder="0" className={styles.Input} />
				<input type="submit" value="Place Order" className={styles.Submit} />
			</form>
		</div>
	);
};

export default OrderEntry;
