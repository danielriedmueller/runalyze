import {calcPace, durationToString} from "../../helper/functions";

export function CompareStat(props) {
    if (!props.currentRun || !props.lastRun) {
        return <>
            <div>{props.labelCurrent}</div>
            <div>0</div>
            <div>&empty;</div>
            <div>&empty;</div>
            <div>&empty;</div>
            <div>{props.labelLast}</div>
            <div>0</div>
            <div>&empty;</div>
            <div>&empty;</div>
            <div>&empty;</div>
        </>;
    }

    if (props.currentRun.runs) {
        return <>
            <div>{props.labelCurrent}</div>
            <CompareStatAttrAvg run={props.currentRun} />
            <div>{props.labelLast}</div>
            <CompareStatAttrAvg run={props.lastRun} />
        </>;
    }

    return <>
        <div>{props.labelCurrent}</div>
        <CompareStatAttr run={props.currentRun} />
        <div>{props.labelLast}</div>
        <CompareStatAttr run={props.lastRun} />
    </>;
}

function CompareStatAttr(props) {
    return <>
        <div>1</div>
        <div>{calcPace(props.run.distance, props.run.duration)}</div>
        <div>{props.run.distance}</div>
        <div>{durationToString(props.run.duration)}</div>
    </>;
}

function CompareStatAttrAvg(props) {
    return <>
        <div>{props.run.runs ?? 1}</div>
        <div>
            <div>{calcPace(props.run.avgDistance, props.run.avgDuration)}</div>
            <div>{calcPace(props.run.distance, props.run.duration)}</div>
        </div>
        <div>
            <div>{props.run.distance}</div>
            <div>{props.run.avgDistance}</div>
        </div>
        <div>
            <div>{durationToString(props.run.duration)}</div>
            <div>{durationToString(props.run.avgDuration)}</div>
        </div>
    </>;
}