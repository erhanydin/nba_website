import axios from "axios";
import React, { useEffect, useState } from "react";



const HomeComponent = () => {

    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [data4, setData4] = useState([])
    const [data5, setData5] = useState([])

    const [generalData, setGeneralData] = useState([data1, data2, data3, data4, data5])

    const keywords = ['playerGpts', 'playerRb', 'playerAst', 'playerBlk', 'playerStl']

    useEffect(() => {
        axios.all([
            axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/bests/playerGpts`),
            axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/bests/playerRb`),
            axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/bests/playerAst`),
            axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/bests/playerBlk`),
            axios.get(`https://erhanba-71679337ef80.herokuapp.com/api/bests/playerStl`)
        ])
            .then(axios.spread((res1, res2, res3, res4, res5) => {
                setData1(res1.data);
                setData2(res2.data);
                setData3(res3.data);
                setData4(res4.data);
                setData5(res5.data);

                setGeneralData([data1, data2, data3, data4, data5])
            }))
    }, [])


    console.log(data1)
    console.log(data2)
    console.log(data3)
    console.log(data4)
    console.log(data5)

    console.log("generalData", generalData)



    return (
        <div>
            
        </div>
    );
}

export default HomeComponent;