import style from './style.css';
import {Stat} from "../comparestat";
import {NewRunInput} from "../input";

export function Subheader(props) {
	return <div class={style.subheader}>
		<div class={style.currentRun}>
			<Stat run={props.currentRun}/>
		</div>
		<NewRunInput
			newRun={props.newRun}
			onChange={props.onChange}
			onInsert={props.insertRun}
		/>
	</div>;
}
