import style from './style.css';
import {Component} from "preact";
import {Table} from "../../components/table";
import LineChart from "../../components/chart";
import {BestRuns} from "../../components/bestruns";

class Home extends Component {
	render(props) {
		return <div class={style.home}>
			<LineChart
				runs={props.filteredRuns}
				changeCurrentRun={props.changeCurrentRun}
				changeGraphMode={props.changeGraphMode}
				currentRun={props.currentRun}
				graphMode={props.graphMode}
			/>
			<BestRuns
				runs={props.filteredRuns}
				changeCurrentRun={props.changeCurrentRun}
				currentRun={props.currentRun}
				graphMode={props.graphMode}
			/>
			<Table
				changeRunFilter={props.changeRunFilter}
				runs={props.runs}
			/>
		</div>;
	}
}

export default Home;
