import React, { FC } from 'react';
// @ts-ignore
import Position from 'position_widget/Position';
// @ts-ignore
import Chart from 'chart_widget/Chart';
// @ts-ignore
import OrderEntry from 'order_entry_widget/OrderEntry';
// @ts-ignore
import OrderBook from 'order_book_widget/OrderBook';
import style from './Home.module.css';

interface Props {
	title: string;
}

const Home: FC<Props> = ({ title }) => {
	return (
		<div className={style.Wrapper}>
			<h1 className={style.Title}>{title}</h1>
			<div className={style.Grid}>
				<div className={style.GridItem}>
					<React.Suspense fallback="loading">
						<Position />
					</React.Suspense>
				</div>
				<div className={style.GridItem}>
					<React.Suspense fallback="loading">
						<Chart />
					</React.Suspense>
				</div>
				<div className={style.GridItem}>
					<React.Suspense fallback="loading">
						<OrderEntry />
					</React.Suspense>
				</div>
				<div className={style.GridItem}>
					<React.Suspense fallback="loading">
						<OrderBook />
					</React.Suspense>
				</div>
			</div>
		</div>
	);
};

export default Home;
