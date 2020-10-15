import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { Cell, CellProps } from "./Cell"

export default {
  title: "Example/Cell/Cell",
  component: Cell,
  argTypes: {},
} as Meta

const Template: Story<CellProps> = args => (
  <table className="table">
    <thead>
      <tr>
        <th>samplesample</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <Cell {...args} children={"test"} />
      </tr>
      <tr>
        <td>samplesample</td>
      </tr>
    </tbody>
  </table>
)

export const Basic = Template.bind({})
export const Left = Template.bind({})
Left.args = { textAlign: "left" }

export const Right = Template.bind({})
Right.args = { textAlign: "right" }

export const Styled = Template.bind({})
Styled.args = { cssObject: { backgroundColor: "red" } }

export const StyledRight = Template.bind({})
StyledRight.args = { textAlign: "right", cssObject: { backgroundColor: "red" } }

export const StyledRightWithClassName = Template.bind({})
StyledRightWithClassName.args = {
  textAlign: "right",
  className: "test",
  cssObject: { backgroundColor: "red" },
}
