import { useParams } from 'react-router-dom';

function FruitShow({fruits}) {
  const { fruitId } = useParams();
  const currentFruit = fruits.find(fruit=> fruit.id === fruitId);
  return (
    <div className="fruit-show">
      <h2>{currentFruit.name}</h2>
      <li>{currentFruit.color}</li>
      <p>{currentFruit.sweetness}</p>
      <p>{currentFruit.seeds}</p>
    </div>
  );
}

export default FruitShow;