import style from "./style.css";
import {Component} from "preact";
import { PieChart } from 'react-minimal-pie-chart';
import {avgDayInWeekData, avgHourData} from "../../helper/piechart";

class AvgHour extends Component {
    constructor(props) {
        super();
    }

    render(props) {
        return (
            <PieChart
                label={({ dataEntry }) => dataEntry.value > 0 ? dataEntry.title : ""}
                data={avgHourData(props.runs)}
            />
        )
    }
}

export default AvgHour;