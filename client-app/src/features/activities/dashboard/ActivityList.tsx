import {
    Box,
    Button,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Typography
    } from 'material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, useTypedSelector } from 'store';
import { ActivityDashboardState, getActivitiesByDate } from 'store/activityDashboard';
import { deleteActivity } from 'store/activityDashboard';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    box: {
        padding: 2,
    },
    listItem: {
        flexDirection: 'column'
    },
    button: {
        paddingLeft: 5,
        paddingRight: 5
    }
}));

export const ActivityList: React.FC = () => {
    const state = useTypedSelector<ActivityDashboardState>(({ activityDashboardReducer }) => activityDashboardReducer);
    const { isSubmitting, selectedActivity } = state;
    const activities = getActivitiesByDate(state);
    const dispatch = useDispatch<AppDispatch>();
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {activities.map(activity => (
                <React.Fragment key={activity.id}>
                    <ListItem key={activity.id} alignItems="flex-start" className={classes.listItem}>
                        <ListItemText className={classes.root}
                            primary={activity.title}
                            secondary={activity.date}
                        />
                        <Typography variant='caption'>{activity.description}</Typography>
                        <Typography variant='caption'>{activity.city}, {activity.venue}</Typography>
                        <Box border={1} borderRadius={3} className={classes.box}>
                            <Typography variant="caption"> {activity.category} </Typography>
                        </Box>
                        <ListItemSecondaryAction>
                            <Button variant="contained" component={Link} to={`/activities/${activity.id}`} size="small" color="primary"><Typography>View</Typography></Button>
                            <Button variant="contained" size="small" color="secondary" onClick={() => { dispatch(deleteActivity(activity.id)); }} className={classes.button}>
                                {isSubmitting && activity.id === selectedActivity?.id ?
                                    <CircularProgress size={20} /> : // Size 14 works pretty well
                                    <Typography>Delete</Typography>}
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
        </List>
    );
};
