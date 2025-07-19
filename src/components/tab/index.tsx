import React from 'react'

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
};

const index = ({
    tabs,
    activeTab,
    setActiveTab,
    className
}: TabsProps) => {
    return (
        <div className={`mx-4 mt-4 mb-0 px-4 py-3 rounded bg-background ${className}`}>
            <div className="flex border-b border-gray-200 gap-4" style={{ borderColor: '#E5E7EB' }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`capitalize px-4 py-2 -mb-px border-b-2 transition-colors duration-300 ${activeTab === tab.key
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
    )
}

export default index
