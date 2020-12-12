import style from "./style.css";
import {Component} from "preact";
import { PieChart } from 'react-minimal-pie-chart';
import {avgDayInWeekData} from "../../helper/piechart";

class AvgDayInWeek extends Component {
    constructor(props) {
        super();
    }

    render(props) {
        return (
            <PieChart
                label={({ dataEntry }) => dataEntry.value > 0 ? dataEntry.title : ""}
                data={avgDayInWeekData(props.runs)}
            />
        )
    }
}

export default AvgDayInWeek;