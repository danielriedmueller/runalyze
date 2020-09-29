import style from './style.scss';
import {calcPace, durationToString} from "../../helper/functions";

export default function Index(props) {
    return <div class={style.runstat}>
        <div>{props.date}</div>
        <div>{props.distance}</div>
        <div>{durationToString(props.duration)}</div>
        <div>{calcPace(props.distance, props.duration)}</div>
    </div>
}