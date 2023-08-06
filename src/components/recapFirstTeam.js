import React from "react";




const RecapFirstTeam = (props) => {

    const { rcp } = props;


    return (
        <tbody>
            {
                rcp.map((game) => {
                    return (
                        <tr key={game.playerId}>
                            <td className="standing-teams">{game.playerName}</td>
                            <td>{game.tpg}</td>
                            <td>{game.ppg}</td>
                            <td>{game.rpg}</td>
                            <td>{game.apg}</td>
                            <td>{game.totalBlocks}</td>
                            <td>{game.totalSteals}</td>
                            <td>{game.twoPMade}/{game.twoPTry}</td>
                            <td>{game.threePMade}/{game.threePTry}</td>
                            <td>{game.ftMade}/{game.ftTry}</td>
                            <td>{game.gameCounts}</td>
                        </tr>
                    )
                })
            }
        </tbody>
    );
}

export default RecapFirstTeam;