import UserForm from './components/UserForm';

function App() {
  const user = {
    trainer: "Any",
  };

  return (
    <div className="App">
      <h1>Personal Training Scheduler</h1>
      <div className="form">
        <UserForm {...{ user } }/>
      </div>
    </div>
  );
}

export default App