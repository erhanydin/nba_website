import React from "react";
import { Link } from "react-router-dom";




const TeamsEast = (props) => {

    const { teams } = props;

    return (
        <tbody>
            {
                teams.map((team) => {
                    return (
                        <tr key={team.teamId}>
                            <td style={
                                team.teamId < 7 || (team.teamId > 15 && team.teamId < 22) ? { backgroundColor: '#002FBC', color: 'white' }
                                    : (team.teamId >= 7 && team.teamId < 11) || (team.teamId >= 22 && team.teamId < 26) ? { backgroundColor: '#00BDFC', color: 'white' } : { backgroundColor: '', color: '' }
                            }
                            >{team.teamId > 15 ? team.teamId - 15 : team.teamId}</td>
                            <td className="standing-teams table-border"><Link to={`/standings/${team.teamId}`}>{team.teamName}</Link></td>
                            <td>{team.teamWins}</td>
                            <td>{team.teamLoss}</td>
                            <td className="table-border">{(team.teamWins / 82).toFixed(3)}</td>
                            <td>{team.teamPointsMade}</td>
                            <td>{team.teamPointsSaw}</td>
                            <td className="table-border">{team.teamAv}</td>
                            <td>{team.teamHomeWins}-{team.teamHomeLosses}</td>
                            <td>{team.teamHomePointsMade}</td>
                            <td className="table-border">{team.teamHomePointsSaw}</td>
                            <td>{team.teamAwayWins}-{team.teamAwayLosses}</td>
                            <td>{team.teamAwayPointsMade}</td>
                            <td>{team.teamAwayPointsSaw}</td>
                        </tr>
                    )
                })
            }
        </tbody>
    );
}

export default TeamsEast;