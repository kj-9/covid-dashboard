import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { getX, SimpleDataType, SimpleKey } from './simpleData'


const defaultMargin = { top: 25, right: 20, bottom: 20, left: 70 };

function max<D>(arr: D[], fn: (d: D) => number) {
    return Math.max(...arr.map(fn));
}

export default class SimpleDataScaler {
    width: number;
    height: number;
    margin = defaultMargin;
    data: SimpleDataType[];
    getX = getX;
    y0Scale;
    y1Scale;
    xScale;
    colorScale;
    axisColor: string;
    tickFormat;
    xMax: number;
    yMax: number;

    constructor(width:number, height:number, data:SimpleDataType[], barColor: string, axisColor: string, tickFormat) {
        this.width = width;
        this.height = height;
        this.data = data;
        this.axisColor = axisColor;
        this.tickFormat = tickFormat

        // setup scales
        this.y0Scale = scaleBand<string>({
            domain: data.map(getX),
            padding: 0.05,
        });
        this.y1Scale = scaleBand<string>({
            domain: SimpleKey,
            padding: 0.3,
        });
        this.xScale = scaleLinear<number>({
            domain: [0, max(data, d => max(SimpleKey, key => Number(d[key])))],
        });

        this.colorScale = scaleOrdinal<string, string>({
            domain: SimpleKey,
            range: [barColor],
        });

        // calc values
        this.xMax = width - this.margin.left - this.margin.right;
        this.yMax = height - this.margin.top - this.margin.bottom;

        // reset scalers
        this.y0Scale.rangeRound([0, this.yMax]);
        this.y1Scale.rangeRound([0, this.y0Scale.bandwidth()]);
        this.xScale.rangeRound([0, this.xMax]);
    }
}
