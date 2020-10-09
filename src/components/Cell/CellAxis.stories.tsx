import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { CellAxis, CellAxisProps } from "./CellAxis"

export default {
  title: "Example/Cell/CellAxis",
  component: CellAxis,
  argTypes: {},
} as Meta

const Template: Story<CellAxisProps> = args => (
  <table className="table">
    <thead>
      <tr>
        <CellAxis {...args} />
        <th>test</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>test</td>
        <td>test</td>
      </tr>
    </tbody>
  </table>
)

export const Basic = Template.bind({})
Basic.args = {}
