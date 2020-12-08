import style from './style.css';
import {calcPace, durationToString} from "../../helper/functions";

export function StatAttr(props) {
    if (!props.run) {
        return <div>
            <div class={style.legend}>{props.label}</div>
            <div>0</div>
            <div>-</div>
            <div>-</div>
            <div>-</div>
        </div>;
    }

    return <div class={props.activeClass ? style[props.activeClass] : ""}>
        {props.label ? <div class={style.legend}>{props.label}</div> : null}
        <div className={style.date} onClick={() => props.changeCurrentRun(props.run)}>
            {props.run.date.format('dddd')}<br/><small>{props.run.date.format('YYYY-MM-DD HH:mm:ss')}</small>
        </div>
        <div className={style.pace} onClick={() => props.changeCurrentRun(props.run, 'pace')}>
            {calcPace(props.run.distance, props.run.duration)}
        </div>
        <div className={style.distance} onClick={() => props.changeCurrentRun(props.run, 'distance')}>
            {props.run.distance}
        </div>
        <div className={style.duration} onClick={() => props.changeCurrentRun(props.run, 'duration')}>
            {durationToString(props.run.duration)}
        </div>
    </div>
}