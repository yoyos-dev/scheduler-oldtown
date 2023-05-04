import UserForm from './components/UserForm';

function App() {
  const user = {
    trainer: "Any",
  };

  const handleSave = (values) => {
    // const message = { to: values.trainer, body: values.name + " wants to do a training session with you at " + values.time + " on " + values.date + ".\nPhone Number: " + values.phone + "\nMember ID: " + values.id }
    // fetch('/api/messages', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify( message )
    // });

    var verPhone = values.phone.split("-")
    verPhone = verPhone.join("")
    const verify = { to: "+1" + verPhone }

    fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( verify )
    });
  };

  return (
    <div className="App">
      <h1>Personal Training Scheduler</h1>
      <div className="form">
        <UserForm onSave={handleSave} {...{ user } }/>
      </div>
    </div>
  );
}

export default App