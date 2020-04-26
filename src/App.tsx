import React from 'react';
import './App.css';
import {Footer} from './components/Footer/Footer';
import {Header} from './components/Header/Header';
import Navbar from './components/Navigation/Navigation';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import WorkPlaces from './components/WorkPlaces/Table';
import {BrowserRouter, Route} from 'react-router-dom';

//@ts-ignore
function App(props) {
  console.log(props);
  return (
    <BrowserRouter>
      <div className="App__wrapper">
        <header className='App__header'>
          <Header />
        </header>
        <nav className='App__nav'>
          <Navbar />
        </nav>
        <main className='App__content'>
          <Route path='/dialogs'
                            render={ () => <Dialogs store={props.store} /> }/>
            <Route path='/profile'
                            render={ () => <Profile
                                profilePage={props.store.getState().profilePage}
                                dispatch={props.store.dispatch} /> }/>
            <Route path='/workplaces' component={WorkPlaces}/> 
        </main>
        <footer className='App__footer'>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
