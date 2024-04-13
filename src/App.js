import './App.css';
import { useState } from 'react'


export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton count={count} onClick={handleClick}/>
      <MyButton count={count}/>
    </div>
  );
}

function MyButton ({count, onClick}) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  )
}

// function MyButton() {
//   const [count, setCount] = useState(0);

//   function handleClick() {
//     setCount(count + 1);
//   }

//   return (
//     <button onClick={handleClick}>
//       Clicked {count} times
//     </button>
//   );
// }

