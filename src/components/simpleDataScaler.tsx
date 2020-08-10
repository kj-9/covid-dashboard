import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { getX, SimpleDataType, SimpleKey } from './simpleData'


const defaultMargin = { top: 20, right: 20, bottom: 20, left: 50 };
const blue = '#aeeef8';
export const green = '#e5fd3d';
const purple = '#9caff6';

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
    xMax: number;
    yMax: number;

    constructor(width:number, height:number, data:SimpleDataType[]) {
        this.width = width;
        this.height = height;
        this.data = data;

        // setup scales
        this.y0Scale = scaleBand<string>({
            domain: data.map(getX),
            padding: 0.2,
        });
        this.y1Scale = scaleBand<string>({
            domain: SimpleKey,
            padding: 0.1,
        });
        this.xScale = scaleLinear<number>({
            domain: [0, max(data, d => max(SimpleKey, key => Number(d[key])))],
        });

        this.colorScale = scaleOrdinal<string, string>({
            domain: SimpleKey,
            range: [blue, green, purple],
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
