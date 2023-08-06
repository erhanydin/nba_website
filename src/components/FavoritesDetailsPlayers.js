import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import FavPlayers from "./FavPlayers";

const FavoritesDetailsPlayers = (props) => {

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



    return (
        <div className="fav-h5">
            <h5>PLAYERS</h5>
            {
                fav.length === 0 ?
                    <div className="no-fav-info">
                        You have no fav Player
                    </div>
                    :
                    <table className="table-favs">
                        <thead>
                            <tr>
                                <th className="standing-teams">Player Name</th>
                                <th>Player Country</th>
                                <th>Player Age</th>
                                <th>Player Pts</th>
                                <th>Player Reb</th>
                                <th>Player Ast</th>
                                <th></th>
                            </tr>
                        </thead>
                        {
                            fav.map((favo) => {
                                return (
                                    <FavPlayers toast={showToastMessage} favos={favo} />
                                )
                            })
                        }
                    </table>
            }
        </div>


    );
}

export default FavoritesDetailsPlayers;