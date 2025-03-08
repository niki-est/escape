import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const scenes = [
    {
      text: ["Ты стоишь перед военкоматом.", "Твои действия?"],
      options: [
        { label: "Войти", choice: "enter", next: null, outcome: "Тебя сразу забирают в армию. Проигрыш!" },
        { label: "Убежать и забыть", choice: "run", next: 1, outcome: "Ты решаешь сбежать и пока в безопасности." }
      ]
    },
    {
      text: ["КПП военкомата", "Злая женщина спрашивает: «Вам куда?» — Твой ответ?"],
      options: [
        { label: "В туалет", choice: "toilet", next: null, outcome: "Тебя выгоняют. Проигрыш!" },
        { label: "На медкомиссию", choice: "med", next: 2, outcome: "Женщина отвечает: «Садитесь в очередь в 5 кабинет»." }
      ]
    },
    {
      text: ["Ты стоишь перед выбором:", "Пойти в очередь или уйти?"],
      options: [
        { label: "Пойти в очередь", choice: "queue", next: 3, outcome: "Ты идёшь в очередь." },
        { label: "Уйти", choice: "leave", next: null, outcome: "Ты ушёл. Проигрыш!" }
      ]
    }
    // Добавь остальные сцены позже
  ];

  const chooseOption = (choice) => {
    const scene = scenes[currentScene];
    const option = scene.options.find(opt => opt.choice === choice);
    alert(option.outcome);
    if (option.next !== null) {
      setCurrentScene(option.next);
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
      <div>
        {scenes[currentScene].options.map((option, i) => (
          <button key={i} onClick={() => chooseOption(option.choice)}>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;