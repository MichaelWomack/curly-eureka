import * as React from 'react';
import { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from "@material-ui/core/IconButton/IconButton";
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { SpeedometerIcon } from "../../Icons";
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import ChapterListDrawer from './ChapterListDrawer';
import PlaybackSpeedModal from "./PlaybackSpeedModal";
import SleepTimerModal from "./SleepTimerModal";
import { Audio, SleepTimer } from "../../../model/audio";

const styles = (theme: Theme) => createStyles({
    root: {
        bottom: 0
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'column'
    }
});

export interface FullScreenToolbarProps extends WithStyles<typeof styles> {
    audio: Audio;
    setTrack: (track: number) => void;
    setPlaybackSpeed: (speed: number) => void;
    playbackSpeed: number;
    setSleepTimer: (timerDuration: number) => void;
    sleepTimer: SleepTimer;
}

export interface FullScreenToolbarState {
    chaptersDrawerOpen: boolean;
    playbackSpeedModalOpen: boolean;
    sleepTimerModalOpen: boolean;
}

class FullScreenToolbar extends Component<FullScreenToolbarProps, FullScreenToolbarState> {

    readonly state: FullScreenToolbarState = {
        chaptersDrawerOpen: false,
        playbackSpeedModalOpen: false,
        sleepTimerModalOpen: false
    };

    toggleChaptersDrawer = () => {
        this.setState(prevState => ({
            chaptersDrawerOpen: !prevState.chaptersDrawerOpen
        }));
    };

    togglePlaybackSpeedModal = () => {
        this.setState(prevState => ({
            playbackSpeedModalOpen: !prevState.playbackSpeedModalOpen
        }));
    };

    toggleSleepTimerModal = () => {
        this.setState(prevState => ({
            sleepTimerModalOpen: !prevState.sleepTimerModalOpen
        }));
    };

    render() {
        const { classes, audio, setTrack, playbackSpeed, setPlaybackSpeed, setSleepTimer, sleepTimer } = this.props;
        const { chaptersDrawerOpen, playbackSpeedModalOpen, sleepTimerModalOpen } = this.state;
        return (
            <Fragment>
                <AppBar className={classes.root} position="static">
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.iconContainer}>
                            <IconButton color="inherit" onClick={this.togglePlaybackSpeedModal}>
                                <SpeedometerIcon fontSize="small"/>
                            </IconButton>
                        </div>
                        <div className={classes.iconContainer}>
                            <IconButton color="inherit" onClick={this.toggleChaptersDrawer}>
                                <PlaylistPlayIcon fontSize="small"/>
                            </IconButton>
                        </div>
                        <div className={classes.iconContainer} onClick={this.toggleSleepTimerModal}>
                            <IconButton color="inherit">
                                <AccessAlarmIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <ChapterListDrawer
                    audio={audio}
                    isOpen={chaptersDrawerOpen}
                    onClose={this.toggleChaptersDrawer}
                    playChapter={setTrack}
                />
                <PlaybackSpeedModal
                    isOpen={playbackSpeedModalOpen}
                    onClose={this.togglePlaybackSpeedModal}
                    playbackSpeed={playbackSpeed}
                    setPlaybackSpeed={setPlaybackSpeed}
                />
                <SleepTimerModal
                    isOpen={sleepTimerModalOpen}
                    onClose={this.toggleSleepTimerModal}
                    setSleepTimer={setSleepTimer}
                    sleepTimer={sleepTimer}
                />
            </Fragment>
        );
    }
}

export default withStyles(styles)(FullScreenToolbar);