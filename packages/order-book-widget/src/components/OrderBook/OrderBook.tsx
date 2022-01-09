import { FC } from 'react';
import styles from './OrderBook.module.css';
import OrderBookTable, { Order } from './OrderBookTable/OrderBookTable';

interface Props {}

const orderMetadata: Order[] = [
];

const OrderBook: FC<Props> = () => {
	return (
		<div className={styles.Wrapper}>
			<h1>Order Book</h1>
			<OrderBookTable orders={orderMetadata} />
		</div>
	);
};

export default OrderBook;
