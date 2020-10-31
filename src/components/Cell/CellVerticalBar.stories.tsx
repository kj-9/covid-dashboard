import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { CellVerticalBar, CellVerticalBarProps } from "./CellVerticalBar"

export default {
  title: "Example/Cell/CellVerticalBar",
  component: CellVerticalBar,
  argTypes: {},
} as Meta

const Template: Story<CellVerticalBarProps> = args => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>value</th>
          <th>bar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <CellVerticalBar {...args} />
        </tr>
        <tr>
          <CellVerticalBar {...args} />
        </tr>
      </tbody>
    </table>
  )
}

export const Basic = Template.bind({})
const range = [...Array(12).keys()]

Basic.args = {
  data: range.map((v, i) => ({ x: i, y: v })),
}

const variousData = range.map(element => ({
  x: element,
  y: Math.random() ** 2,
}))

export const FixedDomain = Template.bind({})
FixedDomain.args = {
  domain: { y: [0, 1] },
  data: variousData,
}

export const VariableDomain = Template.bind({})
VariableDomain.args = {
  data: variousData,
}
