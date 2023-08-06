import React from "react";
import { Link } from "react-router-dom";




const PersonalFirstTeam = (props) => {

    const { stats } = props;


    return (

        <tbody>
            {
                stats.map((game) => {
                    return (
                        <tr key={game.playerId}>
                            <td className="standing-teams">{game.playerName}</td>
                            <td>{game.playerTime}</td>
                            <td>{game.playerPts}</td>
                            <td>{game.playerReb}</td>
                            <td>{game.playerAst}</td>
                            <td>{game.playerBlk}</td>
                            <td>{game.playerStl}</td>
                            <td>{game.player2PtsMade}/{game.player2PtsTry}</td>
                            <td>%{game.player2PtsTry === 0 ? 0 : Math.floor((game.player2PtsMade / game.player2PtsTry) * 100)}</td>
                            <td>{game.player3PtsMade}/{game.player3PtsTry}</td>
                            <td>%{game.player3PtsTry === 0 ? 0 : Math.floor((game.player3PtsMade / game.player3PtsTry) * 100)}</td>
                            <td>{game.playerFtMade}/{game.playerFtTry}</td>
                            <td>%{game.playerFtTry === 0 ? 0 : Math.floor((game.playerFtMade / game.playerFtTry) * 100)}</td>
                            <td>{game.playerTo}</td>
                            <td>{game.playerFaul}</td>
                        </tr>
                    )
                })
            }
        </tbody>

    );
}

export default PersonalFirstTeam;