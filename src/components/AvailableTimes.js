import { useState, useEffect } from 'react'

function AvailableTimes(date, trainer) {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch("time-sheets/" + date + '-AM-Shift.json').then(response => response.json())
      .then((json) => {
        var times = []
        if(trainer === "Any"){
          for (var j = 0; j < json.length; j++) {
            for( const element of Object.keys(json[j]) ){
              if(json[j][element] === "Available"){
                if(!(times.includes(element))){
                  times.push(element)
                }
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
        times.sort(function (a, b) {
          if ((a === '12:00 AM') !== (b === '12:00 AM')) {
            return a === '12:00 AM' ? -1 : 1;
        }
          let x = a.replace(/[^0-9]/g, ""),
              y = b.replace(/[^0-9]/g, "");
          return x - y
        });
        setItems(times)
      })
      .catch(() => {
        setItems([])
      });

    fetch("time-sheets/" + date + '-PM-Shift.json').then(response => response.json())
      .then((json) => {
        var times = []
        if(trainer === "Any"){
          for (var j = 0; j < json.length; j++) {
            for( const element of Object.keys(json[j]) ){
              if(json[j][element] === "Available"){
                if(!(times.includes(element))){
                  times.push(element)
                }
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
        times.sort(function (a, b) {
          if ((a === '12:00 PM') !== (b === '12:00 PM')) {
            return a === '12:00 PM' ? -1 : 1;
        }
          let x = a.replace(/[^0-9]/g, ""),
              y = b.replace(/[^0-9]/g, "");
          return x - y
        });
        setItems(current => [...current, ...times])
      })
      .catch(() => {
        setItems([])
      });

  }, [date, trainer]);

  return  (
    items
  );
};

export default AvailableTimes