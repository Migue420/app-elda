import { useState } from 'react';
import { Trophy, Star, Zap, Award } from 'lucide-react';
import quizData from '../data/quizData.json';
import { useApp } from '../context/AppContext';

const levelConfig = {
  primaria: { label: 'Primaria', color: '#FFD700', icon: '🌟' },
  secundaria: { label: 'Secundaria', color: '#1E90FF', icon: '⚡' },
  universidad: { label: 'Universidad', color: '#ff00ff', icon: '🎓' }
};

export default function QuizEngine() {
  const { eldaCoins, level, setLevel, completeQuiz, quizzesCompleted } = useApp();
  const [currentLevel, setCurrentLevel] = useState(level);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = quizData[currentLevel] || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleLevelChange = (newLevel) => {
    setCurrentLevel(newLevel);
    setLevel(newLevel);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const handleAnswerSelect = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correct;
    
    if (isCorrect && !quizzesCompleted.includes(currentQuestion.id)) {
      completeQuiz(currentQuestion.id, currentQuestion.points);
      setScore(prev => prev + currentQuestion.points);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      alert(`¡Nivel completado! Has ganado ${score} Elda-Coins`);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore(0);
    }
  };

  const isCorrect = selectedAnswer === currentQuestion?.correct;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        <Trophy size={24} />
        Z-ero Challenge
      </h2>

      <div style={styles.levelSelector}>
        {Object.entries(levelConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => handleLevelChange(key)}
            style={{
              ...styles.levelButton,
              ...(currentLevel === key ? styles.activeLevel : {}),
              borderColor: config.color
            }}
          >
            <span>{config.icon}</span>
            {config.label}
          </button>
        ))}
      </div>

      <div style={styles.quizCard}>
        <div style={styles.progressHeader}>
          <span style={styles.progress}>
            Pregunta {currentQuestionIndex + 1} de {questions.length}
          </span>
          <span style={styles.score}>
            <Star size={16} color="#ffd700" />
            {score} pts
          </span>
        </div>

        {currentQuestion ? (
          <>
            <h3 style={styles.question}>{currentQuestion.question}</h3>

            <div style={styles.options}>
              {currentQuestion.options.map((option, index) => {
                let optionStyle = styles.option;
                
                if (showResult) {
                  if (index === currentQuestion.correct) {
                    optionStyle = { ...optionStyle, ...styles.correctOption };
                  } else if (index === selectedAnswer && !isCorrect) {
                    optionStyle = { ...optionStyle, ...styles.wrongOption };
                  }
                } else if (selectedAnswer === index) {
                  optionStyle = { ...optionStyle, ...styles.selectedOption };
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    style={optionStyle}
                    disabled={showResult}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div style={isCorrect ? styles.resultCorrect : styles.resultWrong}>
                <Zap size={20} />
                <span>
                  {isCorrect 
                    ? `¡Correcto! +${currentQuestion.points} Elda-Coins` 
                    : 'Incorrecto. ¡Sigue intentándolo!'}
                </span>
              </div>
            )}

            <button
              onClick={showResult ? handleNextQuestion : handleSubmitAnswer}
              style={{
                ...styles.actionButton,
                background: showResult 
                  ? 'linear-gradient(135deg, #00ff88, #00cc6a)' 
                  : 'linear-gradient(135deg, #ff00ff, #cc00cc)'
              }}
              disabled={selectedAnswer === null && !showResult}
            >
              {showResult 
                ? (currentQuestionIndex < questions.length - 1 ? 'Siguiente' : 'Finalizar') 
                : 'Responder'}
            </button>
          </>
        ) : (
          <p style={styles.noQuestions}>No hay preguntas disponibles para este nivel.</p>
        )}
      </div>

      <div style={styles.infoBox}>
        <Award size={20} color="#ffd700" />
        <p>
          Completa los cuestionarios para ganar <strong>Elda-Coins</strong>. 
          Las monedas están vinculadas a tu referencia catastral y puedes canjearlas 
          en comercios locales.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b2e 100%)',
    borderRadius: '20px',
    border: '2px solid #ffd700',
    boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#ffd700',
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  levelSelector: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  },
  levelButton: {
    flex: '1',
    minWidth: '120px',
    padding: '1rem',
    background: 'rgba(0, 0, 0, 0.4)',
    border: '2px solid',
    borderRadius: '10px',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s ease'
  },
  activeLevel: {
    background: 'rgba(255, 255, 255, 0.1)'
  },
  quizCard: {
    background: 'rgba(0, 0, 0, 0.4)',
    padding: '2rem',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    color: '#fff'
  },
  progress: {
    opacity: 0.8
  },
  score: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontWeight: 'bold'
  },
  question: {
    color: '#fff',
    fontSize: '1.3rem',
    marginBottom: '1.5rem',
    lineHeight: '1.5'
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  option: {
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid transparent',
    borderRadius: '10px',
    color: '#fff',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  selectedOption: {
    borderColor: '#ff00ff',
    background: 'rgba(255, 0, 255, 0.2)'
  },
  correctOption: {
    borderColor: '#00ff88',
    background: 'rgba(0, 255, 136, 0.2)'
  },
  wrongOption: {
    borderColor: '#ff4444',
    background: 'rgba(255, 68, 68, 0.2)'
  },
  resultCorrect: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '1rem',
    background: 'rgba(0, 255, 136, 0.2)',
    border: '1px solid #00ff88',
    borderRadius: '10px',
    color: '#00ff88',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  resultWrong: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '1rem',
    background: 'rgba(255, 68, 68, 0.2)',
    border: '1px solid #ff4444',
    borderRadius: '10px',
    color: '#ff4444',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  actionButton: {
    width: '100%',
    padding: '1rem',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  noQuestions: {
    color: '#fff',
    textAlign: 'center',
    padding: '2rem'
  },
  infoBox: {
    marginTop: '2rem',
    padding: '1rem',
    background: 'rgba(255, 215, 0, 0.1)',
    border: '1px solid #ffd700',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#fff'
  }
};
