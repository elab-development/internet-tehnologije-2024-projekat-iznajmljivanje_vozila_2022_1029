// src/components/administrator/AdministratorAutomobili.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdministratorAutomobili.css';
import Button from '../button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdministratorAutomobili = () => {
  const [auta, setAuta] = useState([]);
  const [kategorije, setKategorije] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const [selected, setSelected] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [createName, setCreateName] = useState('');
  const [createDesc, setCreateDesc] = useState('');
  const [createPrice, setCreatePrice] = useState('');
  const [createCat, setCreateCat] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const token = sessionStorage.getItem('auth_token');
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    fetchAuta();
    fetchKategorije();
  }, []);

  const fetchAuta = async () => {
    setLoading(true);
    try {
      const res = await api.get('/auta');
      setAuta(res.data.data || res.data);
    } catch (err) {
      console.error(err);
      setError('Ne mogu da učitam automobile.');
    } finally {
      setLoading(false);
    }
  };

  const fetchKategorije = async () => {
    try {
      const res = await api.get('/kategorije');
      setKategorije(res.data.data || res.data);
    } catch {
      toast.error('Ne mogu da učitam kategorije.');
    }
  };

  const handleShow = async id => {
    try {
      const res = await api.get(`/auta/${id}`);
      setSelected(res.data.data || res.data);
      setShowDetail(true);
    } catch {
      toast.error('Greška pri učitavanju auta.');
    }
  };

  const handleOpenEdit = async id => {
    try {
      const res = await api.get(`/auta/${id}`);
      const a = res.data.data || res.data;
      setSelected(a);
      setEditPrice(a.price_per_day);
      setFormErrors({});
      setShowEdit(true);
    } catch {
      toast.error('Greška pri otvaranju izmena.');
    }
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setFormErrors({});
    try {
      await api.patch(`/auta/${selected.id}`, {
        price_per_day: parseInt(editPrice, 10),
      });
      toast.success('Cena uspešno ažurirana.');
      setShowEdit(false);
      fetchAuta();
    } catch (err) {
      if (err.response?.status === 422) setFormErrors(err.response.data.errors);
      else toast.error('Greška pri ažuriranju.');
    }
  };

  const handleCreate = async e => {
    e.preventDefault();
    setFormErrors({});
    try {
      await api.post('/auta', {
        name: createName,
        description: createDesc,
        price_per_day: parseInt(createPrice, 10),
        kategorija_id: parseInt(createCat, 10),
      });
      toast.success('Automobil dodat.');
      setShowCreate(false);
      fetchAuta();
    } catch (err) {
      if (err.response?.status === 422) setFormErrors(err.response.data.errors);
      else toast.error('Greška pri kreiranju auta.');
    }
  };

  return (
    <div className="auta-container">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="auta-title">Upravljanje vozilima</h2>

      <Button
        className="create-btn"
        onClick={() => { setFormErrors({}); setShowCreate(true); }}
      >
        Novi oglas
      </Button>

      {loading && <p>Učitavanje...</p>}
      {error && <p className="auta-error">{error}</p>}

      {!loading && !error && (
        <table className="auta-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Model</th>
              <th>Opis</th>
              <th>Cena (€ / dan)</th>
              <th>Kategorija</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {auta.map(a => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.description}</td>
                <td>{parseInt(a.price_per_day, 10)}</td>
                <td>{a.kategorija || '-'}</td>
                <td className="actions-cell">
                  <button
                    className="action-btn detail"
                    onClick={() => handleShow(a.id)}
                  >
                    Detalji
                  </button>
                  <button
                    className="action-btn edit"
                    onClick={() => handleOpenEdit(a.id)}
                  >
                    Izmeni cenu
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* CREATE MODAL */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Novi oglas</h3>
            <form onSubmit={handleCreate} className="edit-form">
              <label>
                Model:
                <input
                  type="text"
                  value={createName}
                  onChange={e => setCreateName(e.target.value)}
                  required
                />
                {formErrors.name && (
                  <small className="field-error">{formErrors.name[0]}</small>
                )}
              </label>
              <label>
                Opis:
                <textarea
                  value={createDesc}
                  onChange={e => setCreateDesc(e.target.value)}
                />
              </label>
              <label>
                Cena (€ / dan):
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={createPrice}
                  onChange={e => setCreatePrice(e.target.value)}
                  required
                />
                {formErrors.price_per_day && (
                  <small className="field-error">
                    {formErrors.price_per_day[0]}
                  </small>
                )}
              </label>
              <label>
                Kategorija:
                <select
                  value={createCat}
                  onChange={e => setCreateCat(e.target.value)}
                  required
                >
                  <option value="">— izaberite —</option>
                  {kategorije.map(k => (
                    <option key={k.id} value={k.id}>
                      {k.name}
                    </option>
                  ))}
                </select>
                {formErrors.kategorija_id && (
                  <small className="field-error">
                    {formErrors.kategorija_id[0]}
                  </small>
                )}
              </label>
              <div className="modal-actions">
                <Button type="submit">Sačuvaj</Button>
                <Button
                  type="button"
                  className="cancel"
                  onClick={() => setShowCreate(false)}
                >
                  Otkaži
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {showDetail && selected && (
        <div className="modal-overlay" onClick={() => setShowDetail(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Auto #{selected.id}</h3>
            <p><strong>Model:</strong> {selected.name}</p>
            <p><strong>Opis:</strong> {selected.description}</p>
            <p><strong>Cena:</strong> {parseInt(selected.price_per_day, 10)} € / dan</p>
            <p><strong>Kategorija:</strong> {selected.kategorija}</p>
            <div className="modal-actions">
              <Button onClick={() => setShowDetail(false)}>Zatvori</Button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEdit && selected && (
        <div className="modal-overlay" onClick={() => setShowEdit(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Izmeni cenu #{selected.id}</h3>
            <form onSubmit={handleUpdate} className="edit-form">
              <label>
                Nova cena (€ / dan):
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={parseInt(editPrice)}
                  onChange={e => setEditPrice(e.target.value)}
                  required
                />
                {formErrors.price_per_day && (
                  <small className="field-error">
                    {formErrors.price_per_day[0]}
                  </small>
                )}
              </label>
              <div className="modal-actions">
                <Button type="submit">Sačuvaj</Button>
                <Button
                  type="button"
                  className="cancel"
                  onClick={() => setShowEdit(false)}
                >
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

export default AdministratorAutomobili;
