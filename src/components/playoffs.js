import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios'
import RecapFirstTeam from './recapFirstTeam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Playoffs = (props) => {

    const history = useHistory()
    const params = useParams();
    let serId = JSON.parse(params.id);

    const [actualData, setActualData] = useState([]);
    const [recap, setRecap] = useState([])
    const [opt, setOpt] = useState(0);
    const [userInfo, setUserInfo] = useState({})
    const [userFavs, setFavs] = useState([]);
    const [yellow, setYellow] = useState([]);




    useEffect(() => {
        axios.all([
            axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/games/${serId}`),
            axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/bof/${serId}`)
        ])
            .then(axios.spread((res1, res2) => {
                setActualData(res1.data)
                setRecap(res2.data)
            }))
    }, [serId])

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

    const handleFirstTeam = () => {
        setOpt(0);
    }

    const handleSecondTeam = () => {
        setOpt(1);
    }


    const handleFavsForSeries = () => {
        if (!userInfo.token) {
            history.push("/login")
        } else {
            let newFav = {
                type: 2,
                type_id: actualData[0].seriesId,
                user_id: userInfo.user_id
            }

            axios.post("https://erhanba-71679337ef80.herokuapp.com/api/favs", newFav, { headers: { "Authorization": userInfo.token } })
                .then((res) => {
                    console.log(res)
                    setYellow("yellow")
                    showToastMessage()
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    const fav = userFavs.filter((fav) => fav.type === 2 && fav.type_id === actualData[0].seriesId)
    console.log("fav", fav)

    const showToastMessage = () => {
        toast.success('Added to the Favs !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            onClose: () => history.push("/favs/series"),
        });
    };

    return (
        <div className='details-main-container'>
            {
                actualData.length === 0
                    ?
                    <div>Yükleniyor...</div>
                    :
                    <div className='opening-scors'>
                        <div className='first team'>
                            <img src={require(`../images/${actualData[0].firstTeamLogo}.png`)} className='team-logo' alt='logo' />
                            <p className='opening-ps'>{actualData[0].firstTeamName}</p>
                        </div>
                        <div>
                            <button onClick={handleFavsForSeries} className='star-icon-button'>
                                <FontAwesomeIcon color={fav.length === 1 ? 'yellow' : 'white'} className={`star-icon ${yellow}`} icon={faStar} />
                            </button>
                            <p className='opening-ps main-info'>{actualData[0].firstTeamName} vs {actualData[0].secondTeamName} Series </p>
                        </div>
                        <div className='second team'>
                            <img src={require(`../images/${actualData[0].secondTeamLogo}.png`)} className='team-logo' alt='logo' />
                            <p className='opening-ps' >{actualData[0].secondTeamName}</p>
                        </div>
                    </div>
            }
            <ToastContainer />
            <div className='pos'>
                {
                    actualData.map((series) => {
                        return (
                            <div key={series.gameId} className='scorbox-container'>
                                <div className='game-numbers-container'>
                                    <p className='game-numbers'>GAME {series.gameId}</p>
                                </div>
                                <div className='scorbox'>
                                    <div className='first team'>
                                        <img src={series.gameId === 1 || series.gameId === 2 || series.gameId === 5 || series.gameId === 7 ? require(`../images/${series.firstTeamLogo}.png`) : require(`../images/${series.secondTeamLogo}.png`)} className='team-logo' alt='logo' />
                                        <div className='team-name'>{series.gameId === 1 || series.gameId === 2 || series.gameId === 5 || series.gameId === 7 ? series.firstTeamName : series.secondTeamName}</div>
                                    </div>
                                    <div className='scores-container'>
                                        <div className='scores'>
                                            <div
                                                style=
                                                {
                                                    (series.gameId === 1 || series.gameId === 2 || series.gameId === 5 || series.gameId === 7) && series.firstTeamScore > series.secondTeamScore ? { color: 'green' }
                                                        : (series.gameId === 3 || series.gameId === 4 || series.gameId === 6) && series.firstTeamScore < series.secondTeamScore ? { color: 'green' } : { color: 'white' }
                                                }
                                                className='score'>
                                                {series.gameId === 1 || series.gameId === 2 || series.gameId === 5 || series.gameId === 7 ? series.firstTeamScore : series.secondTeamScore}
                                            </div>
                                            <div className='final'>-</div>
                                            <div
                                                style=
                                                {
                                                    (series.gameId === 1 || series.gameId === 2 || series.gameId === 5 || series.gameId === 7) && series.firstTeamScore < series.secondTeamScore ? { color: 'green' }
                                                        : (series.gameId === 3 || series.gameId === 4 || series.gameId === 6) && series.firstTeamScore > series.secondTeamScore ? { color: 'green' } : { color: 'white' }
                                                }
                                                className='score'>
                                                {series.gameId === 1 || series.gameId === 2 || series.gameId === 5 || series.gameId === 7 ? series.secondTeamScore : series.firstTeamScore}
                                            </div>
                                        </div>
                                        <div className='leads-ties'>
                                            {
                                                series.ftWins > series.stWins && series.ftWins !== 4 ? `${series.firstTeamLogo.toUpperCase()} LEADS ${series.ftWins}-${series.stWins}`
                                                    : series.stWins > series.ftWins && series.stWins !== 4 ? `${series.secondTeamLogo.toUpperCase()} LEADS ${series.stWins}-${series.ftWins}`
                                                        : series.stWins === series.ftWins ? `TIE ${series.ftWins}-${series.stWins}`
                                                            : series.ftWins === 4 && series.ftWins > series.stWins ? `${series.firstTeamLogo.toUpperCase()} WON ${series.ftWins}-${series.stWins}`
                                                                : series.stWins === 4 && series.stWins > series.ftWins ? `${series.secondTeamLogo.toUpperCase()} WON ${series.stWins}-${series.ftWins}`
                                                                    : ''
                                            }
                                        </div>
                                    </div>
                                    <div className='second team'>
                                        <img src={series.gameId === 1 || series.gameId === 2 || series.gameId === 5 || series.gameId === 7 ? require(`../images/${series.secondTeamLogo}.png`) : require(`../images/${series.firstTeamLogo}.png`)} className='team-logo' alt='logo' />
                                        <div className='team-name'>{series.gameId === 1 || series.gameId === 2 || series.gameId === 5 || series.gameId === 7 ? series.secondTeamName : series.firstTeamName}</div>
                                    </div>
                                </div>
                                <div className='view-details'>
                                    <Link
                                        to={`/series/${series.seriesId}/${series.gameId}`}
                                        className='details-button'>View Details
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='opening-scors' id='recap'>
                <p className='opening-ps main-info'>SERIES RECAP</p>
                {
                    actualData.length === 0
                        ?
                        <div>Yükleniyor...</div>
                        :
                        <div className="pstats-team-choice">
                            <button onClick={handleFirstTeam}>{actualData[0].firstTeamName}</button>
                            <button onClick={handleSecondTeam}>{actualData[0].secondTeamName}</button>
                        </div>
                }
                <div className=''>
                    <table>
                        <thead>
                            <tr>
                                <th className="standing-teams">Player Name</th>
                                <th>Min Per Game</th>
                                <th>Pts Per Game</th>
                                <th>Rebs Per Game</th>
                                <th>Ast Per Game</th>
                                <th>Total Block</th>
                                <th>Total Steal</th>
                                <th>2 Pts</th>
                                <th>3 Pts</th>
                                <th>FT</th>
                                <th>Game Played</th>
                            </tr>
                        </thead>

                        <RecapFirstTeam
                            rcp={recap.filter((recap) => {
                                if (opt === 0) {
                                    return recap.teamId === actualData[0].firstTeamId
                                } else {
                                    return recap.teamId === actualData[0].secondTeamId
                                }
                            })}
                        />
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Playoffs;

