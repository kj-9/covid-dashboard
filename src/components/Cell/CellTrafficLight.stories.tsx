import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { CellTrafficLight, CellTrafficLightProps } from "./CellTrafficLight"

export default {
  title: "Example/Cell/CellTrafficLight",
  component: CellTrafficLight,
  argTypes: {},
} as Meta

const Template: Story<CellTrafficLightProps> = args => {
  const max = 5
  const currentArr = [...Array(max + 1).keys()]

  return (
    <table className="table">
      <thead>
        <tr>
          <th>TrafficLight</th>
        </tr>
      </thead>
      <tbody>
        {currentArr.map(element => (
          <tr>
            <CellTrafficLight {...args} max={max} current={element} />
          </tr>
        ))}
        <tr>end</tr>
      </tbody>
    </table>
  )
}

export const Basic = Template.bind({})
Basic.args = {}
