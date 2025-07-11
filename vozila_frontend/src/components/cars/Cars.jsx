// src/components/cars/Cars.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuta from '../hooks/useAuta';
import axios from 'axios';
import './Cars.css';
import Button from '../button/Button';

const Cars = () => {
  const [auta] = useAuta('http://127.0.0.1:8000/api/auta');
  const navigate = useNavigate();

  // Stanja za pretragu, paginaciju i sortiranje
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const itemsPerPage = 9;

  // Stanja za modal rezervacije
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuto, setSelectedAuto] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [licenceFile, setLicenceFile] = useState(null);
  const [error, setError] = useState('');

  // Filter + sort
  const filteredAuta = auta
    .filter(auto =>
      auto.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === 'asc'
        ? Number(a.price_per_day) - Number(b.price_per_day)
        : Number(b.price_per_day) - Number(a.price_per_day)
    );

  // Pagination
  const totalPages = Math.ceil(filteredAuta.length / itemsPerPage);
  const paginatedAuta = filteredAuta.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Kontroleri
  const handleSearch = e => setSearchQuery(e.target.value);
  const handleSortChange = e => setSortOrder(e.target.value);
  const handlePageChange = page => setCurrentPage(page);

  const handleMoreInfo = id => navigate(`/cars/${id}`);

  // Otvaranje/zatvaranje modala
  const openModal = auto => {
    setSelectedAuto(auto);
    setStartDate('');
    setEndDate('');
    setLicenceFile(null);
    setError('');
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleFileChange = e => setLicenceFile(e.target.files[0]);

  // Slanje rezervacije
  const handleReservation = async e => {
    e.preventDefault();
    setError('');
    if (!startDate || !endDate || !licenceFile) {
      setError('Popunite sve podatke pre rezervacije.');
      return;
    }

    const formData = new FormData();
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('auto_id', selectedAuto.id);
    formData.append('licence', licenceFile);

    try {
      const token = sessionStorage.getItem('auth_token');
      const res = await axios.post(
        'http://127.0.0.1:8000/api/rezervacije',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert(res.data.poruka || 'Rezervacija uspešno kreirana!');
      closeModal();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.poruka || 'Greška pri rezervaciji.');
    }
  };

  return (
    <div className="cars-container">
      <nav className="breadcrumbs">
        <Link to="/">Početna</Link> / <span>Naša vozila</span>
      </nav>

      <h1 className="cars-title">Naša ponuda vozila koja se mogu rezervisati</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Pretraži vozila po nazivu..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <label htmlFor="sort" className="sort-label">
          Sortiraj po ceni:
        </label>
        <select
          id="sort"
          value={sortOrder}
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="asc">Rastuće</option>
          <option value="desc">Opadajuće</option>
        </select>
      </div>

      <div className="cars-list">
        {paginatedAuta.map(auto => (
          <div key={auto.id} className="car-card">
            <h2 className="car-name">{auto.name}</h2>
            <p className="car-price">
              Cena po danu: {Number(auto.price_per_day).toFixed(2)} EUR
            </p>
            <Button
              className="car-button"
              onClick={() => handleMoreInfo(auto.id)}
            >
              Više informacija
            </Button>
            <Button
              className="car-button"
              onClick={() => openModal(auto)}
            >
              Rezerviši
            </Button>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <Button
            key={idx + 1}
            className={`pagination-button ${
              currentPage === idx + 1 ? 'active' : ''
            }`}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </Button>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            <h3>Rezervišite: {selectedAuto.name}</h3>
            <form onSubmit={handleReservation} className="rez-form">
              <label>
                Datum početka:
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  required
                />
              </label>

              <label>
                Datum završetka:
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  required
                />
              </label>

              <label>
                Vozačka dozvola:
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  required
                />
              </label>

              {error && <p className="rez-error">{error}</p>}

              <div className="modal-actions">
                <button type="submit" className="rez-btn">
                  Potvrdi
                </button>
                <button
                  type="button"
                  className="rez-btn cancel"
                  onClick={closeModal}
                >
                  Otkaži
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;
