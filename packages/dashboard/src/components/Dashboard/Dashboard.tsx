import { FC } from 'react';
// @ts-ignore
import Position from 'position_widget/Position';
// @ts-ignore
import Chart from 'chart_widget/Chart';
// @ts-ignore
import OrderEntry from 'order_entry_widget/OrderEntry';
// @ts-ignore
import OrderBook from 'order_book_widget/OrderBook';
import style from './Dashboard.module.css';
interface Props {
	title: string;
}

const Dashboard: FC<Props> = ({ title }) => {
	return (
		<div className={style.Wrapper}>
			<h1 className={style.Title}>{title}</h1>
			<div className={style.Grid}>
				<div className={style.GridItem}>
					<Position />
				</div>
				<div className={style.GridItem}>
					<Chart />
				</div>
				<div className={style.GridItem}>
					<OrderEntry />
				</div>
				<div className={style.GridItem}>
					<OrderBook />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
