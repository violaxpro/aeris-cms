import React from "react";
import { Steps, StepsProps } from "antd";

type StepItem = {
    title: string;
    description?: string;
    subTitle?: string;
    status?: "wait" | "process" | "finish" | "error";
};

type StepComponentProps = {
    items: StepItem[];
    current?: number;
} & StepsProps

const StepComponent: React.FC<StepComponentProps> = ({
    items,
    current = 0,
    ...props
}) => {
    return (
        <Steps
            current={current}
            items={items}
            {...props}
        />
    );
};

export default StepComponent;
