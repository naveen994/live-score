import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@material-ui/core'
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import React, { Fragment, useState } from 'react'
import { getMatchDetail } from '../API/Api';
const Mycard =({match})=>{
    const [detail,setDetail]=useState({})
    const [open,setOpen]=useState(false)
    const handleClick =(id)=>{
        getMatchDetail(id)
        .then(data=>{console.log("Match DATA:",data)
        setDetail(data)
        handleOpen()
        })
        .catch(console.log("error"))
    }
    const getMatchCard =()=>{
        return (
            <Card style ={{margin:20}}>
                <CardContent>
                    <Grid container justify ="center" alignItems="center" spacing ={4}>
                        <Grid item>
                             <Typography variant="h5">{match["team-1"]}</Typography>
                        </Grid>
                        <Grid item>
                        <Typography><SyncAltIcon variant="contained" color="primary"/></Typography> 
                        </Grid>
                        <Grid item>
                        <Typography variant="h5">{match["team-2"]}</Typography>  
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container justify ="center" >
                    <Button onClick={()=>{
                        handleClick(match.unique_id);
                    }} variant="contained" color="primary">Show Detail</Button>
                    <Button style={{marginLeft:8}} variant="contained" color="secondary">
                        Start Time{new Date(match.dateTimeGMT).toLocaleString()}</Button>
                    </Grid>
                </CardActions>
            </Card>
        )
    }
    const handleClose=()=>{
        setOpen(false)
    }
    const handleOpen=()=>{
        setOpen(true)
    }
    const getDialog=()=>(
        <Dialog open={open} onClose ={handleClose}>
            <DialogTitle id="alert-diglog-title">{"Match Details..."}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-diglog-description">
                    <Typography>{detail.stat}</Typography>
                    <Typography>
                        Match
                        <span style={{fontSize:"italic",fontWeight:"bold"}}>
                            {detail.matchStarted? "started": "Still not Started"}</span>
                    </Typography>
                    <Typography>
                        Scores
                        <span style={{fontSize:"italic",fontWeight:"bold"}}>
                                {detail.score}
                                </span>
                    </Typography>
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>Close</Button>
            </DialogActions>
        </Dialog>
    )
    return (
        <Fragment>
            {getMatchCard()}
            {getDialog()}
        </Fragment>
    )
}
export default Mycard