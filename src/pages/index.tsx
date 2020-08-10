import React from "react"

import SimpleHorizontalBars from '../components/simpleHorizontalBars';
import SimpleDataScaler from '../components/simpleDataScaler'
import { SimpleDataType } from '../components/simpleData';
import { timeParse, timeFormat } from 'd3-time-format';

const data: SimpleDataType[] = [
  { x: "2019-01-01", y: 123 },
  { x: "2019-02-02", y: 123 },
  { x: "2019-03-03", y: 1223 },
  { x: "2019-04-04", y: 1213 },
]

const axisColor = '#e5fd3d';
const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');
const formatDate = (date: string) => format(parseDate(date) as Date);

const simpleDataScaler = new SimpleDataScaler(1000, 600, data, 'green', axisColor, formatDate);



export default function Home() {
  return <div>
    <SimpleHorizontalBars {...simpleDataScaler} />
  </div>
}

