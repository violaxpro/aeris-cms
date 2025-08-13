import { useState, useEffect } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { PlayIcon, StopIcon } from "@public/icon";
import { formatTime } from "@/plugins/utils/utils";
type TimerBoxProps = {
    seconds: number
    isRunning: boolean
    onPlay?: () => void;
};

export default function TimerBox({ isRunning = false, onPlay, seconds }: TimerBoxProps) {

    // Optional: If you want to increase time when play is pressed, add logic here


    return (
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm h-10 px-2 w-fit">
            {/* Time Text */}
            <span className="font-mono text-md">{formatTime(seconds)}</span>

            {/* Play Button */}

            <button
                onClick={onPlay}
                className="flex items-center justify-center w-8 h-8 rounded-full  text-white"
            >
                <Image
                    src={!isRunning ? PlayIcon : StopIcon}
                    alt="play-stop-icon"
                    className="cursor-pointer"
                    width={20}
                />
            </button>
        </div>
    );
}
