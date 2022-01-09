import { FC } from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';
import DurationOptions from './DurationOptions/DurationOptions';
import styles from './Chart.module.css';

interface Props {}

const chartMetadata = {
	series: [
		{
			name: 'candle',
			data: [
				{
					x: dayjs().subtract(6, 'day').valueOf(),
					y: [6629.81, 6650.5, 6623.04, 6633.33],
				},
				{
					x: dayjs().subtract(5, 'day').valueOf(),
					y: [6633.33, 6641.8, 6614.01, 6621.05],
				},
				{
					x: dayjs().subtract(4, 'day').valueOf(),
					y: [6621.05, 6647.2, 6601.7, 6645.87],
				},
				{
					x: dayjs().subtract(3, 'day').valueOf(),
					y: [6645.87, 6668.94, 6638.4, 6657.1],
				},
				{
					x: dayjs().subtract(2, 'day').valueOf(),
					y: [6657.1, 6658.4, 6637.04, 6641.65],
				},
				{
					x: dayjs().subtract(1, 'day').valueOf(),
					y: [6641.65, 6644.01, 6631.55, 6642.05],
				},
				{
					x: dayjs().valueOf(),
					y: [6642.05, 6641.94, 6681.24, 6672.99],
				},
			],
		},
	],
	options: {
		chart: {
			fontFamily: "Roboto",
			height: 300,
			type: 'candlestick' as const,
			zoom: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
			foreColor: "#000"
		},
		title: {
			text: 'MTC/GBP - Mattcoin GB Pound',
			align: 'left' as const,
		},
		tooltip: {
			enabled: true,
		},
		xaxis: {
			type: 'category' as const,
			labels: {
				formatter: (val: string | number | Date | dayjs.Dayjs | null | undefined) => {
					return dayjs(val).format('MM/DD');
				},
			},
		},
		yaxis: {
			tooltip: {
				enabled: true,
			},
		},
	},
};

const Chart: FC<Props> = () => {
	return (
		<div className={styles.Wrapper}>
			<DurationOptions />
			<ReactApexChart
				options={chartMetadata.options}
				series={chartMetadata.series}
				type="candlestick"
				height={300}
			/>
		</div>
	);
};

export default Chart;
