import style from './style.scss';
import {Component} from "preact";
import RunStat from "../../components/runstat"

class List extends Component {
	constructor() {
		super();

		this.state = {
			runs: [],
		};
	}

	async componentDidMount() {
		const response = await fetch(`http://192.168.188.44:5001/api/run/read`);
		const json = await response.json();
		this.setState({runs: json});
	}

	async deleteRun(date) {
		let formData = new FormData();
		formData.append('date', date);

		await fetch('http://192.168.188.44:5001/api/run/delete', {
			method: "post",
			body: formData
		})

		const response = await fetch(`http://192.168.188.44:5001/api/run/read`);
		const json = await response.json();
		this.setState({runs: json });
	}

	render() {
		return <>
			<div class={style.list}>
				<table>
					<tbody>
					{this.state.runs.map((data, index) => {
						return <><tr>
							<td>{index + 1}</td>
							<td>
								<RunStat
									date={data[0]}
									distance={data[1]}
									duration={data[2]}
									pace={data[3]}
									calories={data[4]}
								/>
							</td>
							<td onclick={() => {
								this.deleteRun(data[0])
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
