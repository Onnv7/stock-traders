// src/components/AreaChart.tsx

import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
type AreaChartProps = {
  height?: number | string;
  width?: number | string;
  data: number[];
  chartColor?: string;
};
function MiniAreaChartComponent({
  chartColor = '#6aff94',
  data = [],
  height = 100,
  width = 100,
}: AreaChartProps) {
  // Cấu hình cho biểu đồ
  const options: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: 'straight',
      width: 2, // Thay đổi độ dày của đường
      colors: [chartColor],
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      labels: {
        show: false, // Ẩn nhãn của trục x
      },
      axisBorder: {
        show: false, // Ẩn đường viền của trục x
      },
      axisTicks: {
        show: false, // Ẩn dấu của trục x
      },
    },
    yaxis: {
      labels: {
        show: false, // Ẩn nhãn của trục y
      },
      axisBorder: {
        show: false, // Ẩn đường viền của trục y
      },
      axisTicks: {
        show: false, // Ẩn dấu của trục y
      },
    },
    grid: {
      show: false, // Ẩn lưới
    },
    fill: {
      type: 'solid', // Sử dụng màu đồng nhất
      opacity: 0.3, // Đặt độ mờ của màu fill
      colors: [chartColor],
    },
    tooltip: {
      enabled: false,
    },
  };

  const chartSeries = [
    {
      data: data,
    },
  ];

  return (
    <div className="relative left-0 top-0 h-fit" style={{ width, height }}>
      <Chart
        options={options}
        series={chartSeries}
        type="area"
        height={height}
        width={width}
      />
    </div>
  );
}

export default MiniAreaChartComponent;
