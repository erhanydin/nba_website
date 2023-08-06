import React, { useEffect, useState } from "react";
import { Link, useHistory, Switch, Route } from "react-router-dom";
import axios from "axios";
import FavoritesDetails from "./FavoritesDetails";
import FavoritesDetailsPlayers from "./FavoritesDetailsPlayers";
import FavoritesDetailsSeries from "./FavoritesDetailsSeries";
import FavoritesDetailsGames from "./FavoritesDetailsGames";
import { ToastContainer } from "react-toastify";





const Favorites = () => {

    const history = useHistory()

    const [userinfo, setUserInfo] = useState({})
    const [favs, setFavs] = useState([]);
    const [options, setOptions] = useState(0);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userinfo"));
        if (userInfo) {
            setUserInfo(userInfo);
            axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/favs/user/${userInfo.user_id}`, { headers: { Authorization: userInfo.token } })
                .then((res) => {
                    setFavs(res.data)
                }).catch((err) => {
                    console.log(err)
                })
        }
    }, [])



    return (
        <div style={{ color: "white", fontSize: '3rem', }}>

            <h2>
                Favorites
            </h2>
            <div className="fav-buttons-container">
                <Link to='/favs/teams' className="fav-buttons" onClick={() => setOptions(0)}>
                    Fav Teams
                </Link>
                <Link to='/favs/players' className="fav-buttons" onClick={() => setOptions(1)}>
                    Fav Players
                </Link>
                <Link to='/favs/series' className="fav-buttons" onClick={() => setOptions(2)}>
                    Fav Series
                </Link>
                <Link to='/favs/games' className="fav-buttons" onClick={() => setOptions(3)}>
                    Fav Games
                </Link>
            </div>
            <ToastContainer />

            {
                <Switch>
                    <Route path='/favs/teams'>
                        <FavoritesDetails fav={favs.filter((fav) => fav.type === 0)} />
                    </Route>

                    <Route path='/favs/players'>
                        <FavoritesDetailsPlayers fav={favs.filter((fav) => fav.type === 1)} />

                    </Route>

                    <Route path='/favs/series'>
                        <FavoritesDetailsSeries fav={favs.filter((fav) => fav.type === 2)} />

                    </Route>

                    <Route path='/favs/games'>
                        <FavoritesDetailsGames fav={favs.filter((fav) => fav.type === 3)} />
                    </Route>
                </Switch>
            }


            <button className="options-buttons" id="back" onClick={() => history.goBack()}>BACK</button>


        </div>
    );
}

export default Favorites;