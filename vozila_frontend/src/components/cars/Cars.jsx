import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuta from '../hooks/useAuta';
import './Cars.css';
import Button from '../button/Button';

const Cars = () => {
  const [auta] = useAuta('http://127.0.0.1:8000/api/auta');
  const navigate = useNavigate();

  // Stanja za pretragu, paginaciju i sortiranje
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' ili 'desc'

  const itemsPerPage = 9;

  // Filtriranje po nazivu i sortiranje u zavisnosti sta je izabrano
  const filteredAuta = auta
    .filter((auto) => auto.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) =>
      sortOrder === 'asc'
        ? Number(a.price_per_day) - Number(b.price_per_day)
        : Number(b.price_per_day) - Number(a.price_per_day)
    );

  // Paginaicija i seckanje niza po stranici
  const totalPages = Math.ceil(filteredAuta.length / itemsPerPage);
  const paginatedAuta = filteredAuta.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  //navigacija na stranicu za detaljno o automobilu
  const handleMoreInfo = (id) => {
    navigate(`/cars/${id}`);
  };

  //menjanje stranice
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //menjanje sortiranja
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="cars-container">
      <nav className="breadcrumbs">
        <Link to="/">Početna</Link> / <span>Naša vozila</span>
      </nav>

      <h1 className="cars-title">Naša ponuda vozila koja se mogu rezervisati</h1>

      <div className="controls">
        {/* Pretraga */}
        <input
          type="text"
          placeholder="Pretraži vozila po nazivu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        {/* Sortiranje */}
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

      {/* Lista vozila */}
      <div className="cars-list">
        {paginatedAuta.map((auto) => (
          <div key={auto.id} className="car-card">
            <h2 className="car-name">{auto.name}</h2>
            <p className="car-price">Cena po danu: {auto.price_per_day} EUR</p>

            <Button className="car-button" onClick={() => handleMoreInfo(auto.id)}>
              Više informacija
            </Button>
            <Button className="car-button">Rezerviši</Button>
          </div>
        ))}
      </div>

      {/* Paginacija */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Cars;
