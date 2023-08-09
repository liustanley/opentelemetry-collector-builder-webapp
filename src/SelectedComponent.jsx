import React from "react";

export const SelectedComponent = ({ id, component, onRemove }) => {
    return (
        <>
            <h2>{component.title}</h2>
            <div>{component.description}</div>
            <div>{component.tags}</div>
            <button onClick={() => onRemove(id)}>Remove</button>
        </>
    );
};
