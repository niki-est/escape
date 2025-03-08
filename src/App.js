import React, { useState, useEffect } from 'react';
import './App.css';
import scene1Background from './scene1-background.jpg';
import scene2Background from './scene2-background.jpg';
import scene3Background from './scene3-background.jpg';
import backgroundMusic from './HHH.mp3';

const App = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const scenes = [
    {
      character: "Добро пожаловать",
      text: ["Ты видишь двери военкомата. Твои действия?"],
      options: [
        { label: "Сбежать и забыть", choice: "enter", next: null, outcome: "Тебя быстро найдут и заберут в армию. Проигрыш!" },
        { label: "Войти", choice: "run", next: 1, outcome: "Что ж... Добро пожаловать!" }
      ],
      background: scene1Background
    },
    {
      character: "Оксана",
      text: ["КПП военкомата", "Женщина спрашивает: «Вам куда?» — Твой ответ?"],
      options: [
        { label: "В туалет", choice: "toilet", next: null, outcome: "Тебя выгоняют. Проигрыш!" },
        { label: "На медкомиссию", choice: "med", next: 2, outcome: "Женщина отвечает: «Садитесь в очередь в 5 кабинет»." }
      ],
      background: scene2Background
    },
    {
      character: "Ты",
      text: ["Ты стоишь перед выбором:", "Пойти в очередь или уйти?"],
      options: [
        { label: "Пойти в очередь", choice: "queue", next: 3, outcome: "Ты идёшь в очередь." },
        { label: "Уйти", choice: "leave", next: null, outcome: "Ты ушёл. Проигрыш!" }
      ],
      background: scene3Background
    }
  ];

 const audio = new Audio(backgroundMusic);
useEffect(() => {
  audio.loop = true; // Цикличное воспроизведение
  audio.play().catch(() => {}); // Игнорируем ошибки автоплея
  return () => audio.pause(); // Остановка при размонтировании
}, []);

 const chooseOption = (choice) => {
    const scene = scenes[currentScene];
    const option = scene.options.find(opt => opt.choice === choice);
    setModalText(option.outcome);
    setModalVisible(true);
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
    <div className="App" style={{ backgroundImage: `url(${scenes[currentScene].background})` }}>
      <div className="character-box">
        <div className="character-name">{scenes[currentScene].character}</div>
      </div>
      <div className="dialog-box">
        {scenes[currentScene].text.map((line, i) => <p key={i}>{line}</p>)}
      </div>
      <div className="options">
        {scenes[currentScene].options.map((option, i) => (
          <button key={i} onClick={() => chooseOption(option.choice)}>
            {option.label}
          </button>
        ))}
      </div>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalText}</p>
            <button onClick={() => setModalVisible(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;