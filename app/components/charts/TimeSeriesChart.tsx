'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

interface TimeSeriesChartProps {
  title: string;
  xAxisData: string[];
  series: {
    name: string;
    data: number[];
    color?: string;
  }[];
  height?: number;
  showControls?: boolean;
  timeRanges?: string[];
}

const TimeSeriesChart = ({
  title,
  xAxisData,
  series,
  height = 300,
  showControls = true,
  timeRanges = ['7 Days', '30 Days', '90 Days', '1 Year'],
}: TimeSeriesChartProps) => {
  const [timeRange, setTimeRange] = useState(timeRanges[0]);

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value);
  };

  return (
    <Card>
      <CardHeader
        title={title}
        action={
          showControls && (
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={timeRange}
                onChange={handleTimeRangeChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Time range selector' }}
              >
                {timeRanges.map((range) => (
                  <MenuItem key={range} value={range}>
                    {range}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        }
      />
      <CardContent>
        <Box sx={{ height }}>
          <LineChart
            xAxis={[
              {
                data: Array.from({ length: xAxisData.length }, (_, i) => i),
                scaleType: 'point',
                valueFormatter: (value) => xAxisData[value],
              },
            ]}
            series={series.map((s) => ({
              data: s.data,
              label: s.name,
              color: s.color,
            }))}
            height={height}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TimeSeriesChart;
