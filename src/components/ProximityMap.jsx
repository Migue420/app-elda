import { MapPin, Recycle, Award, Info } from 'lucide-react';
import collectionData from '../data/collectionPoints.json';

const wasteTypes = {
  orgánica: { color: '#8B4513', label: 'Orgánica' },
  envases: { color: '#FFD700', label: 'Envases' },
  papel: { color: '#1E90FF', label: 'Papel' },
  vidrio: { color: '#228B22', label: 'Vidrio' },
  resto: { color: '#696969', label: 'Resto' }
};

export default function ProximityMap() {
  const points = collectionData.collectionPoints;

  return (
    <div className="map-container" style={styles.container}>
      <h2 style={styles.title}>
        <MapPin size={24} />
        Esquinas de Quita y Pon
      </h2>
      <p style={styles.subtitle}>10 puntos de recogida en Elda</p>
      
      <div style={styles.mapWrapper}>
        <div style={styles.mapPlaceholder}>
          <div style={styles.mapHeader}>
            <Recycle size={32} color="#00ff88" />
            <span>Mapa de Proximidad - Elda</span>
          </div>
          
          <div style={styles.pointsGrid}>
            {points.map((point) => (
              <div key={point.id} style={styles.pointCard}>
                <div style={styles.pointHeader}>
                  <MapPin size={16} color="#ff00ff" />
                  <span style={styles.pointName}>{point.name}</span>
                </div>
                <p style={styles.pointAddress}>{point.address}</p>
                <div style={styles.containers}>
                  {Object.entries(wasteTypes).map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        ...styles.containerDot,
                        backgroundColor: value.color
                      }}
                      title={value.label}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.legend}>
        <h4 style={styles.legendTitle}>
          <Info size={16} />
          Leyenda de Contenedores
        </h4>
        <div style={styles.legendItems}>
          {Object.entries(wasteTypes).map(([key, value]) => (
            <div key={key} style={styles.legendItem}>
              <div
                style={{
                  ...styles.legendColor,
                  backgroundColor: value.color
                }}
              />
              <span>{value.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    borderRadius: '20px',
    border: '2px solid #ff00ff',
    boxShadow: '0 0 30px rgba(255, 0, 255, 0.3)'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#00ff88',
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  subtitle: {
    color: '#fff',
    opacity: 0.8,
    marginBottom: '2rem'
  },
  mapWrapper: {
    overflowX: 'auto'
  },
  mapPlaceholder: {
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '15px',
    padding: '1.5rem',
    border: '1px solid #00ff88'
  },
  mapHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#00ff88',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    fontSize: '1.2rem'
  },
  pointsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem'
  },
  pointCard: {
    background: 'linear-gradient(135deg, #2d2d44 0%, #1f1f35 100%)',
    padding: '1rem',
    borderRadius: '10px',
    border: '1px solid #ff00ff',
    transition: 'transform 0.3s ease'
  },
  pointHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '0.5rem'
  },
  pointName: {
    color: '#ff00ff',
    fontWeight: 'bold',
    fontSize: '0.95rem'
  },
  pointAddress: {
    color: '#fff',
    opacity: 0.7,
    fontSize: '0.85rem',
    marginBottom: '0.8rem'
  },
  containers: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  containerDot: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid #fff'
  },
  legend: {
    marginTop: '2rem',
    padding: '1rem',
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '10px'
  },
  legendTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#fff',
    marginBottom: '1rem',
    fontSize: '1rem'
  },
  legendItems: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#fff'
  },
  legendColor: {
    width: '24px',
    height: '24px',
    borderRadius: '6px'
  }
};
