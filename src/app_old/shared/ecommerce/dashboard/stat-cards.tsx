'use client';

import MetricCard from '@/core/components/cards/metric-card';
import { Text } from 'rizzui';
import cn from '@/core/utils/class-names';
import {
  PiCaretDoubleUpDuotone,
  PiCaretDoubleDownDuotone,
  PiGiftDuotone,
  PiBankDuotone,
  PiChartPieSliceDuotone,
  PiCurrencyDollarFill,
  PiPerson,
  PiPackage,
} from 'react-icons/pi';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

const orderData = [
  {
    day: 'Sunday',
    sale: 4000,
    cost: 2400,
  },
  {
    day: 'Monday',
    sale: 3000,
    cost: 1398,
  },
  {
    day: 'Tuesday',
    sale: 2000,
    cost: 9800,
  },
  {
    day: 'Wednesday',
    sale: 2780,
    cost: 3908,
  },
  {
    day: 'Thursday',
    sale: 1890,
    cost: 4800,
  },
  {
    day: 'Friday',
    sale: 2390,
    cost: 3800,
  },
  {
    day: 'Saturday',
    sale: 3490,
    cost: 4300,
  },
];

const salesData = [
  {
    day: 'Sunday',
    sale: 2000,
    cost: 2400,
  },
  {
    day: 'Monday',
    sale: 3000,
    cost: 1398,
  },
  {
    day: 'Tuesday',
    sale: 2000,
    cost: 9800,
  },
  {
    day: 'Wednesday',
    sale: 2780,
    cost: 3908,
  },
  {
    day: 'Thursday',
    sale: 1890,
    cost: 4800,
  },
  {
    day: 'Friday',
    sale: 2390,
    cost: 3800,
  },
  {
    day: 'Saturday',
    sale: 3490,
    cost: 4300,
  },
];

const productData = [
  {
    day: 'Sunday',
    sale: 2000,
    cost: 2400,
  },
  {
    day: 'Monday',
    sale: 2800,
    cost: 1398,
  },
  {
    day: 'Tuesday',
    sale: 3500,
    cost: 9800,
  },
  {
    day: 'Wednesday',
    sale: 2780,
    cost: 3908,
  },
  {
    day: 'Thursday',
    sale: 1890,
    cost: 4800,
  },
  {
    day: 'Friday',
    sale: 2390,
    cost: 3800,
  },
  {
    day: 'Saturday',
    sale: 3490,
    cost: 4300,
  },
];
const customerData = [
  {
    day: 'Sunday',
    sale: 2000,
    cost: 2400,
  },
  {
    day: 'Monday',
    sale: 2800,
    cost: 1398,
  },
  {
    day: 'Tuesday',
    sale: 3500,
    cost: 9800,
  },
  {
    day: 'Wednesday',
    sale: 2780,
    cost: 3908,
  },
  {
    day: 'Thursday',
    sale: 1890,
    cost: 4800,
  },
  {
    day: 'Friday',
    sale: 2390,
    cost: 3800,
  },
  {
    day: 'Saturday',
    sale: 3490,
    cost: 4300,
  },
];
const unpaidData = [
  {
    day: 'Sunday',
    sale: 2000,
    cost: 2400,
  },
  {
    day: 'Monday',
    sale: 2800,
    cost: 1398,
  },
  {
    day: 'Tuesday',
    sale: 3500,
    cost: 9800,
  },
  {
    day: 'Wednesday',
    sale: 2780,
    cost: 3908,
  },
  {
    day: 'Thursday',
    sale: 1890,
    cost: 4800,
  },
  {
    day: 'Friday',
    sale: 2390,
    cost: 3800,
  },
  {
    day: 'Saturday',
    sale: 3490,
    cost: 4300,
  },
];

const eComDashboardStatData = [
  {
    id: '2',
    icon: <PiChartPieSliceDuotone className="h-6 w-6" />,
    title: 'Total Sales',
    metric: '$57,890',
    increased: false,
    decreased: true,
    percentage: '-4.40',
    style: 'text-[#10b981]',
    fill: '#10b981',
    chart: salesData,
  },
  {
    id: '1',
    icon: <PiGiftDuotone className="h-6 w-6" />,
    title: 'Total Orders',
    metric: '1,390',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    chart: orderData,
  },
  {
    id: '3',
    icon: <PiPackage className="h-6 w-6" />,
    title: 'Total Products',
    metric: '12,390',
    increased: true,
    decreased: false,
    percentage: '+4',
    style: 'text-[#FFA500]',
    fill: '#FFA500',
    chart: productData,
  },
  {
    id: '3',
    icon: <PiPerson className="h-6 w-6" />,
    title: 'Total Curstomer',
    metric: '12,390',
    increased: true,
    decreased: false,
    percentage: '+2.40',
    style: 'text-[#ec4899]',
    fill: '#ec4899',
    chart: customerData,
  },
  {
    id: '3',
    icon: <PiCurrencyDollarFill className="h-6 w-6" />,
    title: 'Total Unpaid',
    metric: '12,390',
    increased: true,
    decreased: false,
    percentage: '+3.40',
    style: 'text-[#FFD700]',
    fill: '#FFD700',
    chart: unpaidData,
  },
];

export default function StatCards({ className }: { className?: string }) {
  return (
    <div
      className={cn('grid grid-cols-1 gap-5 3xl:gap-8 4xl:gap-9', className)}
    >
      {eComDashboardStatData.map((stat) => (
        <MetricCard
          key={stat.title + stat.id}
          title={stat.title}
          metric={stat.metric}
          metricClassName="lg:text-[22px]"
          icon={stat.icon}
          iconClassName={cn(
            '[&>svg]:w-10 [&>svg]:h-8 lg:[&>svg]:w-11 lg:[&>svg]:h-9 w-auto h-auto p-0 bg-transparent -mx-1.5',
            stat.id === '1' &&
              '[&>svg]:w-9 [&>svg]:h-7 lg:[&>svg]:w-[42px] lg:[&>svg]:h-[34px]',
            stat.style
          )}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <BarChart barSize={5} barGap={2} data={stat.chart}>
                <Bar dataKey="sale" fill={stat.fill} radius={5} />
              </BarChart>
            </ResponsiveContainer>
          }
          chartClassName="hidden @[200px]:flex @[200px]:items-center h-14 w-24"
          className="@container [&>div]:items-center"
        >
          <Text className="mt-5 flex items-center border-t border-dashed border-muted pt-4 leading-none text-gray-500">
            <Text
              as="span"
              className={cn(
                'me-2 inline-flex items-center font-medium',
                stat.increased ? 'text-green' : 'text-red'
              )}
            >
              {stat.increased ? (
                <PiCaretDoubleUpDuotone className="me-1 h-4 w-4" />
              ) : (
                <PiCaretDoubleDownDuotone className="me-1 h-4 w-4" />
              )}
              {stat.percentage}%
            </Text>
            <Text as="span" className="me-1 hidden @[240px]:inline-flex">
              {stat.increased ? 'Increased' : 'Decreased'}
            </Text>{' '}
            last month
          </Text>
        </MetricCard>
      ))}
    </div>
  );
}
