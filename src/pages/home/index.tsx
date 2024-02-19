import {
  DashboardTotalCountCard,
  DealsChart,
  LatestActivities,
  UpcomingEvents,
} from '@/components';
import { Col, Row } from 'antd';
import { useCustom } from '@refinedev/core';
import { DASHBOARD_TOTAL_COUNTS_QUERY } from '@/graphql/queries';
import { DashboardTotalCountsQuery } from '@/graphql/types';

export const Home = () => {
  // docs: hover the code for detailed documentation
  const { data, isLoading } = useCustom<DashboardTotalCountsQuery>({
    url: '',
    method: 'get',
    meta: {
      gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY,
    },
  });

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resources="companies"
            isLoading={isLoading}
            totalCount={data?.data.companies.totalCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resources="contacts"
            isLoading={isLoading}
            totalCount={data?.data.contacts.totalCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resources="deals"
            isLoading={isLoading}
            totalCount={data?.data.deals.totalCount}
          />
        </Col>
      </Row>

      <Row gutter={[32, 32]} style={{ marginTop: '32px' }}>
        <Col xs={24} sm={24} xl={8} style={{ height: '460px' }}>
          <UpcomingEvents />
        </Col>
        <Col xs={24} sm={24} xl={16} style={{ height: '460px' }}>
          <DealsChart />
        </Col>
      </Row>

      <Row gutter={[32, 32]} style={{ marginTop: '32px' }}>
        <Col xs={24}>
          <LatestActivities />
        </Col>
      </Row>
    </div>
  );
};
