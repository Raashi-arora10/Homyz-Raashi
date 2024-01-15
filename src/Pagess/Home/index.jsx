import '../../App.css';
import './style.css'
import Header2 from '../../components/Home/Header2';
import Header from '../../components/Home/Header';
import Residencies from '../../components/Home/Residencies';
import Value from '../../components/Home/Value';
import Contact from '../../components/Home/Contact';
import GetStarted from '../../components/Home/GetStarted';


const Home = () => {
  return (
    <div className="App">
      <div>
        <Header2 /> 
        <Header />
      </div>
      <Residencies />
      <Value />
      <Contact />
      <GetStarted />
      
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default Home;
