import style from './style.css';
import {Stat} from "../comparestat";
import {combineRuns, findFastestRun, findFurthestRun, findLongestRun, getRunsBetween} from "../../helper/functions";
import dayjs from "dayjs";

export function Table(props) {
    const furthestRun = findFurthestRun(props.runs);
    const longestRun = findLongestRun(props.runs);
    const fastestRun = findFastestRun(props.runs);

    return <div class={style.table}>
        <Stat
            label={"Weitester"}
            run={furthestRun}
            changeCurrentRun={props.changeCurrentRun}
            activeClass={getIsActiveClass(furthestRun, props)}
        />
        <Stat
            label={"Längster"}
            run={longestRun}
            changeCurrentRun={props.changeCurrentRun}
            activeClass={getIsActiveClass(longestRun, props)}
        />
        <Stat
            label={"Schnellster"}
            run={fastestRun}
            changeCurrentRun={props.changeCurrentRun}
            activeClass={getIsActiveClass(fastestRun, props)}
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

function getIsActiveClass(run, props) {
    if (run.date.isSame(props.currentRun.date)) {
        return props.graphMode + 'Active'
    }

    return null;
}