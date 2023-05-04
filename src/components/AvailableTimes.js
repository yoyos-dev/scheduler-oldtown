import { useState, useEffect } from 'react'

function AvailableTimes(date, trainer) {
  const [items, setItems] = useState([])
  const [itemsT, setItemsT] = useState([])

  useEffect(() => {
    fetch("time-sheets/" + date + '.json').then(response => response.json())
      .then((json) => {
        var times = []
        var trainers = []
        var selDate = date.split('-')
        selDate = selDate.join('/')
        if(trainer === "Any"){
          for (var j = 0; j < json.length; j++) {
            for( const element of Object.keys(json[j]) ){
              if(json[j][element] === "Available" && new Date() < new Date(selDate + " " + element)){
                if(!(times.includes(element))){
                  times.push(element)
                }
                trainers.push([json[j].name, element])
              }
            }
          }
          times.sort(function (a, b) {
            return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
          });
        }

        else {
          for (var i = 0; i < json.length; i++) {
            if(trainer === json[i].name){
              for( const element of Object.keys(json[i]) ){
                if(json[i][element] === "Available" && new Date() < new Date(selDate + " " + element)){
                  times.push(element)
                }
              }
            }
          }
        }
        setItems(times)
        setItemsT(trainers)
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