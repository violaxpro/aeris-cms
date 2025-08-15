import { useState, useEffect } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { PlayIcon, StopIcon, PlayNextRoundedYellowIcon, PauseRoundedYellowIcon } from "@public/icon";
import { formatTime } from "@/plugins/utils/utils";
type TimerBoxProps = {
    seconds: number
    isRunning: boolean
    lastStatus?: string
    onPlay?: () => void;
};

export default function TimerBox({ isRunning = false, onPlay, seconds, lastStatus }: TimerBoxProps) {

    // Optional: If you want to increase time when play is pressed, add logic here
    const getIcon = () => {
        if (isRunning) {
            // Sedang jalan
            if (lastStatus === "start_break") {
                return PauseRoundedYellowIcon; // atau PauseRoundedYellowIcon kalau mau beda
            } if (lastStatus == 'finish_break') {
                return StopIcon
            }
            return PauseRoundedYellowIcon;
        } else {
            if (lastStatus == 'start_break') {
                return PlayNextRoundedYellowIcon
            }
            return PlayIcon; // default start
        }
    };


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
                    src={getIcon()}
                    alt="play-stop-icon"
                    className="cursor-pointer"
                    width={20}
                />
            </button>
        </div>
    );
}
