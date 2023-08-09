import React from "react";

export const RegistryEntry = ({ registryEntry, index }) => {
    return (
        <>
            <h2>{registryEntry.title}</h2>
            <div>{registryEntry.description}</div>
            <div>{registryEntry.tags}</div>
        </>
    );
};