import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const scenes = [
    { text: ["Сцена 1: Ты перед военкоматом.", "Что делать?"], next: { run: 1, hide: 2 } },
    { text: ["Сцена 2: Ты бежишь!", "Продолжить?"], next: { run: 2, hide: 3 } },
    { text: ["Сцена 3: Ты спрятался!", "Конец."], next: null }
  ];

  const chooseOption = (choice) => {
    const nextScene = scenes[currentScene].next?.[choice];
    if (nextScene !== undefined) {
      alert(choice === "run" ? "Ты бежишь!" : "Ты спрятался!");
      setCurrentScene(nextScene);
    } else {
      alert("Игра окончена!");
    }
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.MainButton.setText("Закрыть").show().onClick(() => {
        window.Telegram.WebApp.close();
      });
    }
  };

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  return (
    <div className="App">
      <canvas id="gameCanvas" width="400" height="300" />
      <div className="scene-description">
        {scenes[currentScene].text.map((line, i) => <p key={i}>{line}</p>)}
      </div>
      {scenes[currentScene].next && (
        <div>
          <button onClick={() => chooseOption('run')}>Бежать</button>
          <button onClick={() => chooseOption('hide')}>Спрятаться</button>
        </div>
      )}
    </div>
  );
};

export default App;