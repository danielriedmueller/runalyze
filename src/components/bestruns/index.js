import style from './style.css';
import {Stat} from "../comparestat";
import {findFastestRun, findFurthestRun, findLongestRun} from "../../helper/functions";

export function BestRuns(props) {
    const furthestRun = findFurthestRun(props.runs, props.runFilter);
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
    </div>;
}

function getIsActiveClass(run, props) {
    if (run.date.isSame(props.currentRun.date)) {
        return props.graphMode + 'Active'
    }

    return null;
}