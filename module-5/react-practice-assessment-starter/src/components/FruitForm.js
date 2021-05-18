import {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

const COLORS = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple"
];


function FruitForm({ fruits }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [sweetness, setSweetness] = useState(1);
  const [seeds, setSeeds] = useState("yes");
  const [stateErrors, setErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const errors = [];
    if (name.length < 3) errors.push("Name must be 3 or more characters");
    else if (name.length > 20) errors.push("Name must be 20 characters or less");
    else if (fruits.map(fruit => fruit.name).includes(name)) errors.push("Name already exists.");

    if (sweetness < 1 || sweetness > 10) errors.push("Sweetness must be between 1 and 10");
    
    setErrors(errors);
  }, [name, sweetness])

  function onSubmit(e) {
    e.preventDefault(); 
    console.log({name, color, sweetness, seeds});
    history.push('/');
  };
  
  return (
    <form className="fruit-form" onSubmit={onSubmit}>
      <h2>Enter a Fruit</h2>
      <ul className="errors">
        {stateErrors.map(error =>
          <li key={error}>{error}</li>)}
      </ul>
      <label>
        Name
        <input
          type="text"
          name="name"
          onChange={(e)=>{setName(e.target.value)}}
          value={name}
        />
      </label>
      <label>
        Select a Color
        <select onChange={(e) => { setColor(e.target.value) }} value={color}>
          {COLORS.map(color => (
            <option
              key={color}
              value={color}
            >
              {color}
            </option>
          ))}
        </select>
      </label>
      <label>
        Sweetness
        <input
          type="number"
          name="sweetness"
          onChange={(e) => { setSweetness(e.target.value) }}
          value={sweetness}
        />
      </label>
      <label>
        <input
          type="radio"
          value="no"
          name="seeds"
          checked={seeds === "no"}
          onChange={(e) => { setSeeds("no") }}
        />
        No Seeds
      </label>
      <label>
        <input
          type="radio"
          value="yes"
          name="seeds"
          checked={seeds === "yes"}
          onChange={(e) => { setSeeds("yes") }}
        />
        Seeds
      </label>
      <button type="submit" disabled={stateErrors.length > 0}>Submit Fruit</button>
    </form>
  );
}

export default FruitForm;