import style from './style.css';
import {NewRunInput} from "../input";
import React from "preact/compat";
import {StatAttr} from "../statattr";

export function Subheader(props) {
	return <div class={style.subheader}>
		<div class={style.currentRun}>
			<StatAttr
				class={props.graphMode}
				run={props.currentRun}
				changeCurrentRun={props.changeCurrentRun}
				activeClass={props.graphMode + 'Active'}
			/>
		</div>
		<NewRunInput
			newRun={props.newRun}
			onChange={props.onChange}
			onInsert={props.onInsert}
		/>
	</div>;
}
