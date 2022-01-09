import { FC } from 'react';
import PositionCell from './PositionCell/PositionCell';
import styles from './Position.module.css';

interface Props {}

const Position: FC<Props> = () => {
	return (
		<div className={styles.Wrapper}>
			<h1>Position</h1>
			<div className={styles.Grid}>
				<PositionCell label="Units held:" value="56.99" />
				<PositionCell label="Day gain/loss:" value="+£152.97 (+2.72%)" />
				<PositionCell label="Current price:" value="£7,323.67" />
				<PositionCell label="First deal:" value="4 January 2022" />
				<PositionCell label="Total value:" value="£417,375.95" />
				<PositionCell label="Last deal:" value="7th January 2022" />
				<PositionCell label="Overall gain/loss:" value="+£2,145.56 (+11.72%)" />
				<PositionCell label="Total deals" value="4" />
			</div>
		</div>
	);
};

export default Position;
