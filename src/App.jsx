import Images from "./components/Images";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <main>
      <h1 className="my-10 text-xl md:text-3xl lg:text-4xl text-center font-bold uppercase">
        Gallary
      </h1>

      <Images />
      <Toaster />
    </main>
  );
}

export default App;
