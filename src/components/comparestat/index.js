import style from './style.css';
import {calcPace, durationToString} from "../../helper/functions";

export function Stat(props) {
    if (!props.run) {
        return <div>
            <div class={style.legend}>{props.label}</div>
            <div>0</div>
            <div>-</div>
            <div>-</div>
            <div>-</div>
        </div>;
    }

    if (props.run.runs) {
        return <div>
            <div class={style.legend}>{props.label}</div>
            <StatAttrAvg run={props.run} />
        </div>;
    }

    if (props.label) {
        return <div>
            <div class={style.legend}>{props.label}</div>
            <StatAttr run={props.run} />
        </div>
    }

    return <div>
        <StatAttr run={props.run} />
    </div>;
}

function StatAttr(props) {
    return <>
        <div class={style.date}>{props.run.date.format('dddd')}<br /><small>{props.run.date.format('YYYY-MM-DD HH:mm:ss')}</small></div>
        <div class={style.pace}>{calcPace(props.run.distance, props.run.duration)}</div>
        <div class={style.distance}>{props.run.distance}</div>
        <div class={style.duration}>{durationToString(props.run.duration)}</div>
    </>;
}

function StatAttrAvg(props) {
    return <>
        <div class={style.count}>{props.run.runs ?? 1}</div>
        <div class={style.pace}>{calcPace(props.run.distance, props.run.duration)}</div>
        <div class={style.distance}>{props.run.distance}<br /><small>{props.run.avgDistance}</small></div>
        <div class={style.duration}>{durationToString(props.run.duration)}<br /><small>{durationToString(props.run.avgDuration)}</small></div>
    </>;
}