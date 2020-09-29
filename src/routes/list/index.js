import style from './style.scss';
import {Component} from "preact";
import RunStat from "../../components/runstat"
import {calcPace, stringToDuration} from "../../helper/functions";

class List extends Component {
	render(props) {
		return <>
			<div class={style.list}>
				<table>
					<tbody>
					{props.runs.map((run, index) => {
						return <><tr>
							<td>{index + 1}</td>
							<td>
								<RunStat run={run}/>
							</td>
							<td onclick={() => {
								props.deleteRun(run.date)
							}}>X</td>
						</tr></>;
					})}
					</tbody>
				</table>
			</div>
		</>;
	}
}

export default List;
