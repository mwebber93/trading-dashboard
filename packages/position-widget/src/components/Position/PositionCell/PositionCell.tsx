import { FC } from 'react';
import styles from './PositionCell.module.css';

interface Props {
	label: string;
	value: string;
}

const PositionCell: FC<Props> = ({ label, value }) => {
	return (
		<div className={styles.Wrapper}>
			<span className={styles.Label}>{label}</span>
			<span className={styles.Value}>{value}</span>
		</div>
	);
};

export default PositionCell;
