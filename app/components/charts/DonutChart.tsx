'use client';

import { 
  Card, 
  CardContent, 
  CardHeader,
  Box
} from '@mui/material';
import { PieChart } from '@mui/x-charts';

interface DonutChartProps {
  title: string;
  data: Array<{
    id: string | number;
    value: number;
    label: string;
    color?: string;
  }>;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}

const DonutChart = ({ 
  title, 
  data, 
  height = 300,
  innerRadius = 60,
  outerRadius = 100
}: DonutChartProps) => {
  // Convert the data to the format expected by PieChart
  const pieChartData = data.map(item => ({
    id: item.id,
    value: item.value,
    label: item.label,
    color: item.color
  }));

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Box sx={{ height, display: 'flex', justifyContent: 'center' }}>
          <PieChart
            series={[
              {
                data: pieChartData,
                innerRadius,
                outerRadius,
                paddingAngle: 2,
                cornerRadius: 4,
                startAngle: -90,
                endAngle: 270,
              },
            ]}
            height={height}
            width={300}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DonutChart;
