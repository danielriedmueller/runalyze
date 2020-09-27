import style from './style.css';
import {Component, createRef} from "preact";
import dateformat from "dateformat";

class Home extends Component {
	constructor() {
		super();

		this.state = {
			runs: [],
			newRun: {
				distance: null,
				duration: null
			}
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		let newRun = {};
		if (event.target.name === "distanceInput") {
			newRun.distance = event.target.value;
			newRun.duration = this.state.newRun.duration;
		}
		if (event.target.name === "durationInput") {
			newRun.duration = event.target.value;
			newRun.distance = this.state.newRun.distance;
		}

		this.setState({newRun: newRun});
	}

	async componentDidMount() {
		const response = await fetch(`http://192.168.188.44:5001/api/run/read`);
		const json = await response.json();
		this.setState({runs: json});
	}

	calcPace = (distance, duration) => {
		const [seconds, minutes, hours] = duration.split(":").reverse().map(Number);
		const totalMinutes = (hours || 0) * 60 + minutes + seconds / 60;
		const pace = totalMinutes / distance;

		return pace.toFixed(2);
	}

	async insertRun(newRun) {
		if (!newRun.distance || !newRun.duration) return;

		let formData = new FormData();
		formData.append('date', dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'));
		formData.append('distance', newRun.distance);
		formData.append('duration', newRun.duration);

		await fetch('http://192.168.188.44:5001/api/run/insert', {
			method: "post",
			body: formData
		})

		const response = await fetch(`http://192.168.188.44:5001/api/run/read`);
		const json = await response.json();
		this.setState({runs: json });
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
			<div class={style.button}>
				<label>
					Strecke
					<input name="distanceInput" value={this.state.newRun.distance} onChange={this.handleChange} type="text"/>
				</label>
				<label>
					Dauer
					<input name="durationInput" value={this.state.newRun.duration} onChange={this.handleChange} type="text"/>
				</label>
				<button onclick={() => {
					this.insertRun(this.state.newRun)
				}}>INSERT</button>
			</div>
			<div class={style.home}>
				<table>
					<thead>
					<tr>
						<th>Nr.</th>
						<th>Datum</th>
						<th>Strecke</th>
						<th>Dauer</th>
						<th>Pace</th>
						<th>Kalorien</th>
					</tr>
					</thead>
					<tbody>
					{this.state.runs.map((data, index) => {
						return <><tr>
							<td>{index + 1}</td>
							<td>{data[0]}</td>
							<td>{data[1]}</td>
							<td>{data[2]}</td>
							<td>{data[3]}</td>
							<td>{data[4]}</td>
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

export default Home;
