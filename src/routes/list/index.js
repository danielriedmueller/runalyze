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
					{props.runs.map((data, index) => {
						return <><tr>
							<td>{index + 1}</td>
							<td>
								<RunStat
									date={data[0]}
									distance={data[1]}
									duration={stringToDuration(data[2])}
									calories={data[4]}
								/>
							</td>
							<td onclick={() => {
								props.deleteRun(data[0])
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
