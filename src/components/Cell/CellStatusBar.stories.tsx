import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { CellStatusBar, CellStatusBarProps } from "./CellStatusBar"

export default {
  title: "Example/Cell/CellStatusBar",
  component: CellStatusBar,
  argTypes: {},
} as Meta

const Template: Story<CellStatusBarProps> = args => {
  const max = 5
  const currentArr = [...Array(max).keys()]

  return (
    <table className="table">
      <thead>
        <tr>
          <th>StatusBar</th>
        </tr>
      </thead>
      <tbody>
        {currentArr.map((element, index) => (
          <tr key={index}>
            <CellStatusBar
              {...args}
              max={max}
              current={element + 1}
              label={`currrent is:${element + 1}\nmax is:${max}`}
            />
          </tr>
        ))}
        <tr>end</tr>
      </tbody>
    </table>
  )
}

export const Basic = Template.bind({})
Basic.args = {}
