import Div from './Div';
import add, {num1 as n1, num2 as n2} from './export';
// import add from './export';
import './App.css';
import Wrapper from './Wrapper';
import List from './List';

const fruits = ['apple', 'pear', 'kiwi', 'mango'];

function App() {
  const randomNumber = Math.floor(Math.random() * 100);
  const myName = {
    fName: 'Justin',
    lName: 'Nguyen'
  };

  return (
    <div className='container'>
      <h1>My Ugly React App</h1>
      <h2>Ugliest Website Ever</h2>
      <List fruits={fruits}/>
      <Wrapper>
        <h2>Random Number: {randomNumber}</h2>
        <h2>Hi, my name is {myName.fName}</h2>
        <h2>Sum: {add(n1,n2)}</h2>
      </Wrapper>
      <Div color='#FF3C00' name={myName}/>
      {/* <Div />
      <Div /> */}
      
    </div>
  );
}

export default App;
