import { useState, useEffect } from 'react'

function AvailableTimes(date, trainer) {
  const [items, setItems] = useState([])
  const [itemsT, setItemsT] = useState([])

  useEffect(() => {
    fetch("time-sheets/" + date + '-AM-Shift.json').then(response => response.json())
      .then((json) => {
        var times = []
        var trainers = []
        if(trainer === "Any"){
          for (var j = 0; j < json.length; j++) {
            for( const element of Object.keys(json[j]) ){
              if(json[j][element] === "Available"){
                if(!(times.includes(element))){
                  times.push(element)
                }
                trainers.push([json[j].name, element])
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
        setItemsT(trainers)
      })
      .catch(() => {
        setItems([])
        setItemsT([])
      });

    fetch("time-sheets/" + date + '-PM-Shift.json').then(response => response.json())
      .then((json) => {
        var times = []
        var trainers = []
        if(trainer === "Any"){
          for (var j = 0; j < json.length; j++) {
            for( const element of Object.keys(json[j]) ){
              if(json[j][element] === "Available"){
                if(!(times.includes(element))){
                  times.push(element)
                }
                trainers.push([json[j].name, element])
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
        setItemsT(current => [...current, ...trainers])
      })
      .catch(() => {
        setItems([])
        setItemsT([])
      });

  }, [date, trainer]);

  return  (
    [items, itemsT]
  );
};

export default AvailableTimes