'use client';

import { 
  Card, 
  CardContent, 
  CardHeader,
  Box
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

interface VerticalBarChartProps {
  title: string;
  xAxisData: string[];
  series: Array<{
    data: number[];
    label: string;
    color?: string;
  }>;
  height?: number;
  barGap?: number;
  showLegend?: boolean;
}

const VerticalBarChart = ({ 
  title, 
  xAxisData, 
  series, 
  height = 300,
  barGap = 0.2,
  showLegend = true
}: VerticalBarChartProps) => {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Box sx={{ height, width: '100%' }}>
          <BarChart
            xAxis={[
              { 
                scaleType: 'band', 
                data: xAxisData,
                categoryGapRatio: barGap,
              }
            ]}
            series={series.map(s => ({
              data: s.data,
              label: s.label,
              color: s.color,
            }))}
            height={height}
            slotProps={{
              legend: {
                hidden: !showLegend,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default VerticalBarChart;
