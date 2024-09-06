// App.js
import './App.css';
import { TitleBar } from './components/general-components/Title';
import { Footer } from './components/general-components/Footer';
import { SplashScreen } from './components/SpashScreen';
import { Component1, Component2, Component3, Component4 } from './components/MainComponents';

function App() {
  return (
    <>  
      <SplashScreen />
      <TitleBar />
      <Component1 />
      <div style={{ display: 'flex', width: '100%', height: '50vh' }}>
        <Component2 />
        <Component3 />
        <Component4 />
      </div>
      <Footer />
    </>
  );
}

export default App;
