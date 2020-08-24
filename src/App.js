import React from "react";
import words from "./json/words.json";
import { getRndInteger } from "./helper/random";

function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function App() {
  const dateNow = new Date().getDate();
  const [date, setDate] = useStickyState(dateNow, "date");
  const [category, setCategory] = useStickyState("bilisim", "category");
  const wordsList = words[category];
  const [word, setWord] = useStickyState(wordsList[getRndInteger(0, wordsList.length)], "word");
  if (dateNow !== Number(date)) {
    setDate(new Date().getDate());
    setWord(wordsList[getRndInteger(0, wordsList.length)]);
  }
  return (
    <div style={{ margin: "1rem" }}>
      <h3 style={{ margin: "0" }}>{word.text}</h3>
      <p style={{ textAlign: "right", fontSize: "0.8rem", margin: "0" }}>- {word.author}</p>
    </div>
  );
}

export default App;
