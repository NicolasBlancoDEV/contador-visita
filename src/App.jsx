import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function App() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    console.log('Escuchando cambios en visits...');
    console.log('Firebase inicializado:', db);
    const unsubscribe = onSnapshot(collection(db, 'visits'), (snapshot) => {
      const totalVisits = snapshot.docs.length;
      console.log('Snapshot recibido, total de visitas:', totalVisits);
      setVisitCount(totalVisits);
    }, (error) => {
      console.error('Error obteniendo conteo de visitas:', error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ 
      fontFamily: 'Poppins, sans-serif', 
      backgroundColor: '#1F252A', 
      color: '#FFFFFF', 
      padding: '20px', 
      borderRadius: '8px', 
      border: '2px solid #3A4450', 
      textAlign: 'center',
      maxWidth: '300px',
      margin: '0 auto',
      marginTop: '50px'
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Contador de Visitas
      </h1>
      <p style={{ fontSize: '18px', marginTop: '10px' }}>
        Total de visitas: {visitCount}
      </p>
    </div>
  );
}

export default App;