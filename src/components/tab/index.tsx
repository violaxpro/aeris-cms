import React, { useState, useRef, useEffect } from 'react'
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { ChevronRightIcon, ChevronLeftIcon } from '@public/icon';

export type Tab = {
    key: string;
    label: string;
    onClick?: () => void;
    count?: number
};

type TabsProps = {
    tabs: Tab[];
    activeTab: string;
    setActiveTab: (tabKey: string) => void;
    className?: string
    overflowClass?: string
    borderClass?: string
};

const index = ({
    tabs,
    activeTab,
    setActiveTab,
    className,
    overflowClass,
    borderClass
}: TabsProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        const container = scrollRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
        }
    };

    const scrollTabs = (direction: 'left' | 'right') => {
        const container = scrollRef.current;
        if (container) {
            const scrollAmount = 150;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            checkScroll();
            container.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
        }
        return () => {
            container?.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);
    return (
        <div className={`mx-4 mt-4 mb-0 px-4 py-3 rounded bg-background ${className}`}>
            {canScrollLeft && (
                <button
                    onClick={() => scrollTabs('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-[#EAF3FF] shadow rounded-full w-8 h-8"
                >
                    <LeftOutlined className='!text-[#3666AA]' />
                </button>
            )}

            <div
                ref={scrollRef}
                className={`relative z-10 flex overflow-x-auto scrollbar-none whitespace-nowrap ${overflowClass}`}>
                <div className={`flex justify-around items-center border-b border-gray-200 gap-6 ${borderClass}`} style={{ borderColor: '#E5E7EB' }}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            className={`capitalize px-6 py-2 -mb-px border-b-3 transition-colors duration-300 ${activeTab === tab.key
                                ? 'border-black text-gray-500'
                                : 'border-transparent text-gray-500 hover:text-gray-500'
                                }`}
                            onClick={() => {
                                setActiveTab(tab.key);
                                tab.onClick?.();
                            }}
                        >
                            {tab.label}
                            {typeof tab.count === 'number' && (
                                <span>
                                    ({tab.count})
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
            {canScrollRight && (
                <button
                    onClick={() => scrollTabs('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#EAF3FF] shadow rounded-full w-8 h-8"
                >
                    <RightOutlined className='!text-[#3666AA]' />
                </button>
            )}
        </div>
    )
}

export default index
