import { useState, useEffect } from 'react'

function AvailableTimes(date, trainer) {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(date + '-AM-Shift.json').then(response => response.json()).then((json) => {
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
          var words = json[i].name.split(' ');
          for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            words[i] = words[i].replace('*', '');
            words[i] = words[i].replace('(', '');
            words[i] = words[i].replace(')', '');
          }
          words = words.join(" ");
          var final = words.split(', ');
          if(trainer === final[1] + final[0]){
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

    fetch(date + '-PM-Shift.json').then(response => response.json()).then((json) => {
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
          var words = json[i].name.split(' ');
          for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            words[i] = words[i].replace('*', '');
            words[i] = words[i].replace('(', '');
            words[i] = words[i].replace(')', '');
          }
          words = words.join(" ");
          var final = words.split(', ');
          if(trainer === final[1] + final[0]){
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