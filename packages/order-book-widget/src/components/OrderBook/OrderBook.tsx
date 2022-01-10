import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { fetchOrders, Order, NEW_ORDER_MESSAGE, ORDER_EXECUTED_MESSAGE } from './OrderBook.utils';
import OrderBookTable from './OrderBookTable/OrderBookTable';
import styles from './OrderBook.module.css';

interface Props {}

const OrderBook: FC<Props> = () => {
	const ws = useRef<WebSocket | null>(null);
	const [orders, setOrders] = useState<Order[]>([]);

	const initialiseOrders = useCallback(async () => {
		const data = await fetchOrders();
		setOrders(data ?? []);
	}, []);

	useEffect(() => {
		// Fetch all of the latest data.
		initialiseOrders();

		// Initialise websocket connection to get real-time updates.
		ws.current = new WebSocket('ws://localhost:4001/');
		const wsCurrent = ws.current;

		return () => {
			wsCurrent.close();
		};
	}, []);

	useEffect(() => {
		if (!ws.current) return;

		ws.current.onmessage = (e) => {
			const message = JSON.parse(e.data);
			if (message.type === NEW_ORDER_MESSAGE) {
				setOrders([...orders, message.data]);
			} else if (message.type === ORDER_EXECUTED_MESSAGE) {
				// If the order is executed, then remove it from the orders array.
				const ordersCopy = [...orders];
				const index = ordersCopy.map((item) => item.id).indexOf(message.data.id);
				~index && ordersCopy.splice(index, 1);
				setOrders(ordersCopy);
			}
		};
	}, [orders]);

	return (
		<div className={styles.Wrapper}>
			<h1>Outstanding Orders</h1>
			<OrderBookTable orders={orders} />
		</div>
	);
};

export default OrderBook;
