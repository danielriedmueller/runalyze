import style from "./style.css";
import {Component, createRef} from "preact";
import {calcPace, durationToString, stringToDuration} from "../../helper/functions";

class LineChart extends Component {
    constructor() {
        super();
        this.opacityLow = 0.4;
        this.graphs = ['pace', 'duration', 'distance'];
        this.ref = createRef()
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            currentX: null,
            graph: this.graphs[0],
            minMax: {
                pace: {
                    min: 240,
                    max: 480,
                },
                duration: {
                    min: 900,
                    max: 5400,
                },
                distance: {
                    min: 3,
                    max: 20,
                }
            }
        };
    }

    getSvgX(x) {
        const {svgWidth} = this.props
        return (x / this.count) * svgWidth
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

    normalize(val, minMax) {
        return (val - minMax.min) / (minMax.max - minMax.min);
    }

    makePacePath(runs) {
        const data = runs.map(this.getPaceData.bind(this));
        const isActive = this.state.graph === 'pace';

        return this.makePath(data, isActive);
    }

    makeDurationPath(runs) {
        const data = runs.map(this.getDurationData.bind(this));
        const isActive = this.state.graph === 'duration';

        return this.makePath(data, isActive);
    }

    makeDistancePath(runs) {
        const data = runs.map(this.getDistanceData.bind(this));
        const isActive = this.state.graph === 'distance';

        return this.makePath(data, isActive);
    }

    makeVerticalLine() {
        const {svgHeight} = this.props
        const x = this.getSvgX(this.state.currentX);

        return x ? <line x1={x} y1="0" x2={x} y2={svgHeight} opacity={this.opacityLow}/> : null;
    }

    getDistanceData(run, index) {
        return {
            x: index,
            y: this.normalize(run.distance, this.state.minMax.distance),
            date: run.date
        }
    }

    getPaceData(run, index) {
        const data = calcPace(run.distance, run.duration);

        return {
            x: index,
            y: this.normalize(stringToDuration(data).asSeconds(), this.state.minMax.pace),
            date: run.date
        };
    }

    getDurationData(run, index) {
        return {
            x: index,
            y: this.normalize(run.duration.asSeconds(), this.state.minMax.duration),
            date: run.date
        }
    }

    handleClick(evt) {
        const {svgWidth, runs, changeCurrentRun} = this.props
        const svg = this.ref.current;

        const pt = svg.createSVGPoint();
        pt.x = evt.clientX;

        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
        const xOrg = Math.floor(svgP.x / svgWidth * this.count);

        changeCurrentRun(runs[xOrg]);

        this.setState({currentX: xOrg})
    }

    render() {
        const {svgHeight, svgWidth, runs, changeCurrentRun} = this.props
        this.count = runs.length;

        return (
            <div class={style.chart}>
                <svg onclick={this.handleClick} ref={this.ref} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                    {this.makePacePath(runs)}
                    {this.makeDurationPath(runs)}
                    {this.makeDistancePath(runs)}
                    {this.makeVerticalLine()}
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