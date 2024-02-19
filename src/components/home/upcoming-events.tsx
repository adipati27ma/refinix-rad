import React, { useState } from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import { Badge, Card, List, Skeleton } from 'antd';
import dayjs from 'dayjs';
import { Text } from '../text';
import UpcomingEventsSkeleton from '../skeleton/upcoming-events';
import { getDate } from '@/utilities/helpers';
import { BaseRecord, useList } from '@refinedev/core';
import { DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY } from '../../graphql/queries';

const UpcomingEvents = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading: eventsLoading } = useList({
    resource: 'events',
    pagination: {
      pageSize: 5,
    },
    sorters: [
      {
        field: 'startDate',
        order: 'asc',
      },
    ],
    filters: [
      {
        field: 'startDate',
        operator: 'gte',
        // value: new Date().toISOString(),
        value: dayjs().format('YYYY-MM-DD'), // sama saja seperti di atas
      },
    ],
    meta: {
      gqlQuery: DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY,
    },
  });

  return (
    <Card
      style={{ height: '100%' }}
      styles={{ header: { padding: '8px 16px' }, body: { padding: '0 1rem' } }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarOutlined />
          <Text size="sm" style={{ marginLeft: '.7rem' }}>
            Upcoming Events
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={(_, index) => <UpcomingEventsSkeleton key={index} />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={data?.data || []}
          renderItem={(item: BaseRecord) => {
            const renderDate = getDate(item.startDate, item.endDate);

            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Badge color={item.color} />}
                  title={<Text size="xs">{renderDate}</Text>}
                  description={
                    <Text ellipsis={{ tooltip: true }} strong>
                      {item.title}
                    </Text>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}

      {!isLoading && data?.data.length === 0 && (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '220px',
          }}
        >
          No upcoming events
        </span>
      )}
    </Card>
  );
};

export default UpcomingEvents;
