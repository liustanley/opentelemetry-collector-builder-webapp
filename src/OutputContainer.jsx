import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Header = styled.div`
    margin-bottom: 8px;
`;

const BuilderConfigText = styled.textarea`
    width: 100%;
    height: 200px;
    resize: none;
`;

export const OutputContainer = ({ builderConfig }) => {
    return (
        <Container>
            <Header>manifest.yaml</Header>
            <BuilderConfigText
                readOnly
                value={builderConfig}
            ></BuilderConfigText>
        </Container>
    );
};
