import {useHistory} from 'react-router-dom';

function Stocks() {
  const history = useHistory();

  const handleClick = () => {
    console.log('I have submitted my form!');
    return history.push('/');
  };

  return (
    <div className="comp orange">
      <h1>Stocks Component</h1>
      <button onClick={handleClick}>Home</button>
    </div>
  );
}

export default Stocks;
