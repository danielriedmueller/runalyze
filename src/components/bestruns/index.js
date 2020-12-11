import style from './style.css';
import {findFastestRun, findFurthestRun, findLongestRun} from "../../helper/functions";
import React from "preact/compat";
import {StatAttr} from "../statattr";

export function BestRuns(props) {
    const runCount = props.runs.length;
    const furthestRun = runCount > 0 ? findFurthestRun(props.runs, props.runFilter) : null;
    const longestRun = runCount > 0 ? findLongestRun(props.runs) : null;
    const fastestRun = runCount > 0 ? findFastestRun(props.runs) : null;

    return <div class={style.table}>
        <StatAttr
            label={"Weitester"}
            run={furthestRun}
            changeCurrentRun={props.changeCurrentRun}
            activeClass={getIsActiveClass(furthestRun, props)}
        />
        <StatAttr
            label={"Längster"}
            run={longestRun}
            changeCurrentRun={props.changeCurrentRun}
            activeClass={getIsActiveClass(longestRun, props)}
        />
        <StatAttr
            label={"Schnellster"}
            run={fastestRun}
            changeCurrentRun={props.changeCurrentRun}
            activeClass={getIsActiveClass(fastestRun, props)}
        />
    </div>;
}

function getIsActiveClass(run, props) {
    if (run && run.date.isSame(props.currentRun.date)) {
        return props.graphMode + 'Active'
    }

    return null;
}