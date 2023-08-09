import React from "react";
import styled from "@emotion/styled";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { RegistryEntry } from "./RegistryEntry";
import { SIDEBAR_WIDTH } from "./constants";

const RegistryContainer = styled.div`
    width: ${SIDEBAR_WIDTH}px;
    height: 100vh;
    overflow: auto;
    position: fixed;
`;

export const Registry = ({ items, getListStyle, getItemStyle }) => {
    return (
        <>
            <RegistryContainer>
                <Droppable isDropDisabled={true} droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {items.map((item, index) => (
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
                                                <RegistryEntry
                                                    registryEntry={item.content}
                                                />
                                            }
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </RegistryContainer>
        </>
    );
};
