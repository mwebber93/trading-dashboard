import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import {
	chartOptions,
	dispatchPriceUpdateEvent,
	fetchLatestPrices,
	PriceData,
	PRICE_UPDATE_MESSAGE,
} from './Chart.utils';
import styles from './Chart.module.css';

interface Props {}

const Chart: FC<Props> = () => {
	const ws = useRef<WebSocket | null>(null);
	const [latestPrices, setLatestPrices] = useState<PriceData[]>([]);

	const initialiseLatestPrices = useCallback(async () => {
		const data = await fetchLatestPrices();
		setLatestPrices(data ?? []);
	}, []);

	useEffect(() => {
		// Fetch all of the latest data.
		initialiseLatestPrices();

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
			if (message.type === PRICE_UPDATE_MESSAGE) {
				const latestPricesCopy = [...latestPrices];
				// Lose the oldest price.
				latestPricesCopy.shift();
				// Append the latest price.
				latestPricesCopy.push(message.data);
				setLatestPrices(latestPricesCopy);
				// Dispatch an event for other widgets to get new the price data.
				dispatchPriceUpdateEvent(message.data);
			}
		};
	}, [latestPrices]);

	const chartSeries = useMemo(
		() => [
			{
				name: 'candle',
				data: latestPrices.map((priceData) => ({
					x: priceData.timestamp,
					y: [priceData.open, priceData.max, priceData.min, priceData.close],
				})),
			},
		],
		[latestPrices]
	);

	return (
		<div className={styles.Wrapper}>
			<ReactApexChart options={chartOptions} series={chartSeries} type="candlestick" height={300} />
		</div>
	);
};

export default Chart;
