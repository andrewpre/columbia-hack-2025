import React from 'react';

interface ContinueCardProps {
  title: string;
  lesson: string;
}

const ContinueCard: React.FC<ContinueCardProps> = ({ title, lesson }) => {
  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <h2 style={styles.cardTitle}>{title}</h2>
        <h3 style={styles.lessonTitle}>{lesson}</h3>
        <button className="bg-[#FF5733] text-white px-6 py-1 rounded hover:bg-blue-600 transition-all"style={styles.button}>Continue</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',  // Changed background color to white
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '300px',
    margin: '20px auto',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    color: '#333',  // Darker text color for better contrast on white
  },
  content: {
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#007BDD',  // Title text color to match your blue theme
  },
  lessonTitle: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#333',  // Dark color for the lesson name
  }}
  export default ContinueCard;