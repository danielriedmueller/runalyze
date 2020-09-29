import style from './style.scss';
import RunStat from "../../components/runstat"
import {calcPace, combineRuns, durationToString, getAvgFromRuns, getRunsBetween} from "../../helper/functions";
import dayjs from "dayjs";

export function CompareStat(props) {
    return <>
        <div>{props.labelCurrent}</div>
        <CompareStatAttr run={props.currentRun} />
        <div>{props.labelLast}</div>
        <CompareStatAttr run={props.lastRun} />
    </>;
}

function CompareStatAttr(props) {
    return <>
        <div>{'runs' in props.run ?? props.runs.run}</div>
        <div>{calcPace(props.run.avgDistance, props.run.avgDuration)}</div>
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

function Legend() {
    return <>
            <div></div>
            <div>Läufe</div>
            <div>Pace (min/km)</div>
            <div>Strecke (km)</div>
            <div>Dauer</div>
        </>
}

export function CompareStatView(props) {
    return <div class={style.compareStatView}>
        <Legend />
        <CompareStat
            labelCurrent={"Diese Woche"}
            labelLast={"Letzte Woche"}
            currentRun={props.runs[0]}
            lastRun={props.runs[1]}
        />
        <CompareStat
            labelCurrent={"Diese Woche"}
            labelLast={"Letzte Woche"}
            currentRun={combineRuns(getRunsBetween(props.runs, 'week'))}
            lastRun={combineRuns(getRunsBetween(props.runs, 'week', '-1'))}
        />
        <CompareStat
            labelCurrent={dayjs().format('MMMM')}
            labelLast={dayjs().subtract(1, 'month').format('MMMM')}
            currentRun={combineRuns(getRunsBetween(props.runs, 'month'))}
            lastRun={combineRuns(getRunsBetween(props.runs, 'month', '-1'))}
        />
        <CompareStat
            labelCurrent={dayjs().get('year')}
            labelLast={dayjs().subtract(1, 'year').get('year')}
            currentRun={combineRuns(getRunsBetween(props.runs, 'year'))}
            lastRun={combineRuns(getRunsBetween(props.runs, 'year', '-1'))}
        />
    </div>
}