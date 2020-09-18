import React from "react";
import { VictoryBar } from "victory";

export default function Bar(props) {
    let updatedProps = Object.assign(
        { 
            horizontal: true,
            alignment: "middle",
            domainPadding: {x:[10, 0]},
            height: 30,
            style: { data: { fill: "#c43a31" } } },
        props
    );

    return <VictoryBar {...updatedProps} />;
}
