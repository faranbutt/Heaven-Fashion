import Home from "./routes/home/home.component";
import { Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/signin.component";
const Shop = () => {
  return <div>This is a Shop</div>;
};
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path='signin' element={<SignIn />}/>
      </Route>
    </Routes>
  );
};
export default App;
