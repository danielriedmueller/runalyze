import style from './style.scss';
import RunStat from "../../components/runstat"
import {combineRuns, getRunsBetween} from "../../helper/functions";

export function CompareStat(props) {
    return <div>
        <div>
            <div>{props.label}</div>
            <div>{props.currentRun.runs}</div>
            <RunStat
                distance={props.currentRun.distance}
                duration={props.currentRun.duration}
                pace={props.currentRun.pace}
                calories={props.currentRun.calories}
            />
        </div>
        <div>
            <div>{props.label} -1</div>
            <div>{props.lastRun.runs}</div>
            <RunStat
                duration={props.lastRun.duration}
                pace={props.lastRun.pace}
                calories={props.lastRun.calories}
            />
        </div>
    </div>;
}

export function CompareStatView(props) {
    return <div>
        <CompareStat
            label={"Monat"}
            currentRun={combineRuns(getRunsBetween(props.runs, 'month'))}
            lastRun={combineRuns(getRunsBetween(props.runs, 'month', '-1'))}
        />
        <CompareStat
            label={"Woche"}
            currentRun={combineRuns(getRunsBetween(props.runs, 'week'))}
            lastRun={combineRuns(getRunsBetween(props.runs, 'week', '-1'))}
        />
        <CompareStat
            label={"Jahr"}
            currentRun={combineRuns(getRunsBetween(props.runs, 'year'))}
            lastRun={combineRuns(getRunsBetween(props.runs, 'year', '-1'))}
        />
    </div>
}