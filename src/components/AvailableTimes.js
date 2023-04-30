import { useState, useEffect } from 'react'

function AvailableTimes(date, trainer) {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch("time-sheets/" + date + '-AM-Shift.json').then(response => response.json()).then((json) => {
      var times = []
      if(trainer === "Any"){
        for (var j = 0; j < json.length; j++) {
          for( const element of Object.keys(json[j]) ){
            if(json[j][element] === "Available"){
              // console.log(json[j].name)
              // console.log(element)
            }
          }
        }
      }

      else {
        for (var i = 0; i < json.length; i++) {
          if(trainer === json[i].name){
            for( const element of Object.keys(json[i]) ){
              if(json[i][element] === "Available"){
                times.push(element)
              }
            }
          }
        }
      }
      setItems(times)
    });

    fetch("time-sheets/" + date + '-PM-Shift.json').then(response => response.json()).then((json) => {
      if(trainer === "Any"){
        for (var j = 0; j < json.length; j++) {
          for( const element of Object.keys(json[j]) ){
            if(json[j][element] === "Available"){
              // console.log(json[j].name)
              // console.log(element)
            }
          }
        }
      }

      else {
        for (var i = 0; i < json.length; i++) {
          if(trainer === json[i].name){
            for( const element of Object.keys(json[i]) ){
              if(json[i][element] === "Available"){
                setItems(current => [...current, element])
              }
            }
          }
        }
      }
    });
  }, [date, trainer]);

  return  (
    items
  );
};

export default AvailableTimes