import style from './style.scss';
import {Stat} from "../comparestat";
import {combineRuns, findFastestRun, findFurthestRun, findLongestRun, getRunsBetween} from "../../helper/functions";
import dayjs from "dayjs";

export function Table(props) {
    return <div class={style.table}>
        <Legend />
        <Stat
            label={"Letzter"}
            run={props.runs[0]}
        />
        <Stat
            label={"Vorletzter"}
            run={props.runs[1]}
        />
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
            label={"Diese Woche"}
            run={combineRuns(getRunsBetween(props.runs, 'week'))}
        />
        <Stat
            label={"Letzte Woche"}
            run={combineRuns(getRunsBetween(props.runs, 'week', -1))}
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
            label={dayjs().get('year')}
            run={combineRuns(getRunsBetween(props.runs, 'year'))}
        />
        <Stat
            label={dayjs().subtract(1, 'year').get('year')}
            run={combineRuns(getRunsBetween(props.runs, 'year', -1))}
        />
    </div>;
}

function Legend() {
    return <>
        <div class={style.legend}></div>
        <div class={style.legend}>Datum / # Läufe</div>
        <div class={style.legend}>Pace (min/km)</div>
        <div class={style.legend}>Strecke (km)</div>
        <div class={style.legend}>Dauer</div>
    </>
}