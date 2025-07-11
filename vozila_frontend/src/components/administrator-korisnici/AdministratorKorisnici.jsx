import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdministratorKorisnici.css';
import Button from '../button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdministratorKorisnici = () => {
  const [korisnici, setKorisnici] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const token = sessionStorage.getItem('auth_token');
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    fetchKorisnici();
  }, []);

  const fetchKorisnici = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users');
      setKorisnici(res.data.korisnici);
    } catch (err) {
      console.error(err);
      setError('Ne mogu da učitam korisnike.');
    } finally {
      setLoading(false);
    }
  };

  const handleShow = async id => {
    try {
      const res = await api.get(`/users/${id}`);
      setSelectedUser(res.data.korisnik);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      toast.error('Greška pri učitavanju korisnika.');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Obrisati korisnika?')) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success('Korisnik obrisan.');
      fetchKorisnici();
    } catch (err) {
      console.error(err);
      toast.error('Greška pri brisanju korisnika.');
    }
  };

  return (
    <div className="korisnici-container">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="korisnici-title">Upravljanje korisnicima</h2>

      {loading && <p>Učitavanje...</p>}
      {error && <p className="korisnici-error">{error}</p>}

      {!loading && !error && (
        <table className="korisnici-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ime</th>
              <th>Email</th>
              <th>Uloga</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {korisnici.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.is_admin ? 'Administrator' : 'Korisnik'}</td>
                <td className="actions-cell">
                  <button
                    className="action-btn detail"
                    onClick={() => handleShow(u.id)}
                  >
                    Detalji
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(u.id)}
                  >
                    Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Korisnik #{selectedUser.id}</h3>
            <p><strong>Ime:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Uloga:</strong> {selectedUser.is_admin ? 'Administrator' : 'Korisnik'}</p>
            <div className="modal-actions">
              <Button onClick={() => setShowModal(false)}>Zatvori</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdministratorKorisnici;
