import { useState } from 'react';
import Card from './Card';
import './App.css';

const App = () => {
  const [message, setMessage] = useState("Guess karo kaunsa card sabse bada hai!");

  const numbers = [12, 45, 7, 30];

  const [cards, setCards] = useState(() =>
    numbers.map((num, index) => ({
      id: index + 1,
      value: num,
      revealed: false
    }))
  );

  const resetCards = () => {
    setCards(numbers.map((num, index) => ({ id: index + 1, value: num, revealed: false })));
    setMessage("Guess karo kaunsa card sabse bada hai!");
  };

  const handleClick = (id: number) => {
    const maxValue = Math.max(...cards.map(c => c.value));
    const selected = cards.find(c => c.id === id);

    if (selected?.value === maxValue) {
      setMessage("🔥 Sahi pakde! Highest number tha!");
    } else {
      setMessage(`❌ Galat! Highest tha ${maxValue}`);
    }

    setCards(cards.map(card => card.id === id ? { ...card, revealed: true } : card));
  };

  return (
    <div className="app">
      <h1>🧠 Guess the Highest</h1>

      <p>{message}</p>

      <div className="grid">
        {cards.map(card => (
          <Card
            key={card.id}
            data={card}
            onClick={() => handleClick(card.id)}
          />
        ))}
      </div>

      <button onClick={resetCards}>
        Restart
      </button>
    </div>
  );
};

export default App;