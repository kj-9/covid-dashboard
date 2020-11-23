import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { CellStackBar, CellStackBarProps } from "./CellStackBar"

export default {
  title: "Example/Cell/CellStackBar",
  component: CellStackBar,
  argTypes: {},
} as Meta

const Template: Story<CellStackBarProps> = args => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>StackBar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <CellStackBar {...args} />
          </td>
        </tr>
        <tr>end</tr>
      </tbody>
    </table>
  )
}

export const Progress = Template.bind({})
Progress.args = {
  data: [
    { x: 1, y: 0.1, fill: "red", label: "hello" },
    { x: 1, y: 1, fill: "lightgrey", label: "hello" },
  ],
}

export const Status = Template.bind({})
Status.args = {
  data: [
    { x: 1, y: 1, fill: "white", label: "hello", strokeColor: "lightgrey" },
    { x: 1, y: 1, fill: "white", label: "hello", strokeColor: "lightgrey" },
    { x: 1, y: 1, fill: "lightgrey", label: "hello", strokeColor: "lightgrey" },
  ],
}
