import style from './style.scss';
import {Component} from "preact";
import {CompareStatView} from "../../components/comparestat"

class Home extends Component {
	render(props) {
		return <div class={style.home}>
			<CompareStatView runs={props.runs} />
		</div>;
	}
}

export default Home;
