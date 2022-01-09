import { FC } from 'react';
import styles from './OrderBookTable.module.css';

export type Order = {
	type: 'buy' | 'sell';
	quantity: number;
	price: number;
};

interface Props {
	orders: Order[];
}

const OrderBookTable: FC<Props> = ({ orders }) => {
	return (
		<div className={styles.Wrapper}>
			<table className={styles.Table}>
				<thead>
					<tr>
						<th>Type</th>
						<th>Price</th>
						<th>Quantity</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr>
							<td>{order.type}</td>
							<td>{order.price}</td>
							<td>{order.quantity}</td>
						</tr>
					))}
				</tbody>
			</table>
			{orders.length < 1 && <div className={styles.NoRecords}>No records available</div>}
		</div>
	);
};

export default OrderBookTable;
