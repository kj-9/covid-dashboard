import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { CellSparkline, CellSparklineProps } from "./CellSparkline"

export default {
  title: "Example/Cell/CellSparkline",
  component: CellSparkline,
  argTypes: {},
} as Meta

const Template: Story<CellSparklineProps> = args => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <CellSparkline {...args} />
          </td>
        </tr>
        <tr>
          <td>
            <CellSparkline {...args} />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

const range: number[] = [...Array(10).keys()]
export const Basic = Template.bind({})

Basic.args = {
  domain: { y: [0, 1] },
  scale: "linear",
  data: range.map(element => ({
    x: element,
    y: element * 0.1,
    label: `${element}`,
  })),
}

const variousData = range.map(element => ({
  x: element,
  y: element ** 2,
  label: `${element}`,
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
