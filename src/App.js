import UserForm from './components/UserForm';

function App() {
  const user = {
    trainer: "Any",
  };

  return (
    <div className="bg-gradient-to-tl grid gap-4 from-neutral-950 via-neutral-800 to-neutral-950">
      <div className="p-7 bg-gradient-to-t from-red-800 to-red-500 shadow-lg flex justify-center space-x-4">
        <h1 className="text-5xl font-Proxima-Nova-Alt-Cond-Black tracking-widest drop-shadow-xlg text-center text-white">Book Your Training Session!</h1>
      </div>
      <UserForm {...{ user } }/>
    </div>
  );
}

export default App