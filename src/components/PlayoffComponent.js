import React, { useEffect, useState } from "react";
import Playoffs from './playoffs';



import jokic from '../images/2.png';
import jimmy from '../images/1.png';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link, Route, Switch } from "react-router-dom";


const PlayoffComponent = () => {


    const [conference, setConference] = useState(1);
    const [rounds, setRounds] = useState(1);
    const [id, setId] = useState(1);



    const incrementConference = (e) => {
        e.preventDefault();
        if (conference < 2) {
            setConference(conference + 1);
        }
    }

    const decrementConference = (e) => {
        e.preventDefault();
        if (conference > 1) {
            setConference(conference - 1);
        }
    }

    const incrementRounds = (e) => {
        e.preventDefault();
        if (rounds < 4) {
            setRounds(rounds + 1);
        }
    }

    const decrementRounds = (e) => {
        e.preventDefault();
        if (rounds > 1) {
            setRounds(rounds - 1);
        }
    }

    const handleFirstButton = (e) => {
        if (conference === 1 && rounds === 1) {
            setId(1);
        } else if (conference === 1 && rounds === 2) {
            setId(5);
        } else if (conference === 1 && rounds === 3) {
            setId(7);
        } else if (conference === 1 && rounds === 4) {
            setId(8)
        } else if (conference === 2 && rounds === 1) {
            setId(9)
        } else if (conference === 2 && rounds === 2) {
            setId(13)
        } else if (conference === 2 && rounds === 3) {
            setId(15)
        } else if (conference === 2 && rounds === 4) {
            setId(8)
        }
    }

    const handleSecondButton = (e) => {
        if (conference === 1 && rounds === 1) {
            setId(2);
        } else if (conference === 1 && rounds === 2) {
            setId(6);
        } else if (conference === 2 && rounds === 1) {
            setId(10)
        } else if (conference === 2 && rounds === 2) {
            setId(14)
        }
    }

    const handleThirdButton = (e) => {
        if (conference === 1 && rounds === 1) {
            setId(3);
        } else if (conference === 2 && rounds === 1) {
            setId(11)
        }
    }

    const handleFourthButton = (e) => {
        if (conference === 1 && rounds === 1) {
            setId(4);
        } else if (conference === 2 && rounds === 1) {
            setId(12)
        }
    }

    

    return (
        <div>
            <div className='games'>
                <div className='games-between'>
                    <p className='games-logo'>Game Schedule</p>
                    <div className='date-container'>
                        <button
                            onClick={decrementConference}
                        >
                            <AiOutlineArrowLeft className='arrow-icon' />
                        </button>
                        <p className='games-date'>{conference === 1 ? 'DOĞU KONFERANSI' : 'BATI KONFERANSI'}</p>
                        <button
                            onClick={incrementConference}
                        >
                            <AiOutlineArrowRight className='arrow-icon' />
                        </button>
                    </div>
                    <div className='date-container'>
                        <button
                            onClick={decrementRounds}
                        >
                            <AiOutlineArrowLeft className='arrow-icon' />
                        </button>
                        <p className='games-date'>{rounds === 1 ? 'FIRST ROUND' : rounds === 2 ? 'SECOND ROUND' : rounds === 3 ? 'CONFERENCE FINALS' : 'NBA FINALS'}</p>
                        <button
                            onClick={incrementRounds}
                        >
                            <AiOutlineArrowRight className='arrow-icon' />
                        </button>
                    </div>
                </div>
                <div className='games-between' id='finalist-players'>
                    <img src={jokic} className='faceplayer-logo' alt='logo' />
                    <img src={jimmy} className='faceplayer-logo' alt='logo' />
                </div>
            </div>

            <div className='game-details'>

                <div className='rounds'>

                    <Link to={`/playoffs/${id}`} onClickCapture={handleFirstButton} style={rounds > 2 ? { marginRight: '45%' } : { marginRight: '0' }}>
                        {
                            conference === 1 && rounds === 1 ? 'Milwaukee vs Miami'
                                : conference === 1 && rounds === 2 ? 'New York vs Miami'
                                    : conference === 1 && rounds === 3 ? 'Boston vs Miami'
                                        : conference === 1 && rounds === 4 ? 'Denver vs Miami'
                                            : conference === 2 && rounds === 1 ? 'Denver vs Minnesota'
                                                : conference === 2 && rounds === 2 ? 'Denver vs Phoneix'
                                                    : conference === 2 && rounds === 3 ? 'Denver vs Lakers'
                                                        : conference === 2 && rounds === 4 ? 'Denver vs Miami'
                                                            : ''
                        }
                    </Link>

                    <Link
                        to={`/playoffs/${id}`}
                        onClickCapture={handleSecondButton}
                        style={
                            rounds > 2 ? { display: 'none' } : { display: '' }
                        }

                    >
                        {
                            conference === 1 && rounds === 1 ? 'Boston vs Atlanta'
                                : conference === 1 && rounds === 2 ? 'Boston vs Philadelphia'
                                    : conference === 2 && rounds === 1 ? 'Memphis vs Lakers'
                                        : conference === 2 && rounds === 2 ? 'Golden State vs Lakers'
                                            : ''
                        }
                    </Link>
                    <Link
                        to={`/playoffs/${id}`}
                        onClickCapture={handleThirdButton}
                        style={
                            rounds > 1 ? { display: 'none' } : { display: '' }
                        }
                    >
                        {
                            conference === 1 && rounds === 1 ? 'Philadephia vs Brooklyn'
                                : conference === 2 && rounds === 1 ? 'Sacramento vs Golden State'
                                    : ''
                        }
                    </Link>
                    <Link
                        to={`/playoffs/${id}`}
                        onClickCapture={handleFourthButton}
                        style={
                            rounds > 1 ? { display: 'none' } : { display: '' }
                        }
                    >
                        {
                            conference === 1 && rounds === 1 ? 'Cleveland vs New York'
                                : conference === 2 && rounds === 1 ? 'Phoneix vs Clippers'
                                    : ''
                        }
                    </Link>
                </div>

                {/* <div className='details-main-container'>
                    {
                        <Playoffs pos={id}/>
                    }
                </div> */}
            </div>
        </div>
    );
}

export default PlayoffComponent;
