import { FC, useCallback, useEffect, useRef, useState } from 'react';
import PositionCell from './PositionCell/PositionCell';
import {
	fetchPositionData,
	formatToDate,
	formatToGBP,
	formatToPercent,
	ORDER_EXECUTED_MESSAGE,
	PositionData,
	PriceData,
} from './Position.utils';
import styles from './Position.module.css';

interface Props {}

const Position: FC<Props> = () => {
	const ws = useRef<WebSocket | null>(null);
	const [positionData, setPositionData] = useState<Partial<PositionData>>({});

	const initialisePosition = useCallback(async () => {
		const data = await fetchPositionData();
		setPositionData(data ?? {});
	}, []);

	useEffect(() => {
		// Fetch all of the latest data.
		initialisePosition();

		// Initialise websocket connection to get real-time updates.
		ws.current = new WebSocket('ws://localhost:4001/');
		const wsCurrent = ws.current;

		return () => {
			wsCurrent.close();
		};
	}, [initialisePosition]);

	useEffect(() => {
		if (!ws.current) return;

		ws.current.onmessage = (e: MessageEvent) => {
			const message = JSON.parse(e.data);
			if (message.type === ORDER_EXECUTED_MESSAGE) {
				// If the order is executed, then refresh the position data.
				initialisePosition();
			}
		};
	}, [initialisePosition, positionData]);

	const handlePriceUpdate = useCallback(
		(e: Event) => {
			const priceData = (e as CustomEvent).detail as PriceData;
			setPositionData({
				...positionData,
				currentPrice: priceData.close,
				totalValue: priceData.totalValue,
				todaysPriceChangePercent: priceData.todaysPriceChangePercent,
				todaysPriceChangeValue: priceData.todaysPriceChangeValue,
				overallPriceChangePercent: priceData.overallPriceChangePercent,
				overallPriceChangeValue: priceData.overallPriceChangeValue,
			});
		},
		[positionData]
	);

	useEffect(() => {
		window.addEventListener('price-update', handlePriceUpdate);

		return () => {
			window.removeEventListener('price-update', handlePriceUpdate);
		};
	}, [handlePriceUpdate]);

	return (
		<div className={styles.Wrapper}>
			<h1>Position</h1>
			<div className={styles.Grid}>
				<PositionCell label="Cash available:" value={formatToGBP(positionData?.cashAvailable)} />
				<PositionCell
					label="Day price change:"
					value={`${formatToGBP(positionData?.todaysPriceChangeValue)} (${formatToPercent(
						positionData?.todaysPriceChangePercent
					)})`}
				/>
				<PositionCell label="Units held:" value={(positionData?.unitsHeld ?? 0).toString()} />
				<PositionCell
					label="Overall price change:"
					value={`${formatToGBP(positionData?.overallPriceChangeValue)} (${formatToPercent(
						positionData?.overallPriceChangePercent
					)})`}
				/>
				<PositionCell label="Current price:" value={formatToGBP(positionData?.currentPrice)} />
				<PositionCell label="First deal:" value={formatToDate(positionData?.firstDealTimestamp)} />
				<PositionCell label="Total value:" value={formatToGBP(positionData?.totalValue)} />
				<PositionCell label="Last deal:" value={formatToDate(positionData?.lastDealTimestamp)} />
				<PositionCell label="Total cost:" value={formatToGBP(positionData?.totalCost)} />
				<PositionCell label="Total deals:" value={(positionData?.totalDeals ?? 0).toString()} />
			</div>
		</div>
	);
};

export default Position;
