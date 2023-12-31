import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { getRegistry } from "./registry-utils";
import { Registry } from "./Registry";
import styled from "@emotion/styled";
import { generateManifest } from "./ocb-utils";
import { SelectedComponents } from "./SelectedComponents";
import { InputContainer } from "./InputContainer";
import { OutputContainer } from "./OutputContainer";

const Header = styled.h1`
    margin: 16px 32px;
`;

const TopPage = styled.div`
    display: flex;
    margin: 16px 32px;
    height: 30vh;
`;

const BottomPage = styled.div`
    display: flex;
    margin: 16px 32px;
    height: 20px;
`;

const Middle = styled.div`
    width: 128px;
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

    margin: `4px 16px 20px 16px`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
});

export class Container extends Component {
    state = {
        items: [],
        selected: [],
        builderConfig: "",
    };

    componentDidMount() {
        getRegistry().then((res) => {
            this.setState({
                items: res,
            });
        });

        this.onRemove = this.onRemove.bind(this);
        this.handleBuild = this.handleBuild.bind(this);
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
        const itemIndex = this.getList("droppable2")
            .map((e) => e.id)
            .indexOf(id);
        const sourceClone = Array.from(this.getList("droppable2"));
        const destClone = Array.from(this.getList("droppable"));
        const [removed] = sourceClone.splice(itemIndex, 1);
        destClone.push(removed);
        this.setState({
            items: destClone,
            selected: sourceClone,
        });
    }

    async handleBuild(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        const builderConfig = await generateManifest(
            formJson,
            this.state.selected
        );
        this.setState({
            builderConfig,
        });
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <>
                <Header>OpenTelemetry Collector Builder</Header>
                <TopPage>
                    <InputContainer handleBuild={this.handleBuild} />
                    <Middle />
                    <OutputContainer builderConfig={this.state.builderConfig} />
                </TopPage>
                <BottomPage>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Registry
                            items={this.state.items}
                            getListStyle={getListStyle}
                            getItemStyle={getItemStyle}
                        />
                        <Middle />
                        <SelectedComponents
                            selected={this.state.selected}
                            onRemove={this.onRemove}
                            getListStyle={getListStyle}
                            getItemStyle={getItemStyle}
                        />
                    </DragDropContext>
                </BottomPage>
            </>
        );
    }
}
