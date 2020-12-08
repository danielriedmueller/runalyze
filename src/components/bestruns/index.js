import style from './style.css';
import {findFastestRun, findFurthestRun, findLongestRun} from "../../helper/functions";
import React from "preact/compat";
import {StatAttr} from "../statattr";

export function BestRuns(props) {
    const furthestRun = findFurthestRun(props.runs, props.runFilter);
    const longestRun = findLongestRun(props.runs);
    const fastestRun = findFastestRun(props.runs);

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
    if (run.date.isSame(props.currentRun.date)) {
        return props.graphMode + 'Active'
    }

    return null;
}