import { Link } from 'react-router-dom';
import '../styles/style.css'; 

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to the Medical Follow-up System</h1>
        <p className="home-description">This application helps track prescriptions, medications, and patient feedback.</p>
        
        <div className='home-button1'>
        <Link to="/profile" className="home-button">Get Started</Link>

      
        <Link to="/add-appointment" className="home-button">Add Appointment</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
