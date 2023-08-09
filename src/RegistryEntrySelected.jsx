import React from "react";

export const RegistryEntrySelected = ({ id, registryEntry, onRemove }) => {
    return (
        <>
            <h2>{registryEntry.title}</h2>
            <div>{registryEntry.description}</div>
            <div>{registryEntry.tags}</div>
            <button onClick={() => onRemove(id)}>Remove</button>
        </>
    );
};
