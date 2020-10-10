import style from './style.scss';
import {calcPace, durationToString} from "../../helper/functions";

export function Stat(props) {
    if (!props.run) {
        return <>
            <div class={style.legend}>{props.label}</div>
            <div>0</div>
            <div>-</div>
            <div>-</div>
            <div>-</div>
        </>;
    }

    if (props.run.runs) {
        return <>
            <div class={style.legend}>{props.label}</div>
            <StatAttrAvg run={props.run} />
        </>;
    }

    return <>
        <div class={style.legend}>{props.label}</div>
        <StatAttr run={props.run} />
    </>;
}

function StatAttr(props) {
    return <>
        <div class={style.monospace}>{props.run.date.format('dddd, YYYY-MM-DD HH:mm:ss')}</div>
        <div class={style.monospace}>{calcPace(props.run.distance, props.run.duration)}</div>
        <div class={style.monospace}>{props.run.distance}</div>
        <div class={style.monospace}>{durationToString(props.run.duration)}</div>
    </>;
}

function StatAttrAvg(props) {
    return <>
        <div class={style.monospace}>{props.run.runs ?? 1}</div>
        <div class={style.monospace}>{calcPace(props.run.distance, props.run.duration)}</div>
        <div>
            <div class={style.monospace}>{props.run.distance}</div>
            <div class={style.monospace}>&empty; {props.run.avgDistance}</div>
        </div>
        <div>
            <div class={style.monospace}>{durationToString(props.run.duration)}</div>
            <div class={style.monospace}>&empty; {durationToString(props.run.avgDuration)}</div>
        </div>
    </>;
}