import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import FavTeams, { newNoteFav } from "./FavTeamsTable";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from "@mui/material";


const FavoritesDetails = (props) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 0,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { fav } = props;
    console.log("fav", fav)

    const showToastMessage = () => {
        toast.success('Removed from the Favs !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            onClose: () => window.location.reload(),
            className: 'toast-message'
        });
    };


    console.log("note",newNoteFav);

    return (
        <div className="fav-h5">
            <h5>TEAMS</h5>
            {
                fav.length === 0 ?
                    <div className="no-fav-info">
                        You have no fav Team
                    </div>
                    :
                    <table className="table-favs">
                        <thead>

                            <tr>
                                <th className="standing-teams" id="fav-ranking">Team CF Ranking</th>
                                <th>Team Logo</th>
                                <th>Team Name</th>
                                <th>Team Wins</th>
                                <th>Team Losses</th>
                                <th></th>
                                <th>Add a note</th>
                                <th>Notes</th>
                            </tr>
                        </thead>

                        {
                            fav.map((favo) => {
                                return (
                                    <FavTeams openMoral={handleOpen} toast={showToastMessage} favos={favo} />
                                )
                            })
                        }

                    </table>
            }
            {/* <Button onClick={handleOpen}>Open</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 400, height: 200 }}>
                    <div className="close-modal-container">
                        <Button className="close-modal" onClick={handleClose}>Close</Button>
                    </div>
                    <form className="form-note">
                        <p style={{ color: "black" }}>Note</p>
                        <textarea className="text-area" />
                        <input type="submit" value={'ADD'}/>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default FavoritesDetails;