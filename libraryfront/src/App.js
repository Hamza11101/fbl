import UserTable from "./components/users/usersTable";
import {
  BrowserRouter,
  Routes,
  Route,
 
} from "react-router-dom";
import DashBoard from './components/dashBoard'
import AddNewUser from './components/users/addNewUser'
import LivreTable from "./components/livres/livresTable";
import AddNewLivre from "./components/livres/addNewLivre";
import CategoriesTable from "./components/categories/categoriesTable";
import AddNewCategorie from "./components/categories/addNewCategories";
function App() {
  return (
    <BrowserRouter>
      <Routes>
      
      <Route exact path="/" element={<DashBoard />}/>
      <Route exact path="/users" element={<UserTable />}/>
      <Route exact path="/user/add" element={<AddNewUser />}/>
      <Route exact path="/livres" element={<LivreTable />}/>
      <Route exact path="/livres/add" element={<AddNewLivre />}/>
      <Route exact path="/categories" element={<CategoriesTable />}/>
      <Route exact path="/categories/add" element={<AddNewCategorie />}/>
   



      </Routes>
      </BrowserRouter>
  );
}

export default App;