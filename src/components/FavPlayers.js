import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'

import Button from '@mui/material/Button';


export let newNoteFavS;
export let noteForSUDS = {};

const FavPlayers = (props) => {

    const { favos } = props;

    console.log("pl", favos)

    const [data, setData] = useState()
    const [token, setToken] = useState()

    useEffect(() => {
        axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/players/${favos.type_id}`)
            .then((res) => {
                setData(res.data[0])
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
                        <td><Link className="favs-to-component" to={`/standings/${data.teamId}`}>{data.playerName}</Link></td>
                        <td><ReactCountryFlag className="flags" countryCode={data.playerCountry} svg /></td>
                        <td>{data.playerAge}</td>
                        <td>{data.playerGpts}</td>
                        <td>{data.playerRb}</td>
                        <td>{data.playerAst}</td>
                        <td><button onClick={handleRemove} className="options-buttons">REMOVE FROM FAVS</button></td>
                        <td><Button key={favos.favs_id} className="note-button" onClick={() => {
                            newNoteFavS = favos.favs_id
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
                                                newNoteFavS = favos.favs_id
                                                noteForSUDS = favos.notes.filter((not) => not.note_id === note.note_id)[0]
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

export default FavPlayers;