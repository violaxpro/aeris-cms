import React from 'react';

type TabItem = {
    key: string;
    label: string;
    badgeCount?: number;
};

type ButtonTabProps = {
    tabs: TabItem[];
    activeKey: string;
    onTabClick: (key: string) => void;
};

const ButtonTab: React.FC<ButtonTabProps> = ({ tabs, activeKey, onTabClick }) => {
    return (
        <div className="flex gap-4 items-center">
            {tabs.map((tab) => {
                const isActive = activeKey === tab.key;
                return (
                    <button
                        key={tab.key}
                        onClick={() => onTabClick(tab.key)}
                        className={`px-3 py-1.5 rounded-md border transition-all ${isActive
                                ? 'bg-[#EEF2F7] text-[#2E5AAC] border-[#C8D3E0]'
                                : 'bg-transparent text-black border-transparent'
                            }`}
                    >
                        <div className="flex items-center gap-1 relative">
                            <span>{tab.label}</span>
                            {tab.badgeCount && tab.badgeCount > 0 && (
                                <span className="ml-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {tab.badgeCount}
                                </span>
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default ButtonTab;
``