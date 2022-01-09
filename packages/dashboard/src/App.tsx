import Dashboard from './components/Dashboard/Dashboard';
import style from './App.module.css';

const App = () => (
	<div className={style.Wrapper}>
		<Dashboard title={'Trading Dashboard'} />
	</div>
);

export default App;
