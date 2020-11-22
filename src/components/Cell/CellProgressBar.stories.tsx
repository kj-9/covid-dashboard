import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { CellProgressBar, CellProgressBarProps } from "./CellProgressBar"

export default {
  title: "Example/Cell/CellProgressBar",
  component: CellProgressBar,
  argTypes: {},
} as Meta

const Template: Story<CellProgressBarProps> = args => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ProgressBar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <CellProgressBar {...args} label={`value is:${args.value}`} />
        </tr>
        <tr>end</tr>
      </tbody>
    </table>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  value: 0.5,
  range: 1,
}
