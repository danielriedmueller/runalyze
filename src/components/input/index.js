import style from './style.css';
import {isValidRun} from "../../helper/functions";

export function NewRunInput(props) {
    return <div class={style.newRun}>
        <label>
            <input
                name="distanceInput"
                value={props.newRun.distance}
                onChange={props.onChange}
                type="number"
                placeholder={"0.0"}
            />
        </label>
        <label>
            <input
                name="durationInput"
                value={props.newRun.duration}
                onChange={props.onChange}
                type="text"
                placeholder={"00:00"}
            />
        </label>
        {isValidRun(props.newRun) ? <button onclick={() => {
            props.onInsert(props.newRun)
        }} /> : null}
    </div>;
}