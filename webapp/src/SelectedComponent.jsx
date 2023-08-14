import styled from "@emotion/styled";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
    border-style: solid;
    margin-bottom: 8px;
    padding: 8px 8px 8px 8px;
    background-color: white;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Header = styled.h3`
    padding: 0;
    margin: 0;
    margin-bottom: 8px;
`;

export const SelectedComponent = ({
    index,
    component,
    getItemStyle,
    onRemove,
}) => {
    return (
        <>
            <Draggable
                key={component.id}
                draggableId={component.id}
                index={index}
            >
                {(provided, snapshot) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <HeaderContainer>
                            <Header>{component.content.title}</Header>
                            <button onClick={() => onRemove(component.id)}>
                                Remove
                            </button>
                        </HeaderContainer>

                        <div>{component.content.description}</div>
                        <div>{component.content.tags}</div>
                    </Container>
                )}
            </Draggable>
        </>
    );
};
