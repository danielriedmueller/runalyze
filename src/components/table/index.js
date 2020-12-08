import style from './style.css';
import {Stat} from "../comparestat";
import {combineRuns, getRunsInTimeRange} from "../../helper/functions";
import dayjs from "dayjs";

export function Table(props) {
    return <div class={style.table}>
        <Stat
            label={"Woche"}
            run={combineRuns(getRunsInTimeRange(props.runs, 'week'))}
        />
        <Stat
            label={"Woche -1"}
            run={combineRuns(getRunsInTimeRange(props.runs, 'week', -1))}
        />
        <Stat
            label={"Woche -2"}
            run={combineRuns(getRunsInTimeRange(props.runs, 'week', -2))}
        />
        <Stat
            label={dayjs().format('MMMM')}
            run={combineRuns(getRunsInTimeRange(props.runs, 'month'))}
        />
        <Stat
            label={dayjs().subtract(1, 'month').format('MMMM')}
            run={combineRuns(getRunsInTimeRange(props.runs, 'month', -1))}
        />
        <Stat
            label={dayjs().subtract(2, 'month').format('MMMM')}
            run={combineRuns(getRunsInTimeRange(props.runs, 'month', -2))}
        />
        <Stat
            label={dayjs().get('year')}
            run={combineRuns(getRunsInTimeRange(props.runs, 'year'))}
        />
        <Stat
            label={dayjs().subtract(1, 'year').get('year')}
            run={combineRuns(getRunsInTimeRange(props.runs, 'year', -1))}
        />
        <Stat
            label={dayjs().subtract(2, 'year').get('year')}
            run={combineRuns(getRunsInTimeRange(props.runs, 'year', -2))}
        />
    </div>;
}