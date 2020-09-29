import {calcPace, durationToString} from "../../helper/functions";

export function Stat(props) {
    if (!props.run) {
        return <>
            <div>{props.label}</div>
            <div>0</div>
            <div>-</div>
            <div>-</div>
            <div>-</div>
        </>;
    }

    if (props.run.runs) {
        return <>
            <div>{props.label}</div>
            <StatAttrAvg run={props.run} />
        </>;
    }

    return <>
        <div>{props.label}</div>
        <StatAttr run={props.run} />
    </>;
}

function StatAttr(props) {
    return <>
        <div>{props.run.date.format('dddd, YYYY-MM-DD HH:mm:ss')}</div>
        <div>{calcPace(props.run.distance, props.run.duration)}</div>
        <div>{props.run.distance}</div>
        <div>{durationToString(props.run.duration)}</div>
    </>;
}

function StatAttrAvg(props) {
    return <>
        <div>{props.run.runs ?? 1}</div>
        <div>{calcPace(props.run.distance, props.run.duration)}</div>
        <div>
            <div>{props.run.distance}</div>
            <div>&empty; {props.run.avgDistance}</div>
        </div>
        <div>
            <div>{durationToString(props.run.duration)}</div>
            <div>&empty; {durationToString(props.run.avgDuration)}</div>
        </div>
    </>;
}