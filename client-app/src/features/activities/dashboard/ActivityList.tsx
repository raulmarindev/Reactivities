import { ActivityListItem } from './ActivityListItem';
import React from 'react';
import { useTypedSelector } from 'store';
import { ActivityDashboardState, getActivitiesByDate } from 'store/activityDashboard';
import {
    List,
    makeStyles,
    Typography,
} from 'material';

const useStyles = makeStyles(theme => ({
    label: {
        color: theme.palette.background.paper,
        backgroundColor: theme.palette.primary.dark,
        marginBottom: 15,
        marginTop: 15,
        padding: ".4em .833em",
        borderRadius: ".28571429rem",
        border: 1,
        display: "inline-block",
        textAlign: "center",
        fontSize: ".85714286rem",
        fontWeight: 700,
    },
}));

export const ActivityList: React.FC = () => {
    const state = useTypedSelector<ActivityDashboardState>(({ activityDashboardReducer }) => activityDashboardReducer);
    const activityGroupsByDate = getActivitiesByDate(state);
    const classes = useStyles();

    const activityListItems = [];

    for (let group of activityGroupsByDate) {
        activityListItems.push(
            <React.Fragment key={group[0]}>
                <Typography className={classes.label} variant="h5" color="textPrimary" component="span">{group[0]}</Typography>

                {group[1].map(activity => (
                    <React.Fragment key={activity.id}>
                        <ActivityListItem activity={activity} />
                    </React.Fragment>
                ))}
            </React.Fragment>
        );
    }

    return (
        <List> {activityListItems} </List>
    );
};
