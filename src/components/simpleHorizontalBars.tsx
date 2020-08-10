import React from 'react';
import { BarGroupHorizontal, Bar} from '@vx/shape';
import { Group } from '@vx/group';
import {SimpleDataType, SimpleKeyType, SimpleKey} from './simpleData'

export default function SimpleHorizontalBars({ data, y0, y0Scale, y1Scale, xScale, color, width }) {



    return <BarGroupHorizontal<SimpleDataType, SimpleKeyType>
        data={data}
        y0={y0}
        y0Scale={y0Scale}
        y1Scale={y1Scale}
        xScale={xScale}
        color={color}
        keys={SimpleKey}
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