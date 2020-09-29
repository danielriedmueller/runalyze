import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import List from '../routes/list';
import {Component} from "preact";
import {isValidRun, jsonToRuns} from "../helper/functions";
import dateformat from "dateformat";
import style from "../routes/home/style.scss";

class App extends Component {
	constructor() {
		super();

		this.state = {
			newRun: {
				distance: null,
				duration: null
			}
		};

		this.newRun = this.newRun.bind(this);
		this.deleteRun = this.deleteRun.bind(this);
	}

	async componentDidMount() {
		await this.fetchRuns();
	}

	async fetchRuns() {
		const response = await fetch(process.env.PREACT_APP_API_GET_RUNS);
		const json = await response.json();
		this.setState({runs: jsonToRuns(json)});
	}

	newRun(event) {
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

	async insertRun(newRun) {
		if (!isValidRun(newRun)) return;

		let formData = new FormData();
		formData.append('date', dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'));
		formData.append('distance', newRun.distance);
		formData.append('duration', newRun.duration);

		await fetch(process.env.PREACT_APP_API_INSERT_RUN, {
			method: "post",
			body: formData
		})

		await this.fetchRuns();
	}

	async deleteRun(date) {
		let formData = new FormData();
		formData.append('date', date);

		await fetch(process.env.PREACT_APP_API_DELETE_RUN, {
			method: "post",
			body: formData
		})

		await this.fetchRuns();
	}

	render() {
		if (!this.state.runs) return null;

		return <div id="app">
			<Header />
			<div class={style.button}>
				<label>
					Strecke
					<input name="distanceInput" value={this.state.newRun.distance} onChange={this.newRun} type="text"/>
				</label>
				<label>
					Dauer
					<input name="durationInput" value={this.state.newRun.duration} onChange={this.newRun} type="text"/>
				</label>
				<button onclick={() => {
					this.insertRun(this.state.newRun)
				}}>INSERT</button>
			</div>
			<Router>
				<Home path="/" runs={this.state.runs} />
				<List path="/list" runs={this.state.runs} deleteRun={this.deleteRun} />
			</Router>
		</div>
	}
}
export default App;
