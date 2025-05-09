import React from 'react';
import ReactECharts from 'echarts-for-react';

interface RadarChartProps {
  data: { name: string; value: number }[];
  typeMap: Record<string, string>;
}

const RadarChart: React.FC<RadarChartProps> = ({ data, typeMap }) => {
  const indicator = data.map(item => ({ name: typeMap[item.name] || item.name, max: 100 }));
  const values = data.map(item => item.value);

  const option = {
    tooltip: {
      trigger: 'item',
    },
    radar: {
      indicator,
      radius: '65%',
      splitNumber: 4,
      axisName: {
        color: '#7c3aed',
        fontSize: 14,
        fontWeight: 'bold',
      },
      splitLine: {
        lineStyle: {
          color: ['#e9d5ff', '#c4b5fd', '#a78bfa', '#7c3aed'],
        },
      },
      splitArea: {
        areaStyle: {
          color: ['#f3e8ff', '#ede9fe', '#f5f3ff', '#fff'],
        },
      },
      axisLine: {
        lineStyle: {
          color: '#a78bfa',
        },
      },
    },
    series: [
      {
        name: '性取向占比',
        type: 'radar',
        data: [
          {
            value: values,
            name: '性取向占比',
            areaStyle: {
              color: 'rgba(124, 58, 237, 0.2)',
            },
            lineStyle: {
              color: '#7c3aed',
              width: 3,
            },
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#7c3aed',
              borderColor: '#fff',
              borderWidth: 2,
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="w-full flex justify-center">
      <ReactECharts option={option} style={{ width: '100%', maxWidth: 400, height: 320 }} />
    </div>
  );
};

export default RadarChart; 