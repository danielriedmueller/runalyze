import style from './style.scss';
import {Component} from "preact";
import dateformat from "dateformat";
import {
	isValidRun
} from "../../helper/functions";
import {CompareStatView} from "../../components/comparestat"

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

	async insertRun(newRun) {
		if (!isValidRun(newRun)) return;

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
			<CompareStatView runs={this.state.runs} />
		</>;
	}
}

export default Home;
