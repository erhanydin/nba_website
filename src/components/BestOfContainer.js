import axios from "axios";
import React, { useEffect, useState } from "react";
import BestOf from "./BestOf";



const BestOfContainer = () => {

    const [specialWord, setSpecialWord] = useState("playerGpts")
    const [bestData, setBestData] = useState([])

    useEffect(() => {
        axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/bests/${specialWord}`)
            .then((res) => {
                console.log(res.data)
                setBestData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [specialWord])



    return (
        <div className="best-of-container">
            <h1>Best Of 2022-2023 NBA SEASON</h1>
            <div className="pstats-team-choice bests-options">
                <button onClick={() => setSpecialWord("playerGpts")}>Points</button>
                <button onClick={() => setSpecialWord("playerRb")}>Rebounds</button>
                <button onClick={() => setSpecialWord("playerAst")}>Assists</button>
                <button onClick={() => setSpecialWord("playerBlk")}>Blocks</button>
                <button onClick={() => setSpecialWord("playerStl")}>Steals</button>
            </div>
            <div className="bestof-stats">
                <h2>
                    {
                        specialWord === "playerGpts" ? "Points Per Game" : specialWord === "playerRb" ? "Rebounds Per Game" : specialWord === "playerAst" ? "Assists Per Game"
                            : specialWord === "playerStl" ? "Steals Per Game" : "Blocks Per Game"
                    }
                </h2>
                {
                    bestData.length === 0
                        ?
                        <div>
                            Yükleniyor...
                        </div>
                        :
                        <table className="table-favs">
                            <thead>
                                <tr>
                                    <th>Player Name</th>
                                    <th></th>
                                    <th></th>
                                    <th>
                                        {
                                            specialWord === "playerGpts" ? "PPG" : specialWord === "playerRb" ? "RPG" : specialWord === "playerApg" ? "APG"
                                                : specialWord === "playerStl" ? "SPG" : "BPG"
                                        }
                                    </th>
                                </tr>
                            </thead>


                            <BestOf besto={bestData} sw={specialWord} />


                        </table>
                }
            </div>
        </div>
    );
}

export default BestOfContainer;