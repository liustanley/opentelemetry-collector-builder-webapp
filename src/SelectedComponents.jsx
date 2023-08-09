import React from "react";
import styled from "@emotion/styled";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { SIDEBAR_WIDTH } from "./constants";
import { SelectedComponent } from "./SelectedComponent";

const ContentContainer = styled.div`
    margin-left: ${SIDEBAR_WIDTH}px;
`;

const ContentList = styled.div`
    width: ${SIDEBAR_WIDTH}px;
    margin: 0 auto;
`;

export const SelectedComponents = ({
    selected,
    onRemove,
    getListStyle,
    getItemStyle,
}) => {
    return (
        <>
            <ContentContainer>
                <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <ContentList
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {selected.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {
                                                <SelectedComponent
                                                    id={item.id}
                                                    onRemove={onRemove}
                                                    component={item.content}
                                                />
                                            }
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ContentList>
                    )}
                </Droppable>
            </ContentContainer>
        </>
    );
};
