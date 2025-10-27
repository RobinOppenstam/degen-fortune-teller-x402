import React, { useState, useEffect } from 'react';
import { useWallet } from './contexts/WalletContext';
import { api, updateApiClient, type FortuneResponse, type StatsResponse } from './services/api';
import './App.css';

function App() {
  const { walletClient, connectWallet, isConnecting } = useWallet();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('random');
  const [question, setQuestion] = useState<string>('');
  const [fortune, setFortune] = useState<FortuneResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [showFortune, setShowFortune] = useState<boolean>(false);

  // Update API client when wallet changes
  useEffect(() => {
    updateApiClient(walletClient);
  }, [walletClient]);

  // Load stats on mount
  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 10000); // Update stats every 10s
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const data = await api.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleGetFortune = async () => {
    if (!walletClient) {
      try {
        await connectWallet();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        setError('Failed to connect wallet. Please try again.');
      }
      return;
    }

    setLoading(true);
    setError('');
    setFortune(null);
    setShowFortune(false);

    try {
      const result = await api.getFortune(selectedCategory, question || undefined);
      setFortune(result);
      setShowFortune(true);
      await loadStats();
      setQuestion('');
    } catch (error: any) {
      console.error('Fortune error:', error);
      setError(error.response?.data?.error || error.message || 'Failed to get fortune');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'random', name: 'Random', icon: '🎲', desc: 'Surprise me!' },
    { id: 'love', name: 'Love', icon: '❤️', desc: 'Matters of the heart' },
    { id: 'career', name: 'Career', icon: '💼', desc: 'Professional destiny' },
    { id: 'wisdom', name: 'Wisdom', icon: '🧠', desc: 'Universal truths' },
  ];

  return (
    <div className="app">
      <header className="header">
        <div className="oracle-image">
          <img
            src="/image.png"
            alt="Mystical Oracle"
            className="oracle-img"
          />
        </div>
        <h1 className="title">AI Fortune Teller</h1>
        <p className="subtitle">Degen Oracle • Powered by x402 & OpenAI</p>
      </header>

      {stats && (
        <div className="stats-bar">
          <div className="stat">
            <div className="stat-value">{stats.totalFortunes}</div>
            <div className="stat-label">Fortunes Told</div>
          </div>
          <div className="stat">
            <div className="stat-value">{stats.totalRevenue}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
          <div className="stat">
            <div className="stat-value">$0.01</div>
            <div className="stat-label">Per Reading</div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="main-content">
          {!showFortune ? (
            <>
              <div className="section">
                <h2>Choose Your Path</h2>
                <div className="categories">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                      disabled={loading}
                    >
                      <div className="category-icon">{cat.icon}</div>
                      <div className="category-name">{cat.name}</div>
                      <div className="category-desc">{cat.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="fortune-btn"
                onClick={handleGetFortune}
                disabled={loading || isConnecting}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Processing Payment & Consulting the Oracle...
                  </>
                ) : isConnecting ? (
                  <>
                    <span className="spinner"></span>
                    Connecting Wallet...
                  </>
                ) : !walletClient ? (
                  '🔗 Connect Wallet to Begin'
                ) : (
                  <>🔮 Reveal My Fortune • $0.01 USDC</>
                )}
              </button>

              {error && (
                <div className="error-message">⚠️ {error}</div>
              )}
            </>
          ) : (
            <div className="fortune-reveal">
              <div className="fortune-card">
                <div className="fortune-header">
                  <span className="fortune-icon">
                    {categories.find(c => c.id === fortune?.category)?.icon || '🔮'}
                  </span>
                  <h2>{fortune?.message}</h2>
                </div>

                <div className="fortune-text">
                  "{fortune?.fortune}"
                </div>

                <div className="fortune-meta">
                  <div className="meta-item">
                    <span className="meta-label">Category:</span>
                    <span className="meta-value">{fortune?.category}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Fortune #:</span>
                    <span className="meta-value">{fortune?.fortuneNumber}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Cost:</span>
                    <span className="meta-value">$0.01 USDC</span>
                  </div>
                </div>

                <button
                  className="another-btn"
                  onClick={() => setShowFortune(false)}
                >
                  Get Another Fortune
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;