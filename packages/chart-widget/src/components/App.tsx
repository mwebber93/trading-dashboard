import style from "./App.module.css";
import Chart from './Chart/Chart';

const App = () => {
	return (
		<div className={style.Wrapper}>
			<Chart />
		</div>
	);
};

export default App;
