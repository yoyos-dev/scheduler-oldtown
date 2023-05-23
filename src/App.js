import UserForm from './components/UserForm';

function App() {
  const user = {
    trainer: "Any",
  };

  return (
    <div className="bg-gradient-to-tl grid gap-4 from-black via-neutral-900 to-black">
      <div className="p-7 bg-gradient-to-t from-red-900 to-red-600 flex justify-center space-x-4">
        <h1 className="text-5xl font-Proxima-Nova-Alt-Cond-Black tracking-widest drop-shadow-2xl text-center text-white">Book Your Training Session!</h1>
      </div>
      <UserForm {...{ user } }/>
    </div>
  );
}

export default App