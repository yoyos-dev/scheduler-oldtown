import { render } from '@testing-library/react';
import React from 'react';
import Popup from 'reactjs-popup';

function Confirm(values, verPhone){
    const handleConfirm = (event) => {
        event.preventDefault();
      
        const data = new FormData(event.currentTarget);
        const formValues = Object.fromEntries(data.entries())

        const confirm = { to: verPhone, code: formValues.verCode }
        console.log(confirm)

        fetch('/api/verify-confirm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( confirm )
          })    
          .then((res) => {
            if(res.status === 200){
            const message = { to: values.trainer, body: values.name + " wants to do a training session with you at " + values.time + " on " + values.date + ".\nPhone Number: " + values.phone + "\nMember ID: " + values.id }
            fetch('/api/messages', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify( message )
            });
            }
          })
          .catch(err => {
            console.log(err);
          })
      };
      
  
    render (
    <Popup trigger={<button className="button"> Open Modal </button>} modal>
        <div
            style={{
                backgroundColor: 'white',
            }}>
            <h2>Confirm Booking:</h2>

            <p>A verification code has been sent to your phone.</p>
            <p>Please enter code and hit confirm to finalize booking:</p>

            <form onSubmit={handleConfirm}>
                <input name="verCode" maxLength={6} placeholder="******"></input>
                <button type="submit">Confirm</button>
            </form>

            <h3>Please confirm booking information:</h3>
            <p> Name: {values.name }</p>
            <p> Phone Number: {values.phone} </p>
            <p> Member ID: {values.id} </p>
            <p> Booking Date: {values.date + " at " + values.time} </p>
            <p> Trainer: {values.trainerLabel} </p>
        </div>
    </Popup>
    );
};

export default Confirm