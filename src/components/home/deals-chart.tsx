import React from 'react';
import { Card } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { Text } from '../text';
import { Area, AreaConfig } from '@ant-design/plots';
import { useList } from '@refinedev/core';
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries';
import { mapDealsData } from '@/utilities/helpers';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { DashboardDealsChartQuery } from '@/graphql/types';

const DealsChart = () => {
  const { data } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
    resource: 'dealStages',
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
    },
    filters: [
      {
        field: 'title',
        operator: 'in',
        value: ['WON', 'LOST'],
      },
    ],
    sorters: [
      {
        field: 'createdAt',
        order: 'desc',
      },
    ],
  });

  const dealData = React.useMemo(() => {
    return mapDealsData(data?.data);
  }, [data]);

  const config: AreaConfig = {
    data: dealData,
    xField: 'timeText',
    yField: 'value',
    seriesField: 'state',
    // color: ['#1979C9', '#D62A0D'],
    xAxis: { type: 'timeCat' },
    yAxis: {
      label: { formatter: (v: string) => `${Number(v) / 1000}K` },
      tickCount: 4,
    },
    legend: { position: 'top', offsetY: -6 },
    isStack: false,
    animation: true,
    startOnZero: false,
    smooth: true,
    tooltip: {
      formatter: (data) => {
        return {
          name: data.state,
          value: `$${Math.round(Number(data.value) / 1000)}k`,
        };
      },
    },
  };

  return (
    <Card
      style={{ height: '100%' }}
      styles={{
        header: { padding: '8px 16px' },
        body: { padding: '24px 24px 0 24px' },
      }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <DollarOutlined />
          <Text size="sm" style={{ marginLeft: '.7rem' }}>
            Deals
          </Text>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
  );
};

export default DealsChart;
