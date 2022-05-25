import React, { useEffect }  from 'react';
import "./TinderCards.css";
import TinderCard from "react-tinder-card";
import { useState } from "react";
import { SwipeableDrawer } from '@mui/material';
import axios from './axios.js';

function TinderCards() {
    const [people, setPeople]= useState([]);

    useEffect(() =>{
        async function fetchData() {
            const req = await axios.get('/tinder/cards');

            setPeople(req.data);
        }

        fetchData();
    }, [])
    console.log(setPeople);

    const swiped =(direction,nameToDelete)=>{
        console.log("removing:" + nameToDelete);
       // setLastDirection(direction);
    };
    const outOfFrame=(name) =>{
        console.log(name + "left the srceen");
    };

  return (
    <div className='tinderCards'>
        <div className='tinderCards__cardContainer'>
            {people.map((person) => (
               <TinderCard 
               className='swipe'
               key={person.name}
               preventSwipe={["up", "down"]}
               onSwipe={(dir) => swiped(dir,person.name)}
               onCardLeftScreen={()=>outOfFrame(person.name)}
               >
                   <div
                   style={{backgroundImage:`url(${person.imgUrl})`}}
                   className='card'
                   >
                       <h3>{person.name}</h3>
                   </div>
               </TinderCard>
            ))}

        </div>
    </div>
  )
}
export default TinderCards;