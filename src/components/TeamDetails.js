import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReactCountryFlag from "react-country-flag"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const TeamDetails = () => {

    const history = useHistory();
    const params = useParams();
    let tid = JSON.parse(params.id);

    const [userInfo, setUserInfo] = useState({})
    const [team, setTeam] = useState({});
    const [players, setPlayers] = useState([]);
    const [userFavs, setFavs] = useState([]);
    const [yellow, setYellow] = useState([]);


    useEffect(() => {
        Promise.all([
            fetch(`https://erhanba-71679337ef80.herokuapp.com/api/teams/${tid}`),
            fetch(`https://erhanba-71679337ef80.herokuapp.com/api/players/team/${tid}`),
        ])
            .then(([resTeam, resPlayer]) =>
                Promise.all([resTeam.json(), resPlayer.json()])
            )
            .then(([dataTeam, dataPlays]) => {
                setTeam(dataTeam);
                setPlayers(dataPlays);
            });
    }, [tid]);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userinfo"))
        if (userInfo) {
            setUserInfo(userInfo)
            axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/favs/user/${userInfo.user_id}`, { headers: { Authorization: userInfo.token } })
                .then((res) => {
                    setFavs(res.data)
                    setYellow("")
                }).catch((err) => {
                    console.log(err)
                })
        }
    }, [])

    const flagRenderer = (countryCode) => <ReactCountryFlag className="flags" countryCode={countryCode} svg />

    const handleFavsForTeams = () => {
        if (!userInfo.token) {
            history.push("/login")
        } else {
            let newFav = {
                type: 0,
                type_id: team.teamId,
                user_id: userInfo.user_id
            }

            axios.post("https://erhanba-71679337ef80.herokuapp.com/api/favs", newFav, { headers: { "Authorization": userInfo.token } })
                .then((res) => {
                    console.log(res)
                    showToastMessage();
                    setYellow("yellow")
                    // history.push("/favs")
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    const showToastMessage = () => {
        toast.success('Added to the Favs !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            onClose: () => history.push("/favs/teams"),
        });
    };

    const showToastMessageForPlayers = () => {
        toast.success('Added to the Favs !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            onClose: () => history.push("/favs/players"),
        });
    };


    const fav = userFavs.filter((fav) => fav.type === 0 && fav.type_id === team.teamId)

    return (
        JSON.stringify(team) === '{}'
            ?
            <div>
                Yükleniyor...
            </div>
            :
            <div style={{ color: 'white' }}>
                <div className='team-dets'>
                    <div className="star-img-container">
                        <button
                            onClick={handleFavsForTeams}
                            className="star-icon-button"
                        >
                            <FontAwesomeIcon
                                color={fav.length === 1 ? 'yellow' : 'white'}
                                className={`star-icon ${yellow}`}
                                icon={faStar}
                            />
                        </button>
                        <img src={require(`../images/${team.teamLogo}.png`)} alt='logo' />
                    </div>
                    <div className='roster'>
                        <p className='stats-t-name'>{team.teamName}</p>
                        <p className='stats-main-info'>Roster and Stats</p>
                    </div>
                </div>
                <ToastContainer />
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th className="standing-teams">Name</th>
                                <th>NTN</th>
                                <th>Age</th>
                                <th>Games</th>
                                <th>Mins</th>
                                <th>2-PTS %</th>
                                <th>3-PTS %</th>
                                <th className="vertical">FT %</th>
                                <th>RPG</th>
                                <th>APG</th>
                                <th>SPG</th>
                                <th>BPG</th>
                                <th>ToPG</th>
                                <th>PPG</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                players.map((player) => {
                                    return (
                                        <tr key={player.playerId}>
                                            <td>
                                                <button
                                                    id="star-icon-button-players"
                                                    className="star-icon-button"
                                                    onClick={() => {
                                                        if (!userInfo.token) {
                                                            history.push("/login")
                                                        } else {
                                                            let newFav = {
                                                                type: 1,
                                                                type_id: player.playerId,
                                                                user_id: userInfo.user_id
                                                            }

                                                            axios.post("https://erhanba-71679337ef80.herokuapp.com/api/favs", newFav, { headers: { "Authorization": userInfo.token } })
                                                                .then((res) => {
                                                                    console.log(res)
                                                                    // history.push("/favs") 
                                                                    showToastMessageForPlayers()
                                                                }).catch((err) => {
                                                                    console.log(err)
                                                                })
                                                        
                                                                
                                                        }
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        color={userFavs.filter((fav) => fav.type === 1 && fav.type_id === player.playerId).length === 1 ? 'yellow' : 'white'}
                                                        id="star-icon-players"
                                                        className={`star-icon`} 
                                                        icon={faStar}
                                                    />
                                                </button>
                                            </td>
                                            <td className="standing-teams">{player.playerName}</td>
                                            <td>{flagRenderer(player.playerCountry)}</td>
                                            <td>{player.playerAge}</td>
                                            <td>{player.playerGame}</td>
                                            <td>{player.playerGmp}</td>
                                            <td>%{player.player2PtsPerc}</td>
                                            <td>%{player.player3PtsPerc}</td>
                                            <td className="vertical">%{player.playerFtPtsPerc}</td>
                                            <td>{player.playerRb}</td>
                                            <td>{player.playerAst}</td>
                                            <td>{player.playerStl}</td>
                                            <td>{player.playerBlk}</td>
                                            <td>{player.playerTo}</td>
                                            <td>{player.playerGpts}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <button className="options-buttons" id="back" onClick={() => history.goBack()}>BACK</button>

            </div>
    );
}

export default TeamDetails;