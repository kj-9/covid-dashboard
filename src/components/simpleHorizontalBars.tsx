import React from 'react';
import { BarGroupHorizontal, Bar} from '@vx/shape';
import { Group } from '@vx/group';


type dataType = {
    x: string;
    y: number;
}

const data: dataType[] = [
    { x: "2019-01-01", y: 123 },
    { x: "2019-02-02", y: 123 },
    { x: "2019-03-03", y: 1223 },
    { x: "2019-04-04", y: 1213 },

]

type keyTypeY = 'y';
const keys = ['y'] as keyTypeY[];

export default function SimpleHorizontalBars({ data, y0, y0Scale, y1Scale, xScale, color, width }) {

    return <BarGroupHorizontal<dataType, keyTypeY>
        data={data}
        y0={y0}
        y0Scale={y0Scale}
        y1Scale={y1Scale}
        xScale={xScale}
        color={color}
        keys={keys}
        width={width}
    >
        {barGroups =>
            barGroups.map(barGroup => (
                <Group
                    key={`bar-group-horizontal-${barGroup.index}-${barGroup.y0}`}
                    top={barGroup.y0}
                >
                    {barGroup.bars.map(bar => (
                        <Bar
                            key={`${barGroup.index}-${bar.index}-${bar.key}`}
                            x={bar.x}
                            y={bar.y}
                            width={bar.width}
                            height={bar.height}
                            fill={bar.color}
                            rx={4}
                        />
                    ))}
                </Group>
            ))
        }
    </BarGroupHorizontal>
}