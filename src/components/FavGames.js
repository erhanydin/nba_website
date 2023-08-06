import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";




const FavGames = (props) => {

    const { favos } = props;

    console.log("pl", favos)

    const [data, setData] = useState()
    const [token, setToken] = useState()

    useEffect(() => {
        axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/games/gen/${favos.type_id}`)
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
                    <tr key={data.id}>
                        <td><Link className="favs-to-component" to={`/series/${data.seriesId}/${data.gameId}`}>{data.firstTeamLogo.toUpperCase()} - {data.secondTeamLogo.toUpperCase()}</Link></td>
                        <td>{data.firstTeamName}</td>
                        <td><img src={require(`../images/${data.firstTeamLogo}.png`)} alt="logo" /></td>
                        <td style={{ color: data.firstTeamScore > data.secondTeamScore ? 'green' : 'white' }}>{data.firstTeamScore}</td>
                        <td style={{ color: data.secondTeamScore > data.firstTeamScore ? 'green' : 'white' }}>{data.secondTeamScore}</td>
                        <td><img src={require(`../images/${data.secondTeamLogo}.png`)} alt="logo" /></td>
                        <td>{data.secondTeamName}</td>
                        <td><button onClick={handleRemove} className="options-buttons">REMOVE FROM FAVS</button></td>
                    </tr>
            }
        </tbody>
    );
}

export default FavGames;