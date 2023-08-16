import React from "react";
import ReactCountryFlag from "react-country-flag";




const BestOf = (props) => {

    const { besto, sw } = props;

    return (
        <tbody>
            {
                besto.map((best, index) => {
                    return (
                        <tr key={index}>
                            <td className="besto-first">{best.playerName}</td>
                            <td className="besto-second"><ReactCountryFlag className="flags" countryCode={best.playerCountry} svg /></td>
                            <td className="besto-third">{best.teamName}</td>
                            <td className="besto-forth">{best[sw]}</td>
                        </tr>
                    )
                })
            }
        </tbody>
    );
}

export default BestOf;