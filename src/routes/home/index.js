import style from './style.scss';
import {Component} from "preact";
import {CompareStat} from "../../components/comparestat"
import {combineRuns, getRunsBetween} from "../../helper/functions";
import dayjs from "dayjs";

function Legend() {
	return <>
		<div></div>
		<div>Läufe</div>
		<div>Pace (min/km)</div>
		<div>Strecke (km)</div>
		<div>Dauer</div>
	</>
}

class Home extends Component {
	render(props) {
		return <div class={style.home}>
			<Legend />
			<CompareStat
				labelCurrent={props.runs[0].date.format('dddd')}
				labelLast={props.runs[1].date.format('dddd')}
				currentRun={props.runs[0]}
				lastRun={props.runs[1]}
			/>
			<CompareStat
				labelCurrent={"Diese Woche"}
				labelLast={"Letzte Woche"}
				currentRun={combineRuns(getRunsBetween(props.runs, 'week'))}
				lastRun={combineRuns(getRunsBetween(props.runs, 'week', '-1'))}
			/>
			<CompareStat
				labelCurrent={dayjs().format('MMMM')}
				labelLast={dayjs().subtract(1, 'month').format('MMMM')}
				currentRun={combineRuns(getRunsBetween(props.runs, 'month'))}
				lastRun={combineRuns(getRunsBetween(props.runs, 'month', '-1'))}
			/>
			<CompareStat
				labelCurrent={dayjs().get('year')}
				labelLast={dayjs().subtract(1, 'year').get('year')}
				currentRun={combineRuns(getRunsBetween(props.runs, 'year'))}
				lastRun={combineRuns(getRunsBetween(props.runs, 'year', '-1'))}
			/>
		</div>;
	}
}

export default Home;
