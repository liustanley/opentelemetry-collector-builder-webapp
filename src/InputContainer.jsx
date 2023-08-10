import React from "react";
import styled from "@emotion/styled";
import { SIDEBAR_WIDTH } from "./constants";

const Container = styled.div`
    width: ${SIDEBAR_WIDTH}px;
`;

const DistForm = styled.form`
    display: flex;
    flex-direction: column;
    width: ${SIDEBAR_WIDTH}px;
`;

const Label = styled.label`
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
`;

const Input = styled.input`
    width: ${SIDEBAR_WIDTH / 2}px;
`;

const Build = styled.button`
    margin-top: 8px;
    height: 20px;
`;

export const InputContainer = ({ handleBuild }) => {
    return (
        <Container>
            <DistForm onSubmit={handleBuild}>
                <Label>
                    Module:{" "}
                    <Input
                        name="module"
                        defaultValue="example.com/my-custom-distro-module"
                    />
                </Label>
                <Label>
                    Name: <Input name="name" defaultValue="my-custom-distro" />
                </Label>
                <Label>
                    Description:{" "}
                    <Input
                        name="description"
                        defaultValue="A sample custom OpenTelemetry Collector distribution"
                    />
                </Label>
                <Label>
                    Version: <Input name="version" defaultValue="0.81.0" />
                </Label>
                <Label>
                    Output Path:{" "}
                    <Input name="output_path" defaultValue="./build" />
                </Label>
                <Label>
                    OTel Collector Version:{" "}
                    <Input name="otelcol_version" defaultValue="0.81.0" />
                </Label>
                <Build type="submit">Build</Build>
            </DistForm>
        </Container>
    );
};
