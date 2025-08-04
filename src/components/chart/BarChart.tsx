import React from 'react'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type BarChartProps = {
    categories: string[]
    data: number[] | number[][]
    title?: string
    seriesName?: string | string[]
    color?: string | string[]
    height?: number
    type?: string
    columnWidth?: string
    fill_type?: string
}

const BarChart: React.FC<BarChartProps> = ({
    categories,
    data,
    title = 'Chart Title',
    seriesName = 'Data',
    color = '#3666AA',
    height = 300,
    type = 'single',
    columnWidth = '40%',
    fill_type = 'gradient'
}) => {
    const isMultipleSeries = Array.isArray(seriesName) && Array.isArray(data[0])
    const series: any = isMultipleSeries
        ? (seriesName as string[]).map((name, index) => ({
            name,
            data: (data as number[][])[index],
        }))
        : [
            {
                name: seriesName as string,
                data: data as number[],
            },
        ]

    const colors = Array.isArray(color) ? color : [color]

    // console.log(series, type == 'group', typeof series)
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
                columnWidth: columnWidth,
                borderRadius: 0,
            },
        },
        fill: {
            type: fill_type,
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.4,
                gradientToColors: colors,
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.1,
                stops: [0, 100],
            },
            colors: colors
        },
        colors,
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
            show: type == 'group' ? false : true,
            markers: {
                fillColors: colors,
            },
            showForSingleSeries: true,
        },
        tooltip: {
            enabled: true,
        },
    }

    return <Chart options={options} series={series} type="bar" height={height} />
}

export default BarChart
