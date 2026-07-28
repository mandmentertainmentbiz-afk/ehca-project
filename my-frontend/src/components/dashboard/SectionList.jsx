import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import SectionCard from "./SectionCard";

export default function SectionList({
  sections,
  activePage,
  onDragEnd,
  onMoveUp,
  onMoveDown,
  onUpdated,
  onDeleted,
}) {
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable
        droppableId="sections"
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sections.map(
              (section, index) => (
                <Draggable
                  key={section._id}
                  draggableId={section._id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <SectionCard
                        section={section}
                        index={index}
                        total={sections.length}
                        dragHandleProps={
                          provided.dragHandleProps
                        }
                        onMoveUp={() =>
                          onMoveUp(index)
                        }
                        onMoveDown={() =>
                          onMoveDown(index)
                        }
                        onUpdated={() =>
                          onUpdated(
                            activePage
                          )
                        }
                        onDeleted={() =>
                          onDeleted(
                            activePage
                          )
                        }
                      />
                    </div>
                  )}
                </Draggable>
              )
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}