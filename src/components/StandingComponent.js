import React, { useEffect, useState } from "react";
import TeamsEast from "./TeamsEast";
import BestOfContainer from "./BestOfContainer";


const StandingComponent = () => {

    const [dataTeams, setDataTeams] = useState([])
    const [options, setOptions] = useState(0)


    useEffect(() => {
        const fetchTeamsData = () => {
            fetch("https://erhanba-71679337ef80.herokuapp.com/api/teams/")
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setDataTeams(data);
                    console.log(data);
                })
        }
        fetchTeamsData();
    }, []);


    const handleEast = () => {
        setOptions(0);
    }

    const handleWest = () => {
        setOptions(1);
    }

    console.log(dataTeams)


    return (
        <div className="standing-container">
            <div className="pstats-team-choice">
                <button className="standings-options" onClick={handleEast}>Eastern Conference</button>
                <button className="standings-options" onClick={handleWest}>Western Conference</button>
            </div>
            {
                JSON.stringify(dataTeams) === '{}'
                    ?
                    <div>
                        Yükleniyor...
                    </div>
                    :
                    <div className="standing-table">
                        <table>
                            <thead className="standing-thead">
                                <tr>
                                    <th className="standing-st"></th>
                                    <th className="standing-teams">Team</th>
                                    <th className="standing-w-l">W</th>
                                    <th className="standing-w-l">L</th>
                                    <th>PCT</th>
                                    <th>PPG</th>
                                    <th>OPP PPG</th>
                                    <th>DIFF</th>
                                    <th>HOME</th>
                                    <th>H - PPG</th>
                                    <th>H - OPP PPG</th>
                                    <th>AWAY</th>
                                    <th>A - PPG</th>
                                    <th>A - OPP PPG</th>
                                </tr>
                            </thead>

                            <TeamsEast teams={dataTeams.filter((team) => {
                                if (options === 0) {
                                    return team.teamId < 16
                                } else {
                                    return team.teamId > 15
                                }
                            })} />
                        </table>
                    </div>
            }
            
        </div>
    );
}

export default StandingComponent;