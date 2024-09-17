import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css';

const PatientProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const profilesPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, 'profiles'));
        const profilesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProfiles(profilesData);
        setFilteredProfiles(profilesData);
      } catch (e) {
        console.error('Error fetching profiles:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      const normalizedSearchTerm = searchTerm.toLowerCase();
      const filtered = profiles.filter(profile =>
        (profile.name && profile.name.toLowerCase().includes(normalizedSearchTerm)) ||
        (profile.contact && profile.contact.includes(searchTerm))
      );
      setFilteredProfiles(filtered);
    };

    handleSearch();
  }, [searchTerm, profiles]);

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

  const handleRowClick = (profileId) => {
    navigate(`/profile/${profileId}`);
  };

  return (
    <div className="profiles-container">
      <div className="header-container">
        <h2>Patient Profiles</h2>
        <div className="add-profile-button">
          <Link to="/add-profile">
            <button className="form-button">Add New Profile</button>
          </Link>
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or contact number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading profiles...</p>
        </div>
      ) : currentProfiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        <>
          <table className="profiles-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact</th>
                {/* <th>Medical History</th>
                <th>Allergies</th> */}
                {/* <th>Address</th>
                <th>Date of Birth</th>
                <th>Emergency Contact</th>
                <th>Insurance Info</th>
                <th>Medications</th>
                <th>Appointment History</th> */}
              </tr>
            </thead>
            <tbody>
              {currentProfiles.map((profile) => (
                <tr key={profile.id} onClick={() => handleRowClick(profile.id)}>
                  <td>{profile.name}</td>
                  <td>{profile.age}</td>
                  <td>{profile.gender}</td>
                  <td>{profile.contact}</td>
                  {/* <td>{profile.medicalHistory}</td>
                  <td>{profile.allergies}</td> */}
                  {/* <td>{profile.address}</td>
                  <td>{profile.dateOfBirth}</td>
                  <td>{profile.emergencyContact}</td>
                  <td>{profile.insuranceInfo}</td>
                  <td>{profile.medications}</td>
                  <td>{profile.appointmentHistory}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container">
            <button
              className="pagination-button"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="pagination-info">
              {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientProfile;
