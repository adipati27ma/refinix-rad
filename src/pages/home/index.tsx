import { DealsChart, UpcomingEvents } from '@/components';
import { Col, Row } from 'antd';

export const Home = () => {
  return (
    <div>
      <Row style={{ marginTop: '32px' }}>
        <Col xs={24} sm={24} xl={8} style={{ height: '460px' }}>
          <UpcomingEvents />
        </Col>
        <Col xs={24} sm={24} xl={16} style={{ height: '460px' }}>
          <DealsChart />
        </Col>
      </Row>
    </div>
  );
};
