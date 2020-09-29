import style from './style.scss';
import {calcPace, durationToString} from "../../helper/functions";

export default function Index(props) {
    return <div class={style.runstat}>
        <div>{props.run.date}</div>
        <div>{props.run.distance}</div>
        <div>{durationToString(props.run.duration)}</div>
        <div>{calcPace(props.distance, props.duration)}</div>
    </div>
}