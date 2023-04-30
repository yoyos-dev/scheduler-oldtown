import { useState, useEffect } from 'react'

function GetTrainers() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('trainers.json').then(response => response.json()).then((json) => {
      var trainers = [];
      for (var i = 0; i < json.length; i++) {
        trainers.push([json[i].name, json[i].number]);
      }
      setItems(trainers)
      });
    }, []);

  return  (
    items
  );
};

export default GetTrainers
