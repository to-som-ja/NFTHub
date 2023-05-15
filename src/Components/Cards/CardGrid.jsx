import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function(props){
    /*https://api-staging.thewatch.com/api/users/0x03818E2b69Cb63eCD8763B9B0f275d7f8995aF1a/items*/
    /*const [data, setData] = useState([]);*/
    axios.defaults.headers.common['CF-Access-Client-Id'] = 'ee3609e2c3b9626bb9128eb707f93afa.access'
    axios.defaults.headers.common['CF-Access-Client-Secret'] = '453c91ec9153b8989820d1bbc72b71f81f5c1f9f1f879499a8ab24e118ac0864'
    useEffect(() => {
        axios.get(`https://api-staging.thewatch.com/api/users/0x03818E2b69Cb63eCD8763B9B0f275d7f8995aF1a/items`, {
            withCredentials: true
          })
        .then((response) => {
          const data = response.data;
          console.log(data);
        })
    }, []);


    /*const cards = data.map(item => {
        return (
            <Card
                key={item.id}
                {...item}
                
            />
        )
    })*/

    return (
        <div className="">
            {/*cards*/}
        </div>
    );
};