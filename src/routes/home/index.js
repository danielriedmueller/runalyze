import style from './style.css';
import {Component} from "preact";
import {Table} from "../../components/table";
import LineChart from "../../components/chart";
import {Subheader} from "../../components/subheader";

class Home extends Component {
	render(props) {
		return <div class={style.home}>
			<LineChart
				runs={props.runs}
				changeCurrentRun={props.changeCurrentRun}
				currentRun={props.currentRun}
				graphMode={props.graphMode}
			/>
			<Table
				runs={props.runs}
				changeCurrentRun={props.changeCurrentRun}
				currentRun={props.currentRun}
				graphMode={props.graphMode}
			/>
		</div>;
	}
}

export default Home;
