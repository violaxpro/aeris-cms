
import React from 'react';
import Chart from 'react-apexcharts';

type AreaProps = {
    categories: string[]
    color?: any
    height?: number
    type?: string
    series: any
    showLegend?: boolean
}

const index: React.FC<AreaProps> = ({
    categories,
    series,
    color = ['#8080FF', '#FF9999', '#66D2E8'],
    height = 300,
    showLegend = true,
    type = 'single',
}) => {
    const colors = Array.isArray(color) ? color : [color]

    const options: ApexCharts.ApexOptions = {
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
                opacityFrom: 0.4,
                opacityTo: 0,
            },
        },
        markers: {
            size: 5,
            strokeWidth: 2,
            hover: {
                sizeOffset: 4
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            max: 100,
            min: 0,
            tickAmount: 5,
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        },
        legend: {
            show: showLegend,
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '12px',
        },
        colors: colors,
    };



    return (
        <div>
            <Chart options={options} series={series} type="area" height={height} />
        </div>
    );
};

export default index;
