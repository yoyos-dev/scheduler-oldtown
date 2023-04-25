import { useState, useEffect } from 'react'

function GetTrainers() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('trainers.json').then(response => response.json()).then((json) => {
      var trainers = [];
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
        trainers.push(final[1] + final[0]);
      }
      setItems(trainers)
      });
    }, []);

  return  (
    items
  );
};

export default GetTrainers
