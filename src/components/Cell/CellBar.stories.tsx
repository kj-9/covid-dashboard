import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { CellBar, CellBarProps } from "./CellBar"

export default {
  title: "Example/CellBar",
  component: CellBar,
  argTypes: {},
} as Meta

const Template: Story<CellBarProps> = args => {
  const range = [...Array(10).keys()]

  return (
    <table className="table">
      <thead>
        <tr>
          <th>value</th>
          <th>bar</th>
        </tr>
      </thead>
      <tbody>
        {range.map(element => (
          <tr>
            <td>{element * 0.1}</td>
            <CellBar value={0.1 * element} />
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const Basic = Template.bind({})
Basic.args = {}
