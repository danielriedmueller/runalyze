import style from './style.scss';
import RunStat from "../../components/runstat"
import {combineRuns, durationToString, getAvgFromRuns, getRunsBetween} from "../../helper/functions";

export function CompareStat(props) {
    return <div class="compareStatView">
        <div>
            <div>{props.label}</div>
            <div>{props.currentRun.runs}</div>
            <div>{props.currentRun.distance}</div>
            <div>{props.currentRun.avgDistance}</div>
            <div>{durationToString(props.currentRun.duration)}</div>
            <div>{durationToString(props.currentRun.avgDuration)}</div>
        </div>
        <div>
            <div>{props.label} -1</div>
            <div>{props.lastRun.runs}</div>
            <RunStat
                distance={props.lastRun.distance}
                duration={props.lastRun.duration}
            />
            <div>{props.lastRun.avgDistance}</div>
            <div>{durationToString(props.lastRun.avgDuration)}</div>
        </div>
    </div>;
}

export function CompareStatView(props) {
    return <>
        <CompareStat
            label={"Woche"}
            currentRun={combineRuns(getRunsBetween(props.runs, 'week'))}
            lastRun={combineRuns(getRunsBetween(props.runs, 'week', '-1'))}
        />
    </>
}