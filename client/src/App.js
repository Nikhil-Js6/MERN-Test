import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import "./app.scss";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useState } from 'react';

function App() {

   const [token, setToken] = useState(localStorage.getItem("User"));

   return (
      <div className='app'>
        <Router>
            <Switch>
                <Route path='/' exact>
                    {token ? <Profile token={token}/> : <Redirect to='/register' />}
                </Route>
                <Route path='/login'>
                    {token ? <Redirect to='/' /> : <Login setToken={setToken}/>}
                </Route>
                <Route path='/register'>
                    {token ? <Redirect to='/'/> : <Register /> }
                </Route>
            </Switch>
        </Router>         
      </div>
   )
}

export default App;
