import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRef } from "react";
import GeneralStats from "./GeneralStats";
import PersonalStats from "./PersonalStats";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';





const ScoreDetails = () => {

    let history = useHistory();
    const params = useParams()

    let gameId = JSON.parse(params.id)
    let seriId = JSON.parse(params.serid)

    const [options, setOptions] = useState(0);
    const [showData, setShowData] = useState({});
    const [userInfo, setUserInfo] = useState({})
    const [userFavs, setFavs] = useState([]);
    const [yellow, setYellow] = useState([]);


    useEffect(() => {
        axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/games/${seriId}/${gameId}`)
            .then((res) => {
                setShowData(res.data);
            })
    }, [seriId, gameId])

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userinfo"))
        if (userInfo) {
            setUserInfo(userInfo)
            axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/favs/user/${userInfo.user_id}`, { headers: { Authorization: userInfo.token } })
                .then((res) => {
                    console.log(res)
                    setFavs(res.data)
                    setYellow("")
                }).catch((err) => {
                    console.log(err)
                })
        }
    }, [])


    const handleGeneral = () => {
        setOptions(0);
    }

    const handlePersonal = () => {
        setOptions(1);
    }


    const ref1 = useRef(null);
    const handleClick = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleFavsForGames = () => {
        if (!userInfo.token) {
            history.push("/login")
        } else {
            let newFav = {
                type: 3,
                type_id: showData.id,
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

    const showToastMessage = () => {
        toast.success('Added to the Favs !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            onClose: () => history.push("/favs/games"),
        });
    };

    const fav = userFavs.filter((fav) => fav.type === 3 && fav.type_id === showData.id)
    console.log("fav", fav)

    return (
        <div className="score-details-container">
            {
                JSON.stringify(showData) === '{}'
                    ?
                    <div>
                        Yükleniyor...
                    </div>
                    :
                    <div className='opening-scors'>
                        <div className='first team'>
                            <img src={showData.gameId === 1 || showData.gameId === 2 || showData.gameId === 5 || showData.gameId === 7 ? require(`../images/${showData.firstTeamLogo}.png`) : require(`../images/${showData.secondTeamLogo}.png`)} className='team-logo' alt='logo' />
                            <p className='opening-ps'>{showData.gameId === 1 || showData.gameId === 2 || showData.gameId === 5 || showData.gameId === 7 ? showData.firstTeamName : showData.secondTeamName}</p>
                        </div>
                        <div className="outside-of-games">
                            <button onClick={handleFavsForGames} className='star-icon-button'>
                                <FontAwesomeIcon color={fav.length === 1 ? 'yellow' : 'white'} className={`star-icon ${yellow}`} icon={faStar} />
                            </button>
                            <div className="details-opening-scorebox">
                                <p className='opening-ps main-info'>
                                    {showData.gameId === 1 || showData.gameId === 2 || showData.gameId === 5 || showData.gameId === 7 ? showData.firstTeamScore : showData.secondTeamScore}
                                </p>
                                <p className='opening-ps main-info'>FINAL</p>
                                <p
                                    className='opening-ps main-info'>
                                    {showData.gameId === 1 || showData.gameId === 2 || showData.gameId === 5 || showData.gameId === 7 ? showData.secondTeamScore : showData.firstTeamScore}
                                </p>
                            </div>
                        </div>
                        <div className='second team'>
                            <img src={showData.gameId === 1 || showData.gameId === 2 || showData.gameId === 5 || showData.gameId === 7 ? require(`../images/${showData.secondTeamLogo}.png`) : require(`../images/${showData.firstTeamLogo}.png`)} className='team-logo' alt='logo' />
                            <p className='opening-ps'>{showData.gameId === 1 || showData.gameId === 2 || showData.gameId === 5 || showData.gameId === 7 ? showData.secondTeamName : showData.firstTeamName}</p>
                        </div>
                    </div>
            }
            <ToastContainer />
            <div className="stats-options">
                <button className="options-buttons" onClick={() => { handleGeneral(); handleClick(ref1) }}>
                    General Stats
                </button>
                <button className="options-buttons" onClick={() => { handlePersonal(); handleClick(ref1) }}>
                    Personal Stats
                </button>
            </div>
            <div ref={ref1} className="stats-main-container">
                {
                    options === 0 ? (<GeneralStats gid={gameId} sid={seriId} />) : options === 1 ? (<PersonalStats gid={gameId} sid={seriId} ftid={showData.firstTeamId} stid={showData.secondTeamId} ftName={showData.firstTeamName} stName={showData.secondTeamName} />) : 'Yükleniyor...'
                }
            </div>
            <button className="options-buttons" id="back" onClick={() => history.goBack()}>BACK</button>
        </div>
    );
}

export default ScoreDetails;