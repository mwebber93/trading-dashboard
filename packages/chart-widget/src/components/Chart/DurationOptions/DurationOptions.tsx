import { FC } from 'react';
import styles from './DurationOptions.module.css';

type DurationOption = {
	label: string;
	value: 'day' | 'week' | 'month' | 'year' | 'all';
};

const options: DurationOption[] = [
	{
		label: '1D',
		value: 'day',
	},
	{
		label: '1W',
		value: 'week',
	},
	{
		label: '1M',
		value: 'month',
	},
	{
		label: '1Y',
		value: 'year',
	},
	{
		label: 'All',
		value: 'all',
	},
];

interface Props {}

const DurationOptions: FC<Props> = () => {
	return (
		<div className={styles.Wrapper}>
			<span>Duration:</span>
			{options.map((option) => (
				<button key={option.value} className={styles.Option} onClick={() => {}}>
					{option.label}
				</button>
			))}
		</div>
	);
};

export default DurationOptions;
