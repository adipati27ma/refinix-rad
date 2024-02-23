import {
  KanbanAddCardButton,
  KanbanBoard,
  KanbanBoardContainer,
  KanbanColumn,
  KanbanColumnSkeleton,
  KanbanItem,
  ProjectCardMemo,
  ProjectCardSkeleton,
} from '@/components';
import { TASKS_QUERY, TASK_STAGES_QUERY } from '@/graphql/queries';
import { TaskStage } from '@/graphql/schema.types';
import { TasksQuery } from '@/graphql/types';
import { useList } from '@refinedev/core';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import React from 'react';

export const TaskList = ({ children }: React.PropsWithChildren) => {
  const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
    resource: 'taskStages',
    meta: {
      gqlQuery: TASK_STAGES_QUERY,
    },
    filters: [
      {
        field: 'title',
        operator: 'in',
        value: ['TODO', 'IN PROGRESS', 'IN REVIEW', 'DONE'],
      },
    ],
    sorters: [
      {
        field: 'createdAt',
        order: 'asc',
      },
    ],
    pagination: {
      mode: 'off',
    },
  });

  const { data: tasks, isLoading: isLoadingTasks } = useList<
    GetFieldsFromList<TasksQuery>
  >({
    resource: 'tasks',
    meta: {
      gqlQuery: TASKS_QUERY,
    },
    sorters: [
      {
        field: 'dueDate',
        order: 'asc',
      },
    ],
    pagination: {
      mode: 'off',
    },
    queryOptions: {
      enabled: !!stages, // docs: Only fetch tasks when stages are loaded
    },
  });

  const taskStages = React.useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unassignedStage: [],
        stages: [],
      };
    }

    const unassignedStage = tasks.data.filter((task) => task.stageId === null);

    const grouped: TaskStage[] = stages.data.map((stage) => ({
      ...stage,
      tasks: tasks.data.filter((task) => task.stageId?.toString() === stage.id),
    }));

    return {
      unassignedStage,
      columns: grouped,
    };
  }, [stages, tasks]);

  const handleAddCard = (args: { stageId: string }) => {};
  const isLoading = isLoadingStages || isLoadingTasks;

  if (isLoading) return <PageSkeleton />;

  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard>
          <KanbanColumn
            id="unassigned"
            title="unassigned"
            count={taskStages.unassignedStage.length || 0}
            onAddClick={() => handleAddCard({ stageId: 'unassigned' })}
          >
            {taskStages.unassignedStage.map((task) => (
              <KanbanItem
                key={task.id}
                id={task.id}
                data={{ ...task, stageId: 'unassigned' }}
              >
                <ProjectCardMemo
                  {...task}
                  dueDate={task.dueDate || undefined}
                />
              </KanbanItem>
            ))}
            {!taskStages.unassignedStage.length && (
              <KanbanAddCardButton
                onClick={() => handleAddCard({ stageId: 'unassigned' })}
              />
            )}
          </KanbanColumn>

          {/* docs: other column */}
          {taskStages.columns?.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              count={column.tasks.length}
              onAddClick={() => handleAddCard({ stageId: column.id })}
            >
              {!isLoading &&
                column.tasks.map((task) => (
                  <KanbanItem key={task.id} id={task.id} data={task}>
                    <ProjectCardMemo
                      {...task}
                      dueDate={task.dueDate || undefined}
                    />
                  </KanbanItem>
                ))}
              {!column.tasks.length && (
                <KanbanAddCardButton
                  onClick={() => handleAddCard({ stageId: column.id })}
                />
              )}
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </>
  );
};

const PageSkeleton = () => {
  const columnCount = 5;
  const itemCount = 4;

  return (
    <KanbanBoardContainer>
      {Array.from({ length: columnCount }).map((_, index) => (
        <KanbanColumnSkeleton key={index}>
          {Array.from({ length: itemCount }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </KanbanColumnSkeleton>
      ))}
    </KanbanBoardContainer>
  );
};