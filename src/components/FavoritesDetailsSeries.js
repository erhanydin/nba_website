import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import FavSeries from "./FavSeries";





const FavoritesDetailsSeries = (props) => {

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
            <h5>SERIES</h5>
            {
                fav.length === 0 ?
                    <div className="no-fav-info">
                        You have no fav Series
                    </div>
                    :
                    <table className="table-favs">
                        <thead>
                            <tr>
                                <th id="fav-headtohead">Teams</th>
                                <th id="fav-ranking" className="standing-teams">FT Standing </th>
                                <th>First Team Name</th>
                                <th>First Team Logo</th>
                                <th>Second Team Logo</th>
                                <th>Second Team Name</th>
                                <th id="fav-ranking">ST Standing</th>
                                <th>Winner</th>
                                <th>Loser</th>
                                <th></th>
                            </tr>
                        </thead>
                        {
                            fav.map((favo) => {
                                return (
                                    <FavSeries toast={showToastMessage} favos={favo} />
                                )
                            })
                        }
                    </table>
            }

        </div>

    );
}

export default FavoritesDetailsSeries;