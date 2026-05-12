import { useState, useEffect } from 'react';
import { Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const wasteSchedule = [
  { day: 0, type: 'orgánica', label: 'Orgánica' },
  { day: 1, type: 'envases', label: 'Envases' },
  { day: 2, type: 'papel', label: 'Papel' },
  { day: 3, type: 'vidrio', label: 'Vidrio' },
  { day: 4, type: 'resto', label: 'Resto' },
  { day: 5, type: 'orgánica', label: 'Orgánica' },
  { day: 6, type: 'envases', label: 'Envases' }
];

const wasteColors = {
  orgánica: '#8B4513',
  envases: '#FFD700',
  papel: '#1E90FF',
  vidrio: '#228B22',
  resto: '#696969'
};

export default function MonoProductCalendar() {
  const [today, setToday] = useState(new Date());
  const [currentWaste, setCurrentWaste] = useState(null);

  useEffect(() => {
    const dayOfWeek = today.getDay();
    const todaysWaste = wasteSchedule.find(w => w.day === dayOfWeek);
    setCurrentWaste(todaysWaste);
  }, [today]);

  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dayOfWeek = date.getDay();
      const waste = wasteSchedule.find(w => w.day === dayOfWeek);
      days.push({
        date,
        dayName: date.toLocaleDateString('es-ES', { weekday: 'short' }),
        dayNumber: date.getDate(),
        waste
      });
    }
    return days;
  };

  const nextDays = getNextDays();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        <Calendar size={24} />
        Calendario Mono-producto
      </h2>
      
      <div style={styles.todayCard}>
        <div style={styles.todayHeader}>
          <span style={styles.todayLabel}>HOY</span>
          {currentWaste && (
            <CheckCircle size={20} color="#00ff88" />
          )}
        </div>
        
        {currentWaste && (
          <>
            <div
              style={{
                ...styles.wasteIndicator,
                backgroundColor: wasteColors[currentWaste.type]
              }}
            />
            <h3 style={styles.todayWaste}>{currentWaste.label}</h3>
            <p style={styles.todayDate}>
              {today.toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <div style={styles.reminder}>
              <AlertCircle size={16} />
              <span>¡Hoy toca sacar {currentWaste.label.toLowerCase()}!</span>
            </div>
          </>
        )}
      </div>

      <div style={styles.weekGrid}>
        <h4 style={styles.weekTitle}>Próximos 7 días</h4>
        <div style={styles.daysContainer}>
          {nextDays.map((day, index) => (
            <div
              key={index}
              style={{
                ...styles.dayCard,
                ...(index === 0 ? styles.today : {}),
                borderLeft: `4px solid ${wasteColors[day.waste?.type] || '#666'}`
              }}
            >
              <span style={styles.dayName}>{day.dayName}</span>
              <span style={styles.dayNumber}>{day.dayNumber}</span>
              <span
                style={{
                  ...styles.dayWaste,
                  color: wasteColors[day.waste?.type] || '#666'
                }}
              >
                {day.waste?.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.infoBox}>
        <p>
          <strong>Consejo:</strong> Saca tu residuo correspondiente antes de las 22:00h 
          en cualquiera de las 10 Esquinas de Quita y Pon.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    background: 'linear-gradient(135deg, #2d1b2e 0%, #1a1a2e 100%)',
    borderRadius: '20px',
    border: '2px solid #00ff88',
    boxShadow: '0 0 30px rgba(0, 255, 136, 0.3)'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#ff00ff',
    fontSize: '1.8rem',
    marginBottom: '2rem',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  todayCard: {
    background: 'linear-gradient(135deg, #ff00ff22 0%, #00ff8822 100%)',
    padding: '2rem',
    borderRadius: '15px',
    textAlign: 'center',
    border: '2px solid #ff00ff',
    marginBottom: '2rem'
  },
  todayHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '1rem'
  },
  todayLabel: {
    background: '#ff00ff',
    color: '#fff',
    padding: '0.3rem 1rem',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '0.9rem'
  },
  wasteIndicator: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    margin: '1rem auto',
    border: '4px solid #fff'
  },
  todayWaste: {
    color: '#00ff88',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  todayDate: {
    color: '#fff',
    opacity: 0.8,
    marginBottom: '1rem'
  },
  reminder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    color: '#ffd700',
    fontWeight: 'bold'
  },
  weekGrid: {
    marginBottom: '2rem'
  },
  weekTitle: {
    color: '#fff',
    marginBottom: '1rem',
    fontSize: '1.2rem'
  },
  daysContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem'
  },
  dayCard: {
    background: 'rgba(0, 0, 0, 0.4)',
    padding: '1rem',
    borderRadius: '10px',
    textAlign: 'center',
    transition: 'transform 0.3s ease'
  },
  today: {
    background: 'rgba(255, 0, 255, 0.2)',
    transform: 'scale(1.05)'
  },
  dayName: {
    display: 'block',
    color: '#fff',
    opacity: 0.7,
    fontSize: '0.85rem',
    textTransform: 'capitalize'
  },
  dayNumber: {
    display: 'block',
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '0.5rem 0'
  },
  dayWaste: {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 'bold'
  },
  infoBox: {
    background: 'rgba(0, 255, 136, 0.1)',
    padding: '1rem',
    borderRadius: '10px',
    border: '1px solid #00ff88',
    color: '#fff'
  }
};
