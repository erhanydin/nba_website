import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonalFirstTeam from "./PersonalFirstTeam";

const PersonalStats = (props) => {

    // let newData = dataGames.filter(game => game.gameId === gid && game.seriesId === sid);
    // console.log(newData)

    const { gid, sid, ftid, stid, ftName, stName } = props;

    
    const [newData, setNewData] = useState([]);
    const [options, setOptions] = useState(0);

    useEffect(() => {
        axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/personal/${sid}/${gid}`)
            .then((res) => {
                setNewData(res.data);
                console.log(res.data)
            })
    }, [sid, gid])

    
    

    const handleFirstTeam = () => {
        setOptions(0);
    }

    const handleSecondTeam = () => {
        setOptions(1);
    }




    return (
        <div className="personal-stats-container">
            <div className="pstats-team-choice">
                <button onClick={handleFirstTeam}>{ftName}</button>
                <button onClick={handleSecondTeam}>{stName}</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th className="standing-teams">Name</th>
                            <th>Time</th>
                            <th>Pts</th>
                            <th>Trb</th>
                            <th>Ast</th>
                            <th>Blk</th>
                            <th>Stl</th>
                            <th>2 Pts</th>
                            <th>2 Pts %</th>
                            <th>3 Pts</th>
                            <th>3 Pts %</th>
                            <th>FT</th>
                            <th>FT %</th>
                            <th>TOs</th>
                            <th>Fauls</th>
                        </tr>
                    </thead>
                    <PersonalFirstTeam 
                        stats={newData.filter((player) => {
                            if(options === 0) {
                                return player.teamId === ftid
                            } else {
                                return player.teamId === stid
                            }
                        })}
                    />
                </table>
            </div>
        </div>
    );
}

export default PersonalStats;