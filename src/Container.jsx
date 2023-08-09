import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getRegistry } from "./registry-utils";
import { RegistryEntryComponent } from "./RegistryEntryComponent";
import { RegistryEntrySelected } from "./RegistryEntrySelected";
import styled from "@emotion/styled";
import { generateManifest } from "./ocb-utils";

const Build = styled.button`
    height: 20px;
`;

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
});

export class Container extends Component {
    state = {
        items: [],
        selected: [],
    };

    componentDidMount() {
        getRegistry().then((res) => {
            this.setState({
                items: res,
            });
        });

        this.onRemove = this.onRemove.bind(this);
    }

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: "items",
        droppable2: "selected",
    };

    getList = (id) => this.state[this.id2List[id]];

    onDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === "droppable2") {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2,
            });
        }
    };

    onRemove(id) {
        const item = this.getList("droppable2").find(
            (element) => element.id == id
        );
        const sourceClone = Array.from(this.getList("droppable2"));
        const destClone = Array.from(this.getList("droppable"));
        const [removed] = sourceClone.splice(item.index, 1);
        destClone.push(removed);
        this.setState({
            items: destClone,
            selected: sourceClone,
        });
    }

    async onBuild() {
        await generateManifest(Array.from(this.getList("droppable2")));
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {this.state.items.map((item, index) => (
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
                                                    provided.draggableProps
                                                        .style
                                                )}
                                            >
                                                {
                                                    <RegistryEntryComponent
                                                        registryEntry={
                                                            item.content
                                                        }
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
                    <Droppable droppableId="droppable2">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {this.state.selected.map((item, index) => (
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
                                                    provided.draggableProps
                                                        .style
                                                )}
                                            >
                                                {
                                                    <RegistryEntrySelected
                                                        id={item.id}
                                                        onRemove={this.onRemove}
                                                        registryEntry={
                                                            item.content
                                                        }
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
                </DragDropContext>
                <Build onClick={async () => await this.onBuild()}>Build</Build>
            </>
        );
    }
}
