// src/components/rezervacije/Rezervacije.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../button/Button';
import './Rezervacije.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rezervacije = () => {
  const [rezervacije, setRezervacije] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editStart, setEditStart] = useState('');
  const [editEnd, setEditEnd] = useState('');

  const token = sessionStorage.getItem('auth_token');
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: { Authorization: `Bearer ${token}` }
  });

  useEffect(() => {
    fetchRezervacije();
  }, []);

  async function fetchRezervacije() {
    setLoading(true);
    try {
      const res = await api.get('/rezervacije');
      // Laravel ResourceCollection wraps in `data`
      setRezervacije(res.data.data);
    } catch (err) {
      console.error(err);
      setError('Ne mogu da učitam rezervacije.');
    } finally {
      setLoading(false);
    }
  }

  async function handleShowDetail(id) {
    try {
      const res = await api.get(`/rezervacije/${id}`);
      // Single resource also wrapped in `data`
      const r = res.data.data;
      setSelected(r);
      setShowDetail(true);
    } catch (err) {
      console.error(err);
      toast.error('Greška pri učitavanju detalja.');
    }
  }

  async function handleOpenEdit(id) {
    try {
      const res = await api.get(`/rezervacije/${id}`);
      const r = res.data.data;
      setSelected(r);
      setEditStart(r.start_date);
      setEditEnd(r.end_date);
      setShowEdit(true);
    } catch (err) {
      console.error(err);
      toast.error('Greška pri učitavanju za izmenu.');
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await api.patch(`/rezervacije/${selected.id}`, {
        start_date: editStart,
        end_date: editEnd
      });
      toast.success('Rezervacija ažurirana!');
      setShowEdit(false);
      fetchRezervacije();
    } catch (err) {
      console.error(err);
      toast.error('Greška pri ažuriranju.');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Obrisati rezervaciju?')) return;
    try {
      await api.delete(`/rezervacije/${id}`);
      toast.success('Rezervacija obrisana.');
      fetchRezervacije();
    } catch (err) {
      console.error(err);
      toast.error('Greška pri brisanju.');
    }
  }

  return (
    <div className="rezervacije-container">
      <ToastContainer position="top-right" autoClose={2500} />
      <h2 className="rez-title">Moje rezervacije</h2>

      {loading && <p>Učitavanje...</p>}
      {error && <p className="rez-error">{error}</p>}

      {!loading && !error && (
        <table className="rez-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Auto</th>
              <th>Početak</th>
              <th>Kraj</th>
              <th>Cena (€)</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {rezervacije.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.auto.name}</td>
                <td>{r.start_date}</td>
                <td>{r.end_date}</td>
                <td>{r.total_price.toFixed(2)}</td>
                <td className="actions-cell">
                  <button
                    className="action-btn detail"
                    onClick={() => handleShowDetail(r.id)}
                  >
                    Detalji
                  </button>
                  <button
                    className="action-btn edit"
                    onClick={() => handleOpenEdit(r.id)}
                  >
                    Izmeni
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(r.id)}
                  >
                    Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Detalji modal */}
      {showDetail && selected && (
        <div className="modal-overlay" onClick={() => setShowDetail(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Rezervacija #{selected.id}</h3>
            <p><strong>Auto:</strong> {selected.auto.name}</p>
            <p><strong>Početak:</strong> {selected.start_date}</p>
            <p><strong>Kraj:</strong> {selected.end_date}</p>
            <p><strong>Cena:</strong> {selected.total_price.toFixed(2)} EUR</p>
            <p>
              <strong>Dozvola:</strong>{' '}
              <a href={selected.licence} target="_blank" rel="noopener noreferrer">
                Pogledaj
              </a>
            </p>
            <div className="modal-actions">
              <Button onClick={() => setShowDetail(false)}>Zatvori</Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {showEdit && selected && (
        <div className="modal-overlay" onClick={() => setShowEdit(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Izmena rezervacije #{selected.id}</h3>
            <form onSubmit={handleUpdate}>
              <label>
                Početak:
                <input
                  type="date"
                  value={editStart}
                  onChange={e => setEditStart(e.target.value)}
                  required
                />
              </label>
              <label>
                Kraj:
                <input
                  type="date"
                  value={editEnd}
                  onChange={e => setEditEnd(e.target.value)}
                  required
                />
              </label>
              <div className="modal-actions">
                <Button type="submit">Sačuvaj</Button>
                <Button type="button" className="cancel" onClick={() => setShowEdit(false)}>
                  Otkaži
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rezervacije;
