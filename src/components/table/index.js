import style from './style.css';
import {StatAttrAvg} from "../stattattravg";
import {combineRuns, getRunsInTimeRange} from "../../helper/functions";
import dayjs from "dayjs";
import React from "preact/compat";

export function Table(props) {

    const allWeeks = () => {
        let weeks = [];
        for (let i = dayjs().week(); i > 0; i--) {
            weeks.push(<StatAttrAvg
                label={"KW " + i}
                run={combineRuns(getRunsInTimeRange(props.runs, 'week', i))}
            />)
        }
        return weeks;
    }

    const allMonths = () => {
        let months = [];
        for (let i = dayjs().month(); i > -1; i--) {
            console.log(i);
            months.push(<StatAttrAvg
                label={dayjs().add(i + 1, 'month').format('MMMM')}
                run={combineRuns(getRunsInTimeRange(props.runs, 'month', i))}
            />)
        }
        return months;
    }

    const allYears = () => {
        let years = [];
        const firstYear = props.runs[0].date.year();
        const currentYear = dayjs().year();
        for (let i = currentYear; i > firstYear - 1; i--) {
            years.push(<StatAttrAvg
                label={i}
                run={combineRuns(getRunsInTimeRange(props.runs, 'year', i))}
            />)
        }
        return years;
    }

    return <>
        <div class={style.table}>{allWeeks()}</div>
        <div class={style.table}>{allMonths()}</div>
        <div class={style.table}>{allYears()}</div>
    </>;
}