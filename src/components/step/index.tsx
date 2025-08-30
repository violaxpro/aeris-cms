import React from "react";
import { Steps, StepsProps } from "antd";

type StepItem = {
    title: string;
    description?: string;
    subTitle?: string;
    status?: "wait" | "process" | "finish" | "error";
    label?: string;
    date?: string;
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
            items={items.map((item) => ({
                ...item,
                title: (
                    <div className="flex flex-col">
                        {item.label && (
                            <span className="text-xs text-gray-500">{item.label}</span>
                        )}
                        {item.date && (
                            <span className="text-xs text-gray-500">{item.date}</span>
                        )}
                        <span className="text-base font-semibold">{item.title}</span>
                    </div>
                ),
                description: item.description,
            }))}
            labelPlacement="vertical"
            {...props}
        />
    );
};

export default StepComponent;
