import NavBar from './components/Navbar';
import SeparatorOne from './components/SeparatorOne';

const App = (props) => {
  console.log(props.children);
  return (
    <>
      <NavBar />
      <div className='container'>
        <SeparatorOne />
        {props.children}
      </div>
    </>
  );
};

export default App;
