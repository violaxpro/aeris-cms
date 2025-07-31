import React from 'react'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type BarChartProps = {
    categories: string[]
    data: number[]
    title?: string
    seriesName?: string
    color?: string
    height?: number
}

const BarChart: React.FC<BarChartProps> = ({
    categories,
    data,
    title = 'Chart Title',
    seriesName = 'Data',
    color = '#3666AA',
    height = 300,
}) => {
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false,
                offsetX: -10
            },
        },
        grid: {
            padding: {
                right: 20,
                left: 20
            }
        },
        title: {
            text: title,
            style: {
                fontSize: '16px',
                fontWeight: 600,
            },
        },
        plotOptions: {
            bar: {
                columnWidth: '40%',
                borderRadius: 0,
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.4,
                gradientToColors: [color],
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.1,
                stops: [0, 100],
            },
            colors: ['#3666AA']
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: categories,
        },
        yaxis: {
            title: {
                text: '',
            },
        },
        legend: {
            show: true,
            markers: {
                fillColors: [color],
            },
            showForSingleSeries: true,
        },
        tooltip: {
            enabled: true,
        },
    }

    const series = [
        {
            name: seriesName,
            data: data,
        },
    ]

    return <Chart options={options} series={series} type="bar" height={height} />
}

export default BarChart
