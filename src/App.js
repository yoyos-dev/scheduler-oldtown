import UserForm from './components/UserForm';

function App() {
  const user = {
    trainer: "Any",
  };

  const handleSave = (values) => {
    const message = { to: values.trainer, body: values.name + " wants to do a training session with you at 1:00 PM on " + values.date + ".\nPhone Number: " + values.phone + "\nMember ID: " + values.id }
    console.log({ values });
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( message )
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