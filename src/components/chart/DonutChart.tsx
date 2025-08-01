import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type DonutChartProps = {
    series: number[];
    labels: string[];
    colors?: string[];
    title?: string;
};

const DonutChart: React.FC<DonutChartProps> = ({
    series,
    labels,
    colors = ['#002B50', '#4A90E2', '#7FB3FF'],
    title = 'Total',
}) => {
    const data = {
        labels,
        datasets: [
            {
                data: series,
                backgroundColor: colors,
                borderWidth: 15, // Bisa di-style buat tebal
                borderRadius: 50, // Rounded edge donut
                cutout: '75%', // Buat efek donut
                hoverOffset: 8,
            },
        ],
    };

    const total = series.reduce((a, b) => a + b, 0);

    const options: ChartOptions<'doughnut'> = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                    usePointStyle: true,
                    pointStyle: 'circle',
                },

            },
            tooltip: {
                enabled: true,
                padding: 10,
                backgroundColor: '#ffffff',
                titleColor: '#000000',
                bodyColor: '#000000',
                borderColor: '#ccc',
                borderWidth: 1,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: 300 }} className='z-20'>
            <Doughnut data={data} options={options} />
            <div
                style={{
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    pointerEvents: 'none',
                }}
            >
                <div style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</div>
                <div style={{ fontSize: 22 }}>{total}</div>
            </div>
        </div>
    );
};

export default DonutChart;
