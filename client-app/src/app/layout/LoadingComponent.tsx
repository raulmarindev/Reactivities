import {
    Backdrop,
    CircularProgress,
    makeStyles,
    Typography
    } from 'material';
import React from 'react';

interface IProps {
    content?: string;
    inverted?: boolean;
}

const useStyles = makeStyles({
    backdrop: {
        backgroundColor: "white",
        flexDirection: "column"
    },
});

export const LoadingComponent: React.FC<IProps> = ({ content, inverted }) => {
    const classes = useStyles();

    return (
        <Backdrop open={true} className={classes.backdrop}>
            <CircularProgress color="inherit" />
            <Typography component="div">{content}</Typography>
        </Backdrop>
    );
};

LoadingComponent.defaultProps = {
    content: "Loading...",
    inverted: true
};