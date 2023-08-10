import styled from "@emotion/styled";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
    border-style: solid;
    margin-bottom: 8px;
    padding: 8px 8px 8px 8px;
    background-color: white;
`;

const Header = styled.h3`
    padding: 0;
    margin: 0;
    margin-bottom: 8px;
`;

export const RegistryEntry = ({ registryEntry, index, getItemStyle }) => {
    return (
        <>
            <Draggable
                key={registryEntry.id}
                draggableId={registryEntry.id}
                index={index}
            >
                {(provided, snapshot) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Header>{registryEntry.content.title}</Header>
                        <div>{registryEntry.content.description}</div>
                        <div>{registryEntry.content.tags}</div>
                    </Container>
                )}
            </Draggable>
        </>
    );
};
