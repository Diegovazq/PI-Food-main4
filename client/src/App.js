import { BrowserRouter, Route,Switch} from "react-router-dom";
import Home from "./components/home/Home";
import Landing from "./components/landing/Landing";
import Detail from "./components/detail/Detail";
import Form from "./components/form/Form";
import NotFound from "./components/notFound/NotFound";
import NavBar from "./components/navBar/NavBar";

function App() {
  return (
    <BrowserRouter>
    
    <Route path="/" component={NavBar}/>
    <Switch>
    <Route  exact path="/" component={Landing}/>
    
        <Route  path="/home" component={Home}/>
       
        <Route  path='/form' component={Form}/>
        <Route  path='/detail/:id' component={Detail}/>
        
        <Route  path='*' component={NotFound}/> 
    

        </Switch>
    
    </BrowserRouter>
  );
}

export default App;
  