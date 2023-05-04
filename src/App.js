import UserForm from './components/UserForm';
import Confirm from './components/Confirm';

function App() {
  const user = {
    trainer: "Any",
  };

  const handleSave = (values) => {
    var verPhone = values.phone.split("-")
    verPhone = verPhone.join("")
    verPhone = "+1" + verPhone
    const verify = { to: verPhone }

    fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( verify )
    });

    Confirm(values, verPhone)
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