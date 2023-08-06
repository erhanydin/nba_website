import React, { useState, useEffect } from "react";
import ProgressBar from '@ramonak/react-progress-bar'
import axios from "axios";


const GeneralStats = (props) => {

    const { sid, gid } = props;
    const [newData, setNewData] = useState({})


    useEffect(() => {
        axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/general/${sid}/${gid}`)
            .then((res) => {
                setNewData(res.data);
                console.log(res.data)
            })
    }, [sid, gid])


    console.log("general", newData)

    let perc2first = Math.round(newData.firstTeam2PtsMade / newData.firstTeam2PtsTry * 100)
    let perc2second = Math.round(newData.secondTeam2PtsMade / newData.secondTeam2PtsTry * 100)

    let perc3first = Math.round(newData.firstTeam3PtsMade / newData.firstTeam3PtsTry * 100)
    let perc3second = Math.round(newData.secondTeam3PtsMade / newData.secondTeam3PtsTry * 100)

    let percFtfirst = Math.round(newData.firstTeamFtMade / newData.firstTeamFtTry * 100)
    let percFtsecond = Math.round(newData.secondTeamFtMade / newData.secondTeamFtTry * 100)

    let totalRebsOfFirstTeam = newData.firstTeamDefReb + newData.firstTeamOffReb;
    let totalRebsOfSecondTeam = newData.secondTeamDefReb + newData.secondTeamOffReb
    let ftRebPer = Math.round(totalRebsOfFirstTeam / (totalRebsOfFirstTeam + totalRebsOfSecondTeam) * 100);
    let stRebPer = Math.round(totalRebsOfSecondTeam / (totalRebsOfFirstTeam + totalRebsOfSecondTeam) * 100);

    if (JSON.stringify(newData) === '{}') {
        console.log(true)
    } else {
        console.log(false)
    }




    return (
        <div className="general-stats-container" style={{ color: 'white' }}>
            {
                JSON.stringify(newData) === '{}'
                    ?
                    <div>
                        Yükleniyor...
                    </div>
                    :
                    <div className="general">
                        <div className="stats-content">
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.firstTeam2PtsMade : newData.secondTeam2PtsMade}/{gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                            newData.firstTeam2PtsTry : newData.secondTeam2PtsTry}
                                </p>
                                <p>
                                    %{gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        perc2first : perc2second}
                                </p>
                            </div>
                            <p>2 PTS</p>
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.secondTeam2PtsMade : newData.firstTeam2PtsMade}/{gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                            newData.secondTeam2PtsTry : newData.firstTeam2PtsTry}
                                </p>
                                <p>
                                    %{gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        perc2second : perc2first}
                                </p>
                            </div>
                        </div>
                        <div className="progress-bar-content">
                            <ProgressBar
                                className="progress-bar"
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ? perc2first : perc2second}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (perc2first > perc2second) ? 'blue' :
                                    (gid === 3 || gid === 4 || gid === 6) && (perc2second > perc2first) ? 'blue' : 'red'}
                                animateOnRender={true}
                            />
                            <ProgressBar
                                className="progress-bar"
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ? perc2second : perc2first}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (perc2second > perc2first) ? 'blue' :
                                    (gid === 3 || gid === 4 || gid === 6) && (perc2first > perc2second) ? 'blue' : 'red'}
                                animateOnRender={true}
                            />
                        </div>

                        {/* 3 points */}

                        <div className="stats-content stat-border">
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.firstTeam3PtsMade : newData.secondTeam3PtsMade}/{gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                            newData.firstTeam3PtsTry : newData.secondTeam3PtsTry}
                                </p>
                                <p>
                                    %{gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        perc3first : perc3second}
                                </p>
                            </div>
                            <p>3 PTS</p>
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.secondTeam3PtsMade : newData.firstTeam3PtsMade}/{gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                            newData.secondTeam3PtsTry : newData.firstTeam3PtsTry}
                                </p>
                                <p>
                                    %{gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        perc3second : perc3first}
                                </p>
                            </div>
                        </div>
                        <div className="progress-bar-content">
                            <ProgressBar
                                className="progress-bar"
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ? perc3first : perc3second}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (perc3first > perc3second) ? 'blue' :
                                    (gid === 3 || gid === 4 || gid === 6) && (perc3second > perc3first) ? 'blue' : 'red'}
                                animateOnRender={true}
                            />
                            <ProgressBar
                                className="progress-bar"
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ? perc3second : perc3first}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (perc3second > perc3first) ? 'blue' :
                                    (gid === 3 || gid === 4 || gid === 6) && (perc3first > perc3second) ? 'blue' : 'red'}
                                animateOnRender={true}
                            />
                        </div>

                        {/* ft */}

                        <div className="stats-content stat-border">
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.firstTeamFtMade : newData.secondTeamFtMade}/{gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                            newData.firstTeamFtTry : newData.secondTeamFtTry}
                                </p>
                                <p>
                                    %{gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        percFtfirst : percFtsecond}
                                </p>
                            </div>
                            <p>FT</p>
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.secondTeamFtMade : newData.firstTeamFtMade}/{gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                            newData.secondTeamFtTry : newData.firstTeamFtTry}
                                </p>
                                <p>
                                    %{gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        percFtsecond : percFtfirst}
                                </p>
                            </div>
                        </div>
                        <div className="progress-bar-content">
                            <ProgressBar
                                className="progress-bar"
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ? percFtfirst : percFtsecond}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (percFtfirst > percFtsecond) ? 'blue' :
                                    (gid === 3 || gid === 4 || gid === 6) && (percFtsecond > percFtfirst) ? 'blue' : 'red'}
                                animateOnRender={true}
                            />
                            <ProgressBar
                                className="progress-bar"
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ? percFtsecond : percFtfirst}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (percFtsecond > percFtfirst) ? 'blue' :
                                    (gid === 3 || gid === 4 || gid === 6) && (percFtfirst > percFtsecond) ? 'blue' : 'red'}
                                animateOnRender={true}
                            />
                        </div>

                        {/* reb */}

                        <div className="stats-content stat-border">
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        totalRebsOfFirstTeam : totalRebsOfSecondTeam}
                                </p>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.firstTeamDefReb : newData.secondTeamDefReb}-{gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                            newData.firstTeamOffReb : newData.secondTeamOffReb}
                                </p>
                            </div>
                            <p>REB</p>
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        totalRebsOfSecondTeam : totalRebsOfFirstTeam}
                                </p>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.secondTeamDefReb : newData.firstTeamDefReb}-{gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                            newData.secondTeamOffReb : newData.firstTeamOffReb}
                                </p>
                            </div>
                        </div>
                        <div className="progress-bar-content">
                            <ProgressBar
                                className="progress-bar"
                                isLabelVisible={false}
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                    ftRebPer
                                    : stRebPer}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (ftRebPer > stRebPer) ? 'blue' :
                                    (gid === 3 || gid === 4 || gid === 6) && (stRebPer > ftRebPer) ? 'blue' : 'red'}
                                animateOnRender={true}
                            />
                            <ProgressBar
                                className="progress-bar"
                                isLabelVisible={false}
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                    stRebPer
                                    : ftRebPer}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (stRebPer > ftRebPer) ? 'blue' :
                                    (gid === 3 || gid === 4 || gid === 6) && (ftRebPer > stRebPer) ? 'blue' : 'red'}
                                animateOnRender={true}
                            />
                        </div>

                        {/* assist */}

                        <div className="stats-content stat-border">
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.firstTeamAssist : newData.secondTeamAssist}
                                </p>
                            </div>
                            <p>ASSIST</p>
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.secondTeamAssist : newData.firstTeamAssist}
                                </p>
                            </div>
                        </div>
                        <div className="progress-bar-content">
                            <ProgressBar
                                className="progress-bar"
                                isLabelVisible={false}
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                    Math.round(newData.firstTeamAssist / (newData.firstTeamAssist + newData.secondTeamAssist) * 100)
                                    : Math.round(newData.secondTeamAssist / (newData.firstTeamAssist + newData.secondTeamAssist) * 100)}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (newData.firstTeamAssist > newData.secondTeamAssist) ? 'blue' :
                                    (gid === 3 || gid === 4 || gid === 6) && (newData.secondTeamAssist > newData.firstTeamAssist) ? 'blue' : 'red'}
                                animateOnRender={true}
                            />
                            <ProgressBar
                                className="progress-bar"
                                isLabelVisible={false}
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                    Math.round(newData.secondTeamAssist / (newData.firstTeamAssist + newData.secondTeamAssist) * 100)
                                    : Math.round(newData.firstTeamAssist / (newData.firstTeamAssist + newData.secondTeamAssist) * 100)}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (newData.secondTeamAssist > newData.firstTeamAssist) ? 'blue' :
                                    (gid === 3 || gid === 4 || gid === 6) && (newData.firstTeamAssist > newData.secondTeamAssist) ? 'blue' : 'red'}
                                animateOnRender={true}
                            />
                        </div>

                        {/* steal */}

                        <div className="stats-content stat-border">
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.firstTeamSteal : newData.secondTeamSteal}
                                </p>
                            </div>
                            <p>STEAL</p>
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.secondTeamSteal : newData.firstTeamSteal}
                                </p>
                            </div>
                        </div>
                        <div className="progress-bar-content">
                            <ProgressBar
                                className="progress-bar"
                                isLabelVisible={false}
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                    Math.round(newData.firstTeamSteal / (newData.firstTeamSteal + newData.secondTeamSteal) * 100)
                                    : Math.round(newData.secondTeamSteal / (newData.firstTeamSteal + newData.secondTeamSteal) * 100)}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (newData.firstTeamSteal > newData.secondTeamSteal) ? 'blue' :
                                    (gid === 3 || gid === 4 || gid === 6) && (newData.secondTeamSteal > newData.firstTeamSteal) ? 'blue' : 'red'}
                                animateOnRender={true}
                            />
                            <ProgressBar
                                className="progress-bar"
                                isLabelVisible={false}
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                    Math.round(newData.secondTeamSteal / (newData.firstTeamSteal + newData.secondTeamSteal) * 100)
                                    : Math.round(newData.firstTeamSteal / (newData.firstTeamSteal + newData.secondTeamSteal) * 100)}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (newData.secondTeamSteal > newData.firstTeamSteal) ? 'blue' :
                                    (gid === 3 || gid === 4 || gid === 6) && (newData.firstTeamSteal > newData.secondTeamSteal) ? 'blue' : 'red'}
                                animateOnRender={true}
                            />
                        </div>

                        {/* block */}
                        <div className="stats-content stat-border">
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.firstTeamBlock : newData.secondTeamBlock}
                                </p>
                            </div>
                            <p>BLOCK</p>
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.secondTeamBlock : newData.firstTeamBlock}
                                </p>
                            </div>
                        </div>
                        <div className="progress-bar-content">
                            <ProgressBar
                                className="progress-bar"
                                isLabelVisible={false}
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                    Math.round(newData.firstTeamBlock / (newData.firstTeamBlock + newData.secondTeamBlock) * 100)
                                    : Math.round(newData.secondTeamBlock / (newData.firstTeamBlock + newData.secondTeamBlock) * 100)}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (newData.firstTeamBlock > newData.secondTeamBlock) ? 'blue' :
                                    (gid === 3 || gid === 4 || gid === 6) && (newData.secondTeamBlock > newData.firstTeamBlock) ? 'blue' : 'red'}
                                animateOnRender={true}
                            />
                            <ProgressBar
                                className="progress-bar"
                                isLabelVisible={false}
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                    Math.round(newData.secondTeamBlock / (newData.firstTeamBlock + newData.secondTeamBlock) * 100)
                                    : Math.round(newData.firstTeamBlock / (newData.firstTeamBlock + newData.secondTeamBlock) * 100)}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (newData.secondTeamBlock > newData.firstTeamBlock) ? 'blue' :
                                    (gid === 3 || gid === 4 || gid === 6) && (newData.firstTeamBlock > newData.secondTeamBlock) ? 'blue' : 'red'}
                                animateOnRender={true}
                            />
                        </div>

                        {/* TO */}
                        <div className="stats-content stat-border">
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.firstTeamTO : newData.secondTeamTO}
                                </p>
                            </div>
                            <p>TO</p>
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.secondTeamTO : newData.firstTeamTO}
                                </p>
                            </div>
                        </div>
                        <div className="progress-bar-content">
                            <ProgressBar
                                className="progress-bar"
                                isLabelVisible={false}
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                    Math.round(newData.firstTeamTO / (newData.firstTeamTO + newData.secondTeamTO) * 100)
                                    : Math.round(newData.secondTeamTO / (newData.firstTeamTO + newData.secondTeamTO) * 100)}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (newData.firstTeamTO > newData.secondTeamTO) ? 'red' :
                                    (gid === 3 || gid === 4 || gid === 6) && (newData.secondTeamTO > newData.firstTeamTO) ? 'red' : 'blue'}
                                animateOnRender={true}
                            />
                            <ProgressBar
                                className="progress-bar"
                                isLabelVisible={false}
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                    Math.round(newData.secondTeamTO / (newData.firstTeamTO + newData.secondTeamTO) * 100)
                                    : Math.round(newData.firstTeamTO / (newData.firstTeamTO + newData.secondTeamTO) * 100)}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (newData.secondTeamTO > newData.firstTeamTO) ? 'red' :
                                    (gid === 3 || gid === 4 || gid === 6) && (newData.firstTeamTO > newData.secondTeamTO) ? 'red' : 'blue'}
                                animateOnRender={true}
                            />
                        </div>

                        {/* FAUL */}

                        {/* TO */}
                        <div className="stats-content stat-border">
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.firstTeamFaul : newData.secondTeamFaul}
                                </p>
                            </div>
                            <p>FAUL</p>
                            <div>
                                <p>
                                    {gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                        newData.secondTeamFaul : newData.firstTeamFaul}
                                </p>
                            </div>
                        </div>
                        <div className="progress-bar-content the-bottom">
                            <ProgressBar
                                className="progress-bar"
                                isLabelVisible={false}
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                    Math.round(newData.firstTeamFaul / (newData.firstTeamFaul + newData.secondTeamFaul) * 100)
                                    : Math.round(newData.secondTeamFaul / (newData.firstTeamFaul + newData.secondTeamFaul) * 100)}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (newData.firstTeamFaul > newData.secondTeamFaul) ? 'red' :
                                    (gid === 3 || gid === 4 || gid === 6) && (newData.secondTeamFaul > newData.firstTeamFaul) ? 'red' : 'blue'}
                                animateOnRender={true}
                            />
                            <ProgressBar
                                className="progress-bar"
                                isLabelVisible={false}
                                completed={gid === 1 || gid === 2 || gid === 5 || gid === 7 ?
                                    Math.round(newData.secondTeamFaul / (newData.firstTeamFaul + newData.secondTeamFaul) * 100)
                                    : Math.round(newData.firstTeamFaul / (newData.firstTeamFaul + newData.secondTeamFaul) * 100)}
                                bgColor={(gid === 1 || gid === 2 || gid === 5 || gid === 7) && (newData.secondTeamFaul > newData.firstTeamFaul) ? 'red' :
                                    (gid === 3 || gid === 4 || gid === 6) && (newData.firstTeamFaul > newData.secondTeamFaul) ? 'red' : 'blue'}
                                animateOnRender={true}
                            />
                        </div>


                    </div>

            }


        </div>
    );
}

export default GeneralStats;