import style from './style.css';
import {Component} from "preact";
import {Table} from "../../components/table";
import LineChart from "../../components/chart";

class Home extends Component {
	render(props) {
		return <div class={style.home}>
			<LineChart runs={props.runs.slice(0, 100).reverse()} />
			<Table runs={props.runs} />
		</div>;
	}
}

export default Home;
