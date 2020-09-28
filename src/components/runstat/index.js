import style from './style.scss';

export default function Index(props) {
    return <div class={style.runstat}>
        <div>{props.date}</div>
        <div>{props.distance}</div>
        <div>{props.duration}</div>
        <div>{props.pace}</div>
        <div>{props.calories}</div>
    </div>
}