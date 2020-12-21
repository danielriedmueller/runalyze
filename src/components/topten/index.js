import style from './style.css';
import {StatAttrAvg} from "../stattattravg";
import {combineRuns, getRunsInTimeRange} from "../../helper/functions";
import dayjs from "dayjs";
import React from "preact/compat";

export function YearRuns(props) {

    const topTenPerformance = () => {
        let years = [];
        const firstYear = props.runs[0].date.year();
        const currentYear = dayjs().year();
        for (let i = currentYear; i > firstYear - 1; i--) {
            years.push(<div
                onClick={() => props.changeRunFilter({year: i})}
                ><StatAttrAvg
                    label={i}
                    run={combineRuns(getRunsInTimeRange(props.runs, 'year', currentYear, i))}
                    isActive={i === props.runFilter.year}
            /></div>)
        }
        return years;
    }

    return <div class={style.table}>{topTenPerformance()}</div>;
}