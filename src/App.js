import UserForm from "./UserForm"

function App() {
  const user = {
    name: "",
    email: "",
    phone: "",
    id: "",
    trainer: "any",
  };

  const handleSave = (values) => {
    console.log({ values });
  };

  return (
    <div className="App">
      <h1>Personal Training Scheduler</h1>
      <div className="form">
        <UserForm onSave={handleSave} {...{ user } } />
      </div>
    </div>
  );
}

export default App;
