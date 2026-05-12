import { TrendingUp, Euro, Recycle, Award } from 'lucide-react';
import partnersData from '../data/partners.json';
import { useApp } from '../context/AppContext';

const SAVINGS_PER_TON = 90; // € por tonelada recuperada

export default function AuditDashboard() {
  const { totalRecycledKg, eldaCoins, redeemCoins } = useApp();
  
  const tonsRecovered = totalRecycledKg / 1000;
  const totalSavings = tonsRecovered * SAVINGS_PER_TON;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        <TrendingUp size={24} />
        Panel de Auditoría
      </h2>

      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <div style={styles.metricIcon}>
            <Recycle size={32} color="#00ff88" />
          </div>
          <h3 style={styles.metricValue}>{totalRecycledKg.toFixed(1)} kg</h3>
          <p style={styles.metricLabel}>Total Recuperado</p>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricIcon}>
            <Euro size={32} color="#ffd700" />
          </div>
          <h3 style={styles.metricValue}>{totalSavings.toFixed(2)} €</h3>
          <p style={styles.metricLabel}>Ahorro Municipal</p>
          <span style={styles.metricSubtext}>
            {SAVINGS_PER_TON}€ / tonelada
          </span>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricIcon}>
            <Award size={32} color="#ff00ff" />
          </div>
          <h3 style={styles.metricValue}>{eldaCoins}</h3>
          <p style={styles.metricLabel}>Elda-Coins</p>
        </div>
      </div>

      <div style={styles.savingsTracker}>
        <h3 style={styles.sectionTitle}>Impacto en Tiempo Real</h3>
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${Math.min((totalSavings / 10000) * 100, 100)}%`
            }}
          />
        </div>
        <p style={styles.progressText}>
          Objetivo anual: 10.000€ de ahorro | Progreso: {totalSavings.toFixed(2)}€
        </p>
      </div>

      <PartnersSection />
    </div>
  );
}

function PartnersSection() {
  const { eldaCoins, redeemCoins } = useApp();
  const partners = partnersData.partners;

  const handleRedeem = (partner) => {
    if (eldaCoins >= partner.coinsRequired) {
      if (confirm(`¿Canjear ${partner.coinsRequired} Elda-Coins en ${partner.name}?`)) {
        redeemCoins(partner.coinsRequired);
        alert(`¡Canje realizado! Presenta este código en ${partner.name}: ${partner.id.toUpperCase()}`);
      }
    } else {
      alert(`Necesitas ${partner.coinsRequired} Elda-Coins. Tienes ${eldaCoins}.`);
    }
  };

  return (
    <div style={styles.partnersSection}>
      <h3 style={styles.sectionTitle}>
        <Euro size={20} />
        Partners Locales
      </h3>
      <p style={styles.partnersSubtitle}>
        Canjea tus Elda-Coins en comercios de Elda
      </p>

      <div style={styles.partnersGrid}>
        {partners.map((partner) => (
          <div key={partner.id} style={styles.partnerCard}>
            <div style={styles.partnerHeader}>
              <div style={styles.partnerLogo}>
                {partner.name.charAt(0)}
              </div>
              <div>
                <h4 style={styles.partnerName}>{partner.name}</h4>
                <span style={styles.partnerCategory}>{partner.category}</span>
              </div>
            </div>
            
            <p style={styles.partnerAddress}>{partner.address}</p>
            
            <div style={styles.partnerOffer}>
              <span style={styles.discount}>{partner.discount}</span>
              <span style={styles.coinCost}>{partner.coinsRequired} 🪙</span>
            </div>

            <button
              onClick={() => handleRedeem(partner)}
              style={{
                ...styles.redeemButton,
                opacity: eldaCoins >= partner.coinsRequired ? 1 : 0.5
              }}
              disabled={eldaCoins < partner.coinsRequired}
            >
              Canjear Ahora
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
    borderRadius: '20px',
    border: '2px solid #00ff88',
    boxShadow: '0 0 30px rgba(0, 255, 136, 0.3)'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#00ff88',
    fontSize: '1.8rem',
    marginBottom: '2rem',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  metricCard: {
    background: 'rgba(0, 0, 0, 0.4)',
    padding: '1.5rem',
    borderRadius: '15px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  metricIcon: {
    marginBottom: '1rem'
  },
  metricValue: {
    color: '#fff',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  metricLabel: {
    color: '#fff',
    opacity: 0.7,
    fontSize: '0.9rem'
  },
  metricSubtext: {
    display: 'block',
    color: '#ffd700',
    fontSize: '0.8rem',
    marginTop: '0.5rem'
  },
  savingsTracker: {
    background: 'rgba(0, 255, 136, 0.1)',
    padding: '1.5rem',
    borderRadius: '15px',
    border: '1px solid #00ff88',
    marginBottom: '2rem'
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#fff',
    marginBottom: '1rem',
    fontSize: '1.2rem'
  },
  progressBar: {
    height: '20px',
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '0.5rem'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #00ff88, #00cc6a)',
    transition: 'width 0.5s ease'
  },
  progressText: {
    color: '#fff',
    opacity: 0.8,
    fontSize: '0.9rem'
  },
  partnersSection: {
    marginTop: '2rem'
  },
  partnersSubtitle: {
    color: '#fff',
    opacity: 0.7,
    marginBottom: '1.5rem'
  },
  partnersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem'
  },
  partnerCard: {
    background: 'rgba(0, 0, 0, 0.4)',
    padding: '1.5rem',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  partnerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem'
  },
  partnerLogo: {
    width: '50px',
    height: '50px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #ff00ff, #cc00cc)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  partnerName: {
    color: '#fff',
    fontSize: '1.1rem',
    marginBottom: '0.3rem'
  },
  partnerCategory: {
    color: '#ffd700',
    fontSize: '0.85rem'
  },
  partnerAddress: {
    color: '#fff',
    opacity: 0.7,
    fontSize: '0.85rem',
    marginBottom: '1rem'
  },
  partnerOffer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    padding: '0.8rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px'
  },
  discount: {
    color: '#00ff88',
    fontWeight: 'bold'
  },
  coinCost: {
    color: '#ffd700',
    fontWeight: 'bold'
  },
  redeemButton: {
    width: '100%',
    padding: '0.8rem',
    background: 'linear-gradient(135deg, #ffd700, #ffaa00)',
    border: 'none',
    borderRadius: '8px',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
};
