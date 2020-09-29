import style from './style.scss';
import {Component} from "preact";
import {Stat} from "../../components/comparestat"
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
			<Stat
				label={props.runs[0].date.format('dddd HH:mm:ss')}
				run={props.runs[0]}
			/>
			<Stat
				label={props.runs[1].date.format('dddd HH:mm:ss')}
				run={props.runs[1]}
			/>
			<Stat
				label={"Diese Woche"}
				run={combineRuns(getRunsBetween(props.runs, 'week'))}
			/>
			<Stat
				label={"Letzte Woche"}
				run={combineRuns(getRunsBetween(props.runs, 'week', -1))}
			/>
			<Stat
				label={dayjs().format('MMMM')}
				run={combineRuns(getRunsBetween(props.runs, 'month'))}
			/>
			<Stat
				label={dayjs().subtract(1, 'month').format('MMMM')}
				run={combineRuns(getRunsBetween(props.runs, 'month', -1))}
			/>
			<Stat
				label={dayjs().get('year')}
				run={combineRuns(getRunsBetween(props.runs, 'year'))}
			/>
			<Stat
				label={dayjs().subtract(1, 'year').get('year')}
				run={combineRuns(getRunsBetween(props.runs, 'year', -1))}
			/>
		</div>;
	}
}

export default Home;
