'use client'

import React from 'react';
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type LineAreaChartProps = {
    data: number[];
    categories: string[];
    totalTimeText?: string;
    color?: any
};

const LineAreaChart: React.FC<LineAreaChartProps> = ({
    data,
    categories,
    totalTimeText = '',
    color = '#3666AA',
}) => {
    // Mencari index dengan nilai tertinggi
    const maxIndex = data.indexOf(Math.max(...data));

    const colors = Array.isArray(color) ? color : [color]
    const chartOptions: ApexCharts.ApexOptions = {
        chart: {
            type: 'area',
            toolbar: { show: false },
            zoom: { enabled: false },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0,
                stops: [0, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: colors[0],
                        opacity: 0.4,
                    },
                    {
                        offset: 100,
                        color: '#3666AA00',
                        opacity: 0,
                    },
                ],
            },
        },

        markers: {
            size: data.map((_, i) => (i === maxIndex ? 6 : 0)),
            strokeWidth: 0,
            hover: {
                sizeOffset: 4
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories,
            labels: { show: false },
            axisTicks: { show: false },
            axisBorder: { show: false },
        },
        yaxis: {
            show: false
        },
        grid: {
            show: false,
        },
        legend: {
            show: false,
        },
        colors: colors,
    };


    const chartSeries = [
        {
            name: 'Total Time',
            data,
        },
    ];

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <Chart options={chartOptions} series={chartSeries} height={200} type='area' />
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: '#888',
                marginTop: '-8px',
                padding: '0 5px'
            }}>
                <span>{categories[0]}</span>
                <span>{totalTimeText}</span>
            </div>
        </div>
    );
};

export default LineAreaChart;
