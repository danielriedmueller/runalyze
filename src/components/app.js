import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import List from '../routes/list';
import {Component} from "preact";
import {isValidRun} from "../helper/functions";
import dateformat from "dateformat";
import style from "../routes/home/style.scss";

class App extends Component {
	constructor() {
		super();

		this.state = {
			runs: [],
			newRun: {
				distance: null,
				duration: null
			}
		};

		this.newRun = this.newRun.bind(this);
		this.deleteRun = this.deleteRun.bind(this);
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

	async componentDidMount() {
		const response = await fetch(`http://192.168.188.44:5001/api/run/read`);
		const json = await response.json();
		this.setState({runs: json});
	}

	render() {
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
