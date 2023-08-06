import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';


export let newNoteFav;

const FavTeams = (props) => {

    const { favos } = props;

    const [data, setData] = useState()
    const [token, setToken] = useState()

    useEffect(() => {
        axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/teams/${favos.type_id}`)
            .then((res) => {
                setData(res.data)
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
                    <tr key={data.teamId}>
                        <td><Link className="favs-to-component" to={`/standings/${data.teamId}`}>{data.teamId > 15 ? data.teamId - 15 : data.teamId}</Link></td>
                        <td><img src={require(`../images/${data.teamLogo}.png`)} alt="logo" /></td>
                        <td>{data.teamName}</td>
                        <td>{data.teamWins}</td>
                        <td>{data.teamLoss}</td>
                        <td><button onClick={handleRemove} className="options-buttons">REMOVE FROM FAVS</button></td>
                        <td><Button className="note-button" onClick={ () => {
                            newNoteFav = favos.favs_id
                            props.openMoral()
                        }}
                        >
                            <FontAwesomeIcon color="white" style={{ height: "25px", width: "25px" }} beat="yes" icon={faPlusCircle} />
                        </Button></td>
                    </tr>
            }
        </tbody>
    );
}

export default FavTeams;
