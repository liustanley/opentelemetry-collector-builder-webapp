import React, { useState } from "react";
import styled from "@emotion/styled";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { RegistryEntry } from "./RegistryEntry";
import { SIDEBAR_WIDTH } from "./constants";

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`;

const RegistryContainer = styled.div`
    width: ${SIDEBAR_WIDTH}px;
    height: 50vh;
    overflow: auto;
`;

const Label = styled.label`
    margin-left: 16px;
`;

export const Registry = ({ items, getListStyle, getItemStyle }) => {
    // const [showExporters, setShowExporters] = useState(true);
    // const handleShowExporters = () => setShowExporters(!showExporters);
    // const [showProcessors, setShowProcessors] = useState(true);
    // const handleShowProcessors = () => setShowProcessors(!showProcessors);
    // const [showReceivers, setShowReceivers] = useState(true);
    // const handleShowReceivers = () => setShowReceivers(!showReceivers);

    // const exporters = items.filter((item) => {
    //     return item.content.registryType == "exporter";
    // });
    // const processors = items.filter((item) => {
    //     return item.content.registryType == "processor";
    // });
    // const receivers = items.filter((item) => {
    //     return item.content.registryType == "receiver";
    // });

    return (
        <div>
            <Header>
                <h2>Registry</h2>
                {/* <Header>
                    <Label>
                        Exporters:{" "}
                        <input
                            type="checkbox"
                            name="exporters"
                            value={showExporters}
                            defaultChecked
                            onClick={handleShowExporters}
                        />
                    </Label>
                    <Label>
                        Processors:{" "}
                        <input
                            type="checkbox"
                            name="processors"
                            value={showProcessors}
                            defaultChecked
                            onClick={handleShowProcessors}
                        />
                    </Label>
                    <Label>
                        Receivers:{" "}
                        <input
                            type="checkbox"
                            name="receivers"
                            value={showReceivers}
                            defaultChecked
                            onClick={handleShowReceivers}
                        />
                    </Label>
                </Header> */}
            </Header>
            <RegistryContainer>
                <Droppable isDropDisabled={true} droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {items.map((item, index) => (
                                <RegistryEntry
                                    registryEntry={item}
                                    getItemStyle={getItemStyle}
                                    index={index}
                                />
                            ))}

                            {/* {showExporters &&
                                exporters.map((item, index) => (
                                    <RegistryEntry
                                        registryEntry={item}
                                        getItemStyle={getItemStyle}
                                        index={index}
                                    />
                                ))}
                            {showProcessors &&
                                processors.map((item, index) => (
                                    <RegistryEntry
                                        registryEntry={item}
                                        getItemStyle={getItemStyle}
                                        index={index}
                                    />
                                ))}
                            {showReceivers &&
                                receivers.map((item, index) => (
                                    <RegistryEntry
                                        registryEntry={item}
                                        getItemStyle={getItemStyle}
                                        index={index}
                                    />
                                ))} */}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </RegistryContainer>
        </div>
    );
};
