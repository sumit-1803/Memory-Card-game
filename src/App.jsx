import { useState, useEffect } from "react";
import "./App.css";

const cardImages = [
  { src: "./public/Images/580b57fcd9996e24bc43c32a.png" },
  { src: "./public/Images/580b57fcd9996e24bc43c324.png" },
  { src: "./public/Images/580b57fcd9996e24bc43c325.png" },
  { src: "./public/Images/5859662e4f6ae202fedf2878.png" },
  { src: "./public/Images/585960224f6ae202fedf2853.png" },
  { src: "./public/Images/585965054f6ae202fedf285f.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [revealedCard, setRevealedCard] = useState(null);
  const [matchedCards, setMatchedCards] = useState([]);
  const [hideCards, setHideCards] = useState(true);

  // shuffle cards and hide them for a second
  const shuffleCards = () => {
    setHideCards(true);
    setTimeout(() => {
      const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card, index) => ({ ...card, id: index, hidden: true }));

      setCards(shuffledCards);
      setTurns(0);
      setRevealedCard(null);
      setMatchedCards([]);
      setHideCards(false);
    }, 1000);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleClick = (cardIndex) => {
    // If the card is already matched or game is hidden, return
    if (matchedCards.includes(cardIndex) || hideCards) return;

    // If the card is already revealed, return
    if (revealedCard !== null && cardIndex === revealedCard) return;

    // Toggle card visibility
    const updatedCards = cards.map((card, index) => {
      if (index === cardIndex) {
        return { ...card, hidden: !card.hidden };
      }
      return card;
    });

    setCards(updatedCards);

    // Check for match if a card is already revealed
    if (revealedCard !== null) {
      // You need to implement your own matching logic here based on card data
      if (updatedCards[cardIndex].src === updatedCards[revealedCard].src) {
        // Match found, add cards to matchedCards
        setMatchedCards([...matchedCards, cardIndex, revealedCard]);
      } else {
        // No match, hide cards after a short delay (adjust the delay as needed)
        setTimeout(() => {
          const hideUpdatedCards = updatedCards.map((card, index) => {
            if (index === cardIndex || index === revealedCard) {
              return { ...card, hidden: true };
            }
            return card;
          });

          setCards(hideUpdatedCards);
        }, 1000);
      }

      // Clear the revealed card
      setRevealedCard(null);
    } else {
      // Set the current card as revealed
      setRevealedCard(cardIndex);
    }

    // Increment turns
    setTurns(turns + 1);
  };

  return (
    <>
      <div className="App">
        <h1>Magic-Match</h1>
        <button onClick={shuffleCards}>New Game</button>
        <p>Turns: {turns}</p>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <img
            src={card.src}
            id={card.id}
            key={card.id}
            alt={`Card ${card.id}`}
            className={
              card.hidden || matchedCards.includes(card.id) || hideCards
                ? "card-hidden"
                : ""
            }
            onClick={() => handleClick(card.id)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
