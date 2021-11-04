import './App.scss';

import React, {useCallback, useEffect} from 'react';

import CategoryInput from './components/CategoryInput/CategoryInput';
import {getRndInteger} from './helper/random';
import words from './json/words.json';

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
  const dateNow = new Date().getDate(),
    [date, setDate] = useStickyState(dateNow, 'date');

  const [categories, setCategories] = useStickyState(['technology'], 'category'),
    addCategory = category => setCategories([...categories, category]),
    removeCategory = category => setCategories(categories.filter(c => c !== category));

  const wordsList = [],
    getWordsOfCategories = useCallback(() =>
      categories.forEach(category => wordsList.push(...words[category])),
    );

  const [word, setWord] = useStickyState('', 'word'),
    setRandomWord = () => {
      setWord(wordsList[getRndInteger(0, wordsList.length - 1)]);
    };

  const checkChange = () => {
    if (word && dateNow === +date) return;
    setDate(dateNow);
    setRandomWord();
  };

  const handleCategoryChangeSelect = e => {
    if (e.target.checked) addCategory(e.target.value);
    else removeCategory(e.target.value);
  };

  useEffect(() => {
    getWordsOfCategories();
    checkChange();
  }, [getWordsOfCategories]);

  return (
    <div id="App">
      <div id="optionsMenu">
        <div id="refreshMenu">
          <button onClick={setRandomWord}>Yenile</button>
        </div>
        <div id="categorySelectMenu">
          <CategoryInput
            label="Teknoloji"
            value="technology"
            isChecked={categories.includes('technology')}
            onChange={handleCategoryChangeSelect}
          />
          <CategoryInput
            label="İlham"
            value={'inspiration'}
            isChecked={categories.includes('inspiration')}
            onChange={handleCategoryChangeSelect}
          />
          <CategoryInput
            label="Motivasyon"
            value="motivation"
            isChecked={categories.includes('motivation')}
            onChange={handleCategoryChangeSelect}
          />
        </div>
      </div>
      <div id="word">
        <h1 id="text">{word && word.text}</h1>
        <p id="author">{word && word.author}</p>
      </div>
    </div>
  );
}

export default App;
