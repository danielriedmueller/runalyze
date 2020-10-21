import style from './style.scss';

export function NewRunInput(props) {
    return <div class={style.newRun}>
        <label>
            <input
                name="distanceInput"
                value={props.newRun.distance || "0.0"}
                onChange={props.onChange}
                type="number"
            />
        </label>
        <label>
            <input
                name="durationInput"
                value={props.newRun.duration || "00:00"}
                onChange={props.onChange}
                type="text"
            />
        </label>
        <button onclick={() => {
            props.onInsert(props.newRun)
        }} />
    </div>;
}