'use client';

import { Grid } from '@mui/material';
import PageHeader from '../../components/layout/PageHeader';
import TimeSeriesChart from '../../components/charts/TimeSeriesChart';
import DonutChart from '../../components/charts/DonutChart';
import VerticalBarChart from '../../components/charts/VerticalBarChart';

export default function ChartsPage() {
  // Sample data for TimeSeriesChart
  const timeSeriesData = {
    xAxisData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      {
        name: 'Revenue',
        data: [18, 25, 30, 35, 40, 60, 70, 75, 82, 90, 100, 120],
        color: '#4CAF50',
      },
      {
        name: 'Expenses',
        data: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80],
        color: '#FF5252',
      },
      {
        name: 'Profit',
        data: [3, 5, 5, 5, 5, 20, 25, 25, 27, 30, 30, 40],
        color: '#2196F3',
      },
    ],
  };

  // Sample data for DonutChart
  const donutData = [
    { id: 0, value: 35, label: 'Series A', color: '#FF5252' },
    { id: 1, value: 25, label: 'Series B', color: '#2196F3' },
    { id: 2, value: 20, label: 'Series C', color: '#4CAF50' },
    { id: 3, value: 15, label: 'Series D', color: '#FFC107' },
    { id: 4, value: 5, label: 'Series E', color: '#9C27B0' },
  ];

  // Sample data for VerticalBarChart
  const barChartData = {
    xAxisData: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      {
        label: 'Product A',
        data: [50, 60, 70, 80],
        color: '#2196F3',
      },
      {
        label: 'Product B',
        data: [30, 40, 50, 60],
        color: '#FF5252',
      },
      {
        label: 'Product C',
        data: [20, 30, 40, 50],
        color: '#4CAF50',
      },
    ],
  };

  return (
    <>
      <PageHeader
        title="Charts"
        subtitle="Data visualization components"
        breadcrumbs={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/charts', label: 'Charts' },
        ]}
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TimeSeriesChart 
            title="Revenue vs Expenses (Annual)" 
            xAxisData={timeSeriesData.xAxisData}
            series={timeSeriesData.series}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DonutChart 
            title="Revenue Distribution" 
            data={donutData}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <VerticalBarChart 
            title="Quarterly Sales by Product" 
            xAxisData={barChartData.xAxisData}
            series={barChartData.series}
          />
        </Grid>
      </Grid>
    </>
  );
}
