import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import './AdministratorDashboard.css';

const AdministratorDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem('auth_token');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          'http://127.0.0.1:8000/api/rezervacije/statistika',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStats(res.data);
      } catch (err) {
        console.error('Neuspešno učitavanje statistike:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  if (loading) return <div className="admin-dashboard">Učitavanje...</div>;
  if (!stats) return <div className="admin-dashboard">Nema podataka.</div>;

  const countData = stats.per_car.map(c => ({ name: c.auto_name, value: c.count }));
  const revenueData = stats.per_car.map(c => ({ name: c.auto_name, value: c.revenue }));

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Statistika rentiranja automobila</h1>

      <div className="stats-cards">
        <div className="stats-card">
          <h3>Ukupno rezervacija</h3>
          <p>{stats.total_reservations}</p>
        </div>
        <div className="stats-card">
          <h3>Ukupan prihod (€)</h3>
          <p>{stats.total_revenue.toFixed(2)}</p>
        </div>
        <div className="stats-card">
          <h3>Prosečna dužina (dana)</h3>
          <p>{stats.average_length_days}</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h4>Rezervacije po automobilu</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={countData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#e6b31e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h4>Prihod po automobilu (€)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#343434" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="popular-section">
        <h2>Top 5 najpopularnijih vozila</h2>
        <div className="popular-list">
          {stats.per_car
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
            .map(car => (
              <div className="popular-card" key={car.auto_id}>
                <p className="popular-name">{car.auto_name}</p>
                <p className="popular-count">Rezervacije: {car.count}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
);
};

export default AdministratorDashboard;
