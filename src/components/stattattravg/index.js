import style from './style.css';
import {calcPace, durationToString} from "../../helper/functions";

export function StatAttrAvg(props) {
    if (!props.run) {
        return <div>
            <div className={props.isActive ? style.activeLegend : style.legend}>{props.label}</div>
            <div class={style.count}>0</div>
            <div class={style.pace}>-</div>
            <div class={style.distance}>-</div>
            <div class={style.duration}>-</div>
        </div>;
    }

    return <div>
        <div className={props.isActive ? style.activeLegend : style.legend}>{props.label}</div>
        <div class={style.count}>{props.run.runs ?? 1}</div>
        <div class={style.pace}>{calcPace(props.run.distance, props.run.duration)}</div>
        <div class={style.distance}>{props.run.distance}<br /><small>{props.run.avgDistance}</small></div>
        <div class={style.duration}>{durationToString(props.run.duration)}<br /><small>{durationToString(props.run.avgDuration)}</small></div>
    </div>;
}