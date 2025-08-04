import React from 'react';
import { Progress, ProgressProps } from 'antd';

type ProgressPropsType = {
    completed: number
    total: number
    isShowLabelProgress?: boolean
} & ProgressProps
const index = ({
    completed,
    total,
    isShowLabelProgress = true,
    ...props
}: ProgressPropsType) => {
    const percent = (completed / total) * 100;

    return (
        <div style={{ position: 'relative', width: 300 }}>
            <Progress
                percent={percent}
                showInfo={false}
                trailColor="#E5E5E5"
                percentPosition={{ align: 'center', type: 'inner' }}
                {...props}
            />
            {
                isShowLabelProgress && <div className={`absolute top-[40%] text-white text-xs font-bold`}
                    style={{
                        transform: 'translate(-50%, -50%)',
                        left: `${percent / 2}%`,
                    }}>
                    {completed}
                </div>
            }

        </div>
    );
};

export default index;