import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface IProps {
    content?: string;
    inverted?: boolean;
}

export const LoadingComponent: React.FC<IProps> = ({ content, inverted }) => {
    return (
        <Dimmer active inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    );
};

LoadingComponent.defaultProps = {
    content: "Loading...",
    inverted: true
};