import style from './style.css';
import {StatAttrAvg} from "../stattattravg";
import {combineRuns, getRunsInTimeRange} from "../../helper/functions";
import dayjs from "dayjs";
import React from "preact/compat";

export function WeekRuns(props) {
    const allWeeks = () => {
        let weeks = [];

        const newestRunDate = props.runs[props.runs.length - 1].date;
        const year = newestRunDate.year();

        let end = newestRunDate.week();
        const start = props.runs[0].date.week();

        if (end === 1 && start !== 1) {
            end = newestRunDate.isoWeeksInYear();
        }

        for (let i = end; i > start - 1; i--) {
            weeks.push(<div
                onClick={() => props.changeRunFilter({week: i})}>
                <StatAttrAvg
                    label={"KW " + i}
                    run={combineRuns(getRunsInTimeRange(props.runs, 'week', year, i))}
                    isActive={i === props.runFilter.week}
            /></div>)
        }
        return weeks;
    }

    return <div class={style.table}>{allWeeks()}</div>;
}