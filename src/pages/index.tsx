import React from "react"

import SimpleHorizontalBarsContainer from '../components/simpleHorizontalBarsContainer';
import SimpleDataScaler from '../components/simpleDataScaler'
import { SimpleDataType } from '../components/simpleData';


const data: SimpleDataType[] = [
  { x: "2019-01-01", y: 123 },
  { x: "2019-02-02", y: 123 },
  { x: "2019-03-03", y: 1223 },
  { x: "2019-04-04", y: 1213 },
]
const simpleDataScaler = new SimpleDataScaler(1000, 600, data, 'green');



export default function Home() {
  return <div>
    <SimpleHorizontalBarsContainer {...simpleDataScaler} />
  </div>
}

