import style from './style.css';
import {StatAttrAvg} from "../stattattravg";
import {combineRuns, getRunsInTimeRange} from "../../helper/functions";
import dayjs from "dayjs";
import React from "preact/compat";

export function MonthRuns(props) {
    const allMonths = () => {
        let months = [];

        const newestRunDate = props.runs[props.runs.length - 1].date;
        const year = newestRunDate.year();
        const currentYear = dayjs().year();

        const startMonth = year === currentYear ? newestRunDate.month() : 11;
        for (let i = startMonth; i > -1; i--) {
            months.push(<div
                onClick={() => props.changeRunFilter({month: i})}>
                <StatAttrAvg
                    label={dayjs().add(i + 1, 'month').format('MMMM')}
                    run={combineRuns(getRunsInTimeRange(props.runs, 'month', year, i))}
                    isActive={i === props.runFilter.month}
            /></div>)
        }
        return months;
    }

    return <div class={style.table}>{allMonths()}</div>;
}