import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import React from 'react';

type KanbanBoardProps = {
  onDragEnd: (event: DragEndEvent) => void;
};

export const KanbanBoardContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        width: 'calc(100% + 64px',
        height: 'calc(100vh - 64px',
        display: 'flex',
        justifyContent: 'column',
        margin: '-32px',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '32px',
          overflow: 'scroll',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const KanbanBoard = ({
  children,
  onDragEnd,
}: React.PropsWithChildren<KanbanBoardProps>) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // docs: mean 5px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      // delay: 250, // docs: mean 250ms
      distance: 5, // docs: mean 5px
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext onDragEnd={onDragEnd} sensors={sensors}>
      {children}
    </DndContext>
  );
};
