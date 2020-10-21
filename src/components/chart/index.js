import style from "./style.scss";
import {Component} from "preact";
import {calcPace, durationToString, stringToDuration} from "../../helper/functions";

class LineChart extends Component {
    constructor() {
        super();
        this.opacityLow = 0.4;
        this.graphs = ['pace', 'duration', 'distance'];
        this.state = {
            'graph': this.graphs[0],
            'minMax': {
                'pace': {
                    min: 240,
                    minLabel: '04:00 min/km',
                    max: 480,
                    maxLabel: '08:00 min/km'
                },
                'duration': {
                    min: 900,
                    minLabel: '00:00:15',
                    max: 5400,
                    maxLabel: '01:30:00'
                },
                'distance': {
                    min: 3,
                    minLabel: '3 km',
                    max: 20,
                    maxLabel : '20 km'
                }
            }
        };
    }

    getSvgX(x) {
        const {svgWidth} = this.props
        return (x / this.count) * svgWidth - 25
    }

    getSvgY(y) {
        const {svgHeight} = this.props
        return svgHeight - y * svgHeight
    }

    makePath(data, isActive) {
        let pathD = ` M  ${this.getSvgX(data[0].x)} ${this.getSvgY(data[0].y)} `
        pathD += data.map((point, i) => {
            const x = this.getSvgX(point.x);
            const y = this.getSvgY(point.y);
            return `L ${x} ${y}`
        })

        return <>
            <path class={style.linechart_path} d={pathD} opacity={isActive ? 1 : this.opacityLow}/>
        </>
    }

    filterLabel(value, index, ar) {
        return index > 10 && (index % 10 === 0 || index === ar.length -1);
    }

    makeLabel(data, textPosY, isActive) {
        return <>
            <text
                opacity={isActive ? 1 : 0.4}
                x={this.getSvgX(data.x) - 20}
                y={textPosY}>{data.label}
            </text>
            <text
                opacity={isActive ? 1 : 0.4}
                x={this.getSvgX(data.x) - 20}
                y={50}>{data.date.format('YY-MM-DD')}
            </text>
            {isActive ? <circle
                r={2}
                cx={this.getSvgX(data.x)}
                cy={this.getSvgY(data.y)}
            /> : null }
        </>
    }

    makeLabelTitle(title, labelYPos, isActive) {
        return <text
            opacity={isActive ? 1 : 0.4}
            x={0}
            y={labelYPos}>{title}
        </text>
    }

    normalize(val, minMax) {
        return (val - minMax.min) / (minMax.max - minMax.min);
    }

    makePacePath(runs) {
        const data = runs.map(this.getPaceData.bind(this));
        const isActive = this.state.graph === 'pace';
        const labelYPos = 30;

        return <>
            {this.makePath(data, isActive)}
            {this.makeLabelTitle("Pace", labelYPos, isActive)}
            {data.filter(this.filterLabel).map(point => this.makeLabel(point, labelYPos, isActive))}
        </>;
    }

    makeDurationPath(runs) {
        const data = runs.map(this.getDurationData.bind(this));
        const isActive = this.state.graph === 'duration';
        const labelYPos = 40;

        return <>
            {this.makePath(data, isActive)}
            {this.makeLabelTitle("Duration", labelYPos, isActive)}
            {data.filter(this.filterLabel).map(point => this.makeLabel(point, 40, isActive))}
        </>;
    }

    makeDistancePath(runs) {
        const data = runs.map(this.getDistanceData.bind(this));
        const isActive = this.state.graph === 'distance';
        const labelYPos = 20;

        return <>
            {this.makePath(data, isActive)}
            {this.makeLabelTitle("Distanz   ", labelYPos, isActive)}
            {data.filter(this.filterLabel).map(point => this.makeLabel(point, 20, isActive))}
        </>;
    }

    getDistanceData(run, index) {
        return {
            x: index,
            y: this.normalize(run.distance, this.state.minMax.distance),
            label: run.distance,
            date: run.date
        }
    }

    getPaceData(run, index) {
        const data = calcPace(run.distance, run.duration);

        return {
            x: index,
            y: this.normalize(stringToDuration(data).asSeconds(), this.state.minMax.pace),
            label: data,
            date: run.date
        };
    }

    getDurationData(run, index) {
        return {
            x: index,
            y: this.normalize(run.duration.asSeconds(), this.state.minMax.duration),
            label: durationToString(run.duration),
            date: run.date
        }
    }

    getAxisValues() {
        const minMax = this.state.minMax[this.state.graph];

        return <>
            <text
                 x={0}
                 y={this.getSvgY(0)}
                 font-size="3">{minMax.minLabel}
            </text>
            <text
                x={0}
                y={this.getSvgY(1)}
                font-size="3">{minMax.maxLabel}
            </text>
        </>
    }

    changeGraph() {
        if (this.state.graph === this.graphs[0]) {
            this.setState({graph: this.graphs[1]})
        }

        if (this.state.graph === this.graphs[1]) {
            this.setState({graph: this.graphs[2]})
        }

        if (this.state.graph === this.graphs[2]) {
            this.setState({graph: this.graphs[0]})
        }
    }

    render() {
        const {svgHeight, svgWidth, runs} = this.props
        this.count = runs.length;

        return (
            <div onclick={this.changeGraph.bind(this)} class={style.chart}>
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                    {this.makeLabelTitle('Datum', 50, true)}
                    {this.makePacePath(runs)}
                    {this.makeDurationPath(runs)}
                    {this.makeDistancePath(runs)}
                </svg>
            </div>
        )
    }
}

LineChart.defaultProps = {
    data: [],
    color: '#ff4500',
    svgHeight: 200,
    svgWidth: 600,
}

export default LineChart;