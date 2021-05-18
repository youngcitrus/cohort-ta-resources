import './UseEffect.css';
import {useEffect, useState} from 'react';

const UseEffect = () => {
  const [toggleOne, setToggleOne] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(false);

  useEffect(()=>{
    console.log('useEffect1 ran!')
  }, [toggleOne]);

  useEffect(() => {
    if (toggleTwo) console.log('useEffect2 ran');
  }, [toggleTwo]);

  return (
    <div>
      {console.log('Rendered or re-rendered')}
      <h1>UseEffect Component</h1>
      <button onClick={()=>setToggleOne((prevToggle)=>!prevToggle)}>Toggle 1</button>
      <button onClick={()=>setToggleTwo((prevToggle)=>!prevToggle)}>Toggle 2</button>
    </div>
  );
};
export default UseEffect;
