import style from './style.css';
import {Component} from "preact";
import LineChart from "../../components/chart";
import {BestRuns} from "../../components/bestruns";
import {YearRuns} from "../../components/yearruns";
import {WeekRuns} from "../../components/weekruns";
import {MonthRuns} from "../../components/monthruns";
import {filterRuns} from "../../helper/functions";

class Home extends Component {
	render(props) {
		return <div class={style.home}>
			<LineChart
				runs={filterRuns(props.runs, props.runFilter)}
				changeCurrentRun={props.changeCurrentRun}
				changeGraphMode={props.changeGraphMode}
				currentRun={props.currentRun}
				graphMode={props.graphMode}
			/>
			<BestRuns
				runs={filterRuns(props.runs, props.runFilter)}
				changeCurrentRun={props.changeCurrentRun}
				currentRun={props.currentRun}
				graphMode={props.graphMode}
			/>
			<WeekRuns
				runs={filterRuns(props.runs, {year: props.runFilter.year, month: props.runFilter.month})}
				changeRunFilter={props.changeRunFilter}
				runFilter={props.runFilter}
			/>
			<MonthRuns
				runs={filterRuns(props.runs, {year: props.runFilter.year})}
				changeRunFilter={props.changeRunFilter}
				runFilter={props.runFilter}
			/>
			<YearRuns
				runs={props.runs}
				changeRunFilter={props.changeRunFilter}
				runFilter={props.runFilter}
			/>
		</div>;
	}
}

export default Home;
