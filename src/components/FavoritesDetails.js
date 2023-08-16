import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import FavTeams, { newNoteFav, noteForSUD, noteIdForSUD } from "./FavTeamsTable";
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
    const [openS, setOpenS] = useState(false)
    const [form, setForm] = useState("")
    const [formS, setFormS] = useState("")

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenS = () => {
        setFormS(noteForSUD.note_details)
        setOpenS(true)
    };
    const handleCloseS = () => setOpenS(false);



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

    const showToastMessageForNotes = (keyword) => {
        toast.success(`Note ${keyword} succesfully !`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            onClose: () => window.location.reload(),
            className: 'toast-message'
        });
    };

     

    const handleFormChange = (event) => {
        setForm(event.target.value)
    }

    const handleFormChangeS = (event) => {
        setFormS(event.target.value)
    }

    const handlePostNote = (event) => {

        event.preventDefault()

        let newNote = {
            note_details: form,
            favs_id: newNoteFav
        }

        axios.post("https://erhanba-71679337ef80.herokuapp.com/api/notes/", newNote)
            .then((res) => {
                showToastMessageForNotes("added")
                handleClose()

            }).catch((err) => {
                console.log(err)
            })
    }

    const handleUpdateNote = (event) => {

        event.preventDefault()

        let newNote = {
            note_details: formS,
        }

        axios.put(`https://erhanba-71679337ef80.herokuapp.com/api/notes/${noteForSUD.note_id}`, newNote)
            .then((res) => {
                showToastMessageForNotes("updated")
                handleClose()

            }).catch((err) => {
                console.log(err)
            })
    }

    const handleDeleteNote = (event) => {

        event.preventDefault()

        axios.delete(`https://erhanba-71679337ef80.herokuapp.com/api/notes/${noteForSUD.note_id}`)
            .then((res) => {
                showToastMessageForNotes("deleted")
                handleClose()

            }).catch((err) => {
                console.log(err)
            })
    }


    console.log("noteFav", newNoteFav, "noteId", noteForSUD.note_id);
    console.log(formS)

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

                            <tr key={0}>
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
                                    <FavTeams openMoral={handleOpen} openMoralS={handleOpenS} toast={showToastMessage} favos={favo} />
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
                <Box sx={{ ...style, width: 400, height: 220 }}>
                    <div className="close-modal-container">
                        <Button className="close-modal" onClick={handleClose}>Close</Button>
                    </div>
                    <form onSubmit={handlePostNote} className="form-note">
                        <p style={{ color: "black" }}>Note</p>
                        <textarea
                            className="text-area"
                            placeholder="Please enter your note"
                            value={form}
                            onChange={handleFormChange}
                        />
                        <input className={`form-button-notes`} type="submit" value={'ADD'} />
                    </form>
                </Box>
            </Modal>
            <Modal
                open={openS}
                onClose={handleCloseS}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 400, height: 280 }}>
                    <div className="close-modal-container">
                        <Button className="close-modal" onClick={handleCloseS}>Close</Button>
                    </div>
                    <form onSubmit={handleUpdateNote} className="form-note">
                        <p style={{ color: "black" }}>Note</p>
                        <textarea
                            className="text-area"
                            placeholder="Please enter your note"
                            value={formS}
                            onChange={handleFormChangeS}
                        />
                        <div className="note-date">
                            {noteForSUD.note_date}
                        </div>
                        <div className="delete-update-buttons">
                            <input className={`form-button-notes`} type="submit" value={'UPDATE'} />
                            <input onClick={handleDeleteNote} className={`form-button-notes`} type="submit" value={'DELETE'} />
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default FavoritesDetails;