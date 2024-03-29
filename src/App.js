import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Switch, Route, Redirect} from 'react-router-dom'
import Header from './components/header/header.component';
import Accounts from './pages/accounts/accounts.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';
import { connect } from 'react-redux';
import Profile from './pages/profile/profile.component';



class App extends React.Component {
  
  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

       
        userRef.onSnapshot(snapshot => (
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            })
         
        ));

      }
      else{
        setCurrentUser(userAuth)
      }

      
     

      
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div >
        <Header ></Header>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route  path='/profile'  render = {() => !this.props.currentUser ? <Redirect to='/signin' /> : <Profile />}></Route>
          <Route exact path='/signin' render = {() => this.props.currentUser ? <Redirect to='/' /> : <Accounts />}></Route>
        </Switch>
      </div>
    );
  }
  
}
const matchStateToProps = ({user}) => ({
  currentUser : user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(matchStateToProps, mapDispatchToProps)(App);
