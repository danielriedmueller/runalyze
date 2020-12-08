import { Router } from 'preact-router';

import Header from './header';

import Home from '../routes/home';
import List from '../routes/list';
import {Component} from "preact";
import {filterRuns, isValidRun, jsonToRuns} from "../helper/functions";
import dateformat from "dateformat";
import {Subheader} from "./subheader";

class App extends Component {
	constructor() {
		super();

		this.state = {
			newRun: {
				distance: null,
				duration: null
			},
			currentRun: null,
			graphMode: 'pace',
			runFilter: {
				year: null,
				month: null,
				week: 8
			}
		};

		this.deleteRun = this.deleteRun.bind(this);
		this.onChange = this.onChange.bind(this);
		this.insertRun = this.insertRun.bind(this);
		this.changeCurrentRun = this.changeCurrentRun.bind(this);
		this.changeRunFilter = this.changeRunFilter.bind(this);
		this.changeGraphMode = this.changeGraphMode.bind(this);
	}

	async componentDidMount() {
		await this.fetchRuns();
	}

	async fetchRuns() {
		const response = await fetch(process.env.PREACT_APP_API_GET_RUNS);
		const json = await response.json();
		const runs = jsonToRuns(json)
		const currentRun = runs[0];
		this.setState({
			runs: runs.reverse(),
			currentRun: currentRun
		});
	}

	onChange(event) {
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

	changeCurrentRun(run, graphMode) {
		this.setState({
			currentRun: run,
			graphMode: graphMode ? graphMode : this.state.graphMode
		});
	}

	changeGraphMode(graphMode) {
		this.setState({
			graphMode: graphMode
		});
	}

	changeRunFilter(filter) {
		this.setState({
			runFilter: filter
		});
	}

	async insertRun(newRun) {
		if (!isValidRun(newRun)) return;

		let formData = new FormData();
		formData.append('date', dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'));
		formData.append('distance', String(newRun.distance));
		formData.append('duration', newRun.duration);

		await fetch(process.env.PREACT_APP_API_INSERT_RUN, {
			method: "post",
			body: formData
		})

		await this.fetchRuns();
	}

	async deleteRun(date) {
		let formData = new FormData();
		formData.append('date', date.format(process.env.PREACT_APP_DB_DATE_FORMAT));

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
			<Subheader
				currentRun={this.state.currentRun}
				newRun={this.state.newRun}
				onChange={this.onChange}
				onInsert={this.insertRun}
				changeCurrentRun={this.changeCurrentRun}
				graphMode={this.state.graphMode}
			/>
			<Router>
				<Home
					path="/"
					runs={this.state.runs}
					filteredRuns={filterRuns(this.state.runs, this.state.runFilter)}
					changeCurrentRun={this.changeCurrentRun}
					changeGraphMode={this.changeGraphMode}
					currentRun={this.state.currentRun}
					graphMode={this.state.graphMode}
				/>
				<List path="/list" runs={this.state.runs} deleteRun={this.deleteRun} />
			</Router>
		</div>
	}
}
export default App;
