import style from './style.css';
import {Stat} from "../comparestat";
import {combineRuns, findFastestRun, findFurthestRun, findLongestRun, getRunsBetween} from "../../helper/functions";
import dayjs from "dayjs";

export function Table(props) {
    return <div class={style.table}>
        <Stat
            label={"Weitester"}
            run={findFurthestRun(props.runs)}
        />
        <Stat
            label={"Längster"}
            run={findLongestRun(props.runs)}
        />
        <Stat
            label={"Schnellster"}
            run={findFastestRun(props.runs)}
        />
        <Stat
            label={"Woche"}
            run={combineRuns(getRunsBetween(props.runs, 'week'))}
        />
        <Stat
            label={"Woche -1"}
            run={combineRuns(getRunsBetween(props.runs, 'week', -1))}
        />
        <Stat
            label={"Woche -2"}
            run={combineRuns(getRunsBetween(props.runs, 'week', -2))}
        />
        <Stat
            label={dayjs().format('MMMM')}
            run={combineRuns(getRunsBetween(props.runs, 'month'))}
        />
        <Stat
            label={dayjs().subtract(1, 'month').format('MMMM')}
            run={combineRuns(getRunsBetween(props.runs, 'month', -1))}
        />
        <Stat
            label={dayjs().subtract(2, 'month').format('MMMM')}
            run={combineRuns(getRunsBetween(props.runs, 'month', -2))}
        />
        <Stat
            label={dayjs().get('year')}
            run={combineRuns(getRunsBetween(props.runs, 'year'))}
        />
        <Stat
            label={dayjs().subtract(1, 'year').get('year')}
            run={combineRuns(getRunsBetween(props.runs, 'year', -1))}
        />
        <Stat
            label={dayjs().subtract(2, 'year').get('year')}
            run={combineRuns(getRunsBetween(props.runs, 'year', -2))}
        />
    </div>;
}

function Legend() {
    return <>
        <div class={style.legend}></div>
        <div class={style.legend}>Datum / # Läufe</div>
        <div class={style.legend}>Pace (min/km)</div>
        <div class={style.legend}>Distanz (km) / &empty;</div>
        <div class={style.legend}>Dauer / &empty;</div>
    </>
}