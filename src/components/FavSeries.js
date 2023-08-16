import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'

import Button from '@mui/material/Button';

export let newNoteFavSS;
export let noteForSUDSS = {};


const FavSeries = (props) => {

    const { favos } = props;

    console.log("pl", favos)

    const [data, setData] = useState()
    const [token, setToken] = useState()

    useEffect(() => {
        axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/games/${favos.type_id}`)
            .then((res) => {
                setData(res.data[res.data.length - 1])
            })
            .catch((err) => {
                console.log(err)
            })
    }, [favos.type_id])

    useEffect(() => {
        const token = localStorage.getItem("token")
        setToken(token)
    }, [])

    console.log("data", data)

    const handleRemove = () => {
        axios.delete(`https://erhanba-71679337ef80.herokuapp.com/api/favs/${favos.favs_id}`,
            { headers: { "Authorization": JSON.parse(token) } }
        ).then((res) => {
            console.log(res)
            // window.location.reload();
            props.toast()
        }).catch((err) => {
            console.log(err)
        })

    }

    console.log(token)


    return (
        <tbody>
            {
                JSON.stringify(data) === undefined
                    ?
                    <tr>
                    </tr>
                    :
                    <tr key={favos.favs_id}>
                        <td><Link className="favs-to-component" to={`/playoffs/${data.seriesId}`}>{data.firstTeamLogo.toUpperCase()} - {data.secondTeamLogo.toUpperCase()}</Link></td>
                        <td>{data.firstTeamId > 15 ? data.firstTeamId - 15 : data.firstTeamId}</td>
                        <td>{data.firstTeamName}</td>
                        <td><img src={require(`../images/${data.firstTeamLogo}.png`)} alt="logo" /></td>
                        <td><img src={require(`../images/${data.secondTeamLogo}.png`)} alt="logo" /></td>
                        <td>{data.secondTeamName}</td>
                        <td>{data.secondTeamId > 15 ? data.secondTeamId - 15 : data.secondTeamId}</td>
                        <td style={{ color: 'green' }}>{data.ftWins === 4 ? data.firstTeamName : data.stWins === 4 ? data.secondTeamName : ''}</td>
                        <td>{data.ftWins !== 4 ? data.firstTeamName : data.stWins !== 4 ? data.secondTeamName : ''}</td>
                        <td><button onClick={handleRemove} className="options-buttons">REMOVE FROM FAVS</button></td>
                        <td><Button key={favos.favs_id} className="note-button" onClick={() => {
                            newNoteFavSS = favos.favs_id
                            props.openMoral()
                        }}
                        >
                            <FontAwesomeIcon color="white" style={{ height: "25px", width: "25px" }} beat={true} icon={faPlusCircle} />
                        </Button></td>
                        <td className="note-td">
                            {
                                favos.notes.map((note) => {
                                    return (
                                        <Button
                                            key={note.note_id}
                                            className="note-button note-opening" onClick={() => {
                                                newNoteFavSS = favos.favs_id
                                                noteForSUDSS = favos.notes.filter((not) => not.note_id === note.note_id)[0]
                                                props.openMoralS()
                                            }}
                                        >
                                            <FontAwesomeIcon color="white" style={{ height: "25px", width: "25px" }} icon={faNoteSticky} />
                                        </Button>
                                    )
                                })
                            }
                        </td>
                    </tr>
            }
        </tbody>
    );
}

export default FavSeries;