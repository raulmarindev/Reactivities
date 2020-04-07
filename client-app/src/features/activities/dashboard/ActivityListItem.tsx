import { IActivity } from 'app/models/IActivity';
import clsx from 'clsx';
import {
    Avatar,
    Button,
    CircularProgress,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Room,
    Schedule,
    Typography
    } from 'material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, useTypedSelector } from 'store';
import { deleteActivity } from 'store/activityDashboard';

interface IActivityListItemProps {
    activity: IActivity;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    box: {
        padding: 2,
    },
    listItem: {
        backgroundColor: theme.palette.background.paper,
        border: '0.5px',
        borderColor: 'rgba(34, 36, 38, 0.15)',
        marginTop: 0,
        bottom: 0,
        marginBottom: 0,
        top: 0,
        borderStyle: 'solid'
    },
    mainListItem: {
        flexDirection: 'row',
        borderRadius: '.28571429rem .28571429rem 0 0',
        borderBottom: 0,
        justifyContent: 'flex-start'
    },
    secondaryListItem: {
        backgroundColor: '#f3f4f5',
        borderTop: 0,
    },
    lastListItem: {
        borderRadius: '0 0 .28571429rem .28571429rem',
        padding: '1em 1em',
        borderTop: 0
    },
    button: {
        paddingLeft: 5,
        paddingRight: 5
    },
    image: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    avatar: {
        marginRight: 10
    }
}));

export const ActivityListItem: React.FC<IActivityListItemProps> = ({ activity }) => {
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();
    const selectedActivity = useTypedSelector<IActivity | undefined>(({ activityDashboardReducer }) => activityDashboardReducer.selectedActivity);
    const isSubmitting = useTypedSelector<boolean>(({ activityDashboardReducer }) => activityDashboardReducer.isSubmitting);

    const mainListItemClassName = clsx(classes.mainListItem, classes.listItem);
    const secondaryListItemClassName = clsx(classes.listItem, classes.secondaryListItem);
    const lastListItemClassName = clsx(classes.listItem, classes.lastListItem);

    return (
        <>
            <ListItem className={mainListItemClassName}>
                <ListItemAvatar className={classes.avatar}>
                    <Avatar className={classes.image} src='/assets/user.png' />
                </ListItemAvatar>
                <div>
                    <ListItemText className={classes.root}
                        primary={activity.title}
                    />
                    <Typography variant='caption'>Hosted by Bob</Typography>
                </div>
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemIcon>
                    <Schedule />
                </ListItemIcon>
                <ListItemText primary={activity.date} />
                <ListItemIcon>
                    <Room />
                </ListItemIcon>
                <ListItemText primary={activity.venue} />
            </ListItem>
            <ListItem className={secondaryListItemClassName}>
                <Typography variant='caption'>Attendees will go here</Typography>
            </ListItem>
            <ListItem className={lastListItemClassName}>
                <Typography variant="caption" component="span"> {activity.description} </Typography>
                <ListItemSecondaryAction>
                    <Button variant="contained" component={Link} to={`/activities/${activity.id}`} size="small" color="primary"><Typography>View</Typography></Button>
                    <Button variant="contained" size="small" color="secondary" onClick={() => { dispatch(deleteActivity(activity.id)); }} className={classes.button}>
                        {isSubmitting && activity.id === selectedActivity?.id ?
                            <CircularProgress size={20} /> : // Size 14 works pretty well
                            <Typography>Delete</Typography>}
                    </Button>
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};
