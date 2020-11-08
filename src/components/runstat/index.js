import style from './style.css';
import {calcPace, durationToString} from "../../helper/functions";

export default function Index(props) {
    return <div class={style.runstat}>
        <div>{props.run.date.format('YYYY-MM-DD, dddd')}</div>
        <div>{props.run.distance}</div>
        <div>{durationToString(props.run.duration)}</div>
        <div>{calcPace(props.run.distance, props.run.duration)}</div>
    </div>
}