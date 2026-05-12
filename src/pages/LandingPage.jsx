import { Rocket, Zap, Award, MapPin, Calendar, BookOpen } from 'lucide-react';
import ProximityMap from '../components/ProximityMap';
import MonoProductCalendar from '../components/MonoProductCalendar';
import QuizEngine from '../components/QuizEngine';
import AuditDashboard from '../components/AuditDashboard';
import { useApp } from '../context/AppContext';

export default function LandingPage() {
  const { eldaCoins, redSticker, activateRedSticker } = useApp();

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.mainTitle}>
            <Rocket size={48} />
            ELDA CIRCULAR 2026
          </h1>
          <p style={styles.subtitle}>
            Sistema Operativo Cívico para la Gestión de Residuos
          </p>
          <p style={styles.tagline}>
            Transforma tu civismo en ahorro municipal &gt;90€/tonelada
          </p>
          
          <div style={styles.statsBar}>
            <div style={styles.statItem}>
              <Zap size={24} color="#ffd700" />
              <span>{eldaCoins} Elda-Coins</span>
            </div>
            <div style={styles.statItem}>
              <Award size={24} color={redSticker ? "#ff0000" : "#666"} />
              <span>Pegatina Roja: {redSticker ? "ACTIVA" : "BLOQUEADA"}</span>
            </div>
          </div>

          {!redSticker && (
            <button onClick={activateRedSticker} style={styles.stickerButton}>
              Activar Pegatina Roja
            </button>
          )}
        </div>
      </header>

      {/* Main Features Grid */}
      <main style={styles.main}>
        <section style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>
              <MapPin size={32} color="#ff00ff" />
            </div>
            <h3 style={styles.featureTitle}>Esquinas de Quita y Pon</h3>
            <p style={styles.featureDesc}>
              10 puntos de recogida optimizados por proximidad
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>
              <Calendar size={32} color="#00ff88" />
            </div>
            <h3 style={styles.featureTitle}>Calendario Mono-producto</h3>
            <p style={styles.featureDesc}>
              Cada día un residuo diferente. ¡No te equivoques!
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>
              <BookOpen size={32} color="#ffd700" />
            </div>
            <h3 style={styles.featureTitle}>Z-ero Challenge</h3>
            <p style={styles.featureDesc}>
              Gana Elda-Coins completando cuestionarios
            </p>
          </div>
        </section>

        {/* Interactive Components */}
        <section style={styles.componentsSection}>
          <ProximityMap />
        </section>

        <section style={styles.componentsSection}>
          <MonoProductCalendar />
        </section>

        <section style={styles.componentsSection}>
          <QuizEngine />
        </section>

        <section style={styles.componentsSection}>
          <AuditDashboard />
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>
          © 2026 Elda Circular - Transformando residuos en recursos
        </p>
        <p style={styles.footerNote}>
          Proyecto Civic OS | Economía Circular | Gamificación Z-ero
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    color: '#fff'
  },
  hero: {
    padding: '4rem 2rem',
    textAlign: 'center',
    background: 'linear-gradient(180deg, rgba(255,0,255,0.1) 0%, transparent 100%)',
    borderBottom: '2px solid #ff00ff'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  mainTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#00ff88',
    textTransform: 'uppercase',
    letterSpacing: '4px',
    marginBottom: '1rem',
    textShadow: '0 0 20px rgba(0, 255, 136, 0.5)'
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#ff00ff',
    marginBottom: '0.5rem'
  },
  tagline: {
    fontSize: '1.2rem',
    color: '#ffd700',
    marginBottom: '2rem'
  },
  statsBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(0, 0, 0, 0.4)',
    padding: '0.8rem 1.5rem',
    borderRadius: '25px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    fontWeight: 'bold'
  },
  stickerButton: {
    background: 'linear-gradient(135deg, #ff0000, #cc0000)',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '30px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    cursor: 'pointer',
    textTransform: 'uppercase',
    boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
    transition: 'all 0.3s ease'
  },
  main: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '3rem 2rem'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  },
  featureCard: {
    background: 'rgba(0, 0, 0, 0.3)',
    padding: '2rem',
    borderRadius: '20px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease'
  },
  featureIcon: {
    marginBottom: '1rem'
  },
  featureTitle: {
    color: '#fff',
    fontSize: '1.3rem',
    marginBottom: '0.5rem'
  },
  featureDesc: {
    color: '#fff',
    opacity: 0.7,
    fontSize: '0.95rem'
  },
  componentsSection: {
    marginBottom: '3rem'
  },
  footer: {
    textAlign: 'center',
    padding: '2rem',
    borderTop: '2px solid #00ff88',
    background: 'rgba(0, 0, 0, 0.3)'
  },
  footerNote: {
    color: '#ff00ff',
    fontSize: '0.9rem',
    marginTop: '0.5rem'
  }
};
