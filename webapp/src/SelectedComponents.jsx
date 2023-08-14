import React from "react";
import styled from "@emotion/styled";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { SIDEBAR_WIDTH } from "./constants";
import { SelectedComponent } from "./SelectedComponent";

const ContentContainer = styled.div`
    width: 100%;
`;

const ContentList = styled.div`
    width: 100%;
    height: 50vh;
    overflow: auto;
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
                <h2>Selected Components</h2>
                <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <ContentList
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {selected.map((item, index) => (
                                <SelectedComponent
                                    component={item}
                                    index={index}
                                    getItemStyle={getItemStyle}
                                    onRemove={onRemove}
                                />
                            ))}
                            {provided.placeholder}
                        </ContentList>
                    )}
                </Droppable>
            </ContentContainer>
        </>
    );
};
