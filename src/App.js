import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showRegistration, setShowRegistration] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [downloadHistory, setDownloadHistory] = useState([]);

  // Sample plant data
  const plants = [
    {
      id: 1,
      scientificName: 'Withania somnifera',
      commonNames: ['Ashwagandha', 'Indian ginseng'],
      family: 'Solanaceae',
      genomeSizeMb: 2.8,
      assemblyLevel: 'Chromosome',
      gcContent: 35.2,
      medicinalUses: ['Stress relief', 'Immune system support', 'Anti-inflammatory'],
      activeCompounds: ['Withanolides', 'Withaferin A', 'Withanone'],
      geographicOrigin: 'India',
      latitude: 20.5937,
      longitude: 78.9629,
      ftpLinkGenome: 'ftp://example.com/genomes/withania_somnifera.fasta',
      ftpLinkAnnotation: 'ftp://example.com/annotations/withania_somnifera.gff',
      doi: '10.1000/example.12345',
      publicationTitle: 'Genome assembly of Withania somnifera',
      authors: 'Smith, J., Johnson, A., Williams, B.',
      publicationYear: 2020,
      imageURL: 'https://via.placeholder.com/300x200?text=Withania+somnifera'
    },
    {
      id: 2,
      scientificName: 'Ocimum sanctum',
      commonNames: ['Holy basil', 'Tulsi'],
      family: 'Lamiaceae',
      genomeSizeMb: 1.2,
      assemblyLevel: 'Scaffold',
      gcContent: 38.5,
      medicinalUses: ['Antioxidant', 'Anti-inflammatory', 'Adaptogen'],
      activeCompounds: ['Eugenol', 'Ursolic acid', 'Rosmarinic acid'],
      geographicOrigin: 'India',
      latitude: 20.5937,
      longitude: 78.9629,
      ftpLinkGenome: 'ftp://example.com/genomes/ocimum_sanctum.fasta',
      ftpLinkAnnotation: 'ftp://example.com/annotations/ocimum_sanctum.gff',
      doi: '10.1000/example.67890',
      publicationTitle: 'Genome assembly of Ocimum sanctum',
      authors: 'Brown, R., Davis, C., Wilson, D.',
      publicationYear: 2019,
      imageURL: 'https://via.placeholder.com/300x200?text=Ocimum+sanctum'
    },
    {
      id: 3,
      scientificName: 'Curcuma longa',
      commonNames: ['Turmeric'],
      family: 'Zingiberaceae',
      genomeSizeMb: 1.5,
      assemblyLevel: 'Contig',
      gcContent: 40.1,
      medicinalUses: ['Anti-inflammatory', 'Antioxidant', 'Wound healing'],
      activeCompounds: ['Curcumin', 'Demethoxycurcumin', 'Bisdemethoxycurcumin'],
      geographicOrigin: 'India',
      latitude: 10.8505,
      longitude: 76.2711,
      ftpLinkGenome: 'ftp://example.com/genomes/curcuma_longa.fasta',
      ftpLinkAnnotation: 'ftp://example.com/annotations/curcuma_longa.gff',
      doi: '10.1000/example.24680',
      publicationTitle: 'Genome assembly of Curcuma longa',
      authors: 'Lee, S., Kim, J., Park, H.',
      publicationYear: 2021,
      imageURL: 'https://via.placeholder.com/300x200?text=Curcuma+longa'
    },
    {
      id: 4,
      scientificName: 'Azadirachta indica',
      commonNames: ['Neem'],
      family: 'Meliaceae',
      genomeSizeMb: 3.2,
      assemblyLevel: 'Chromosome',
      gcContent: 33.8,
      medicinalUses: ['Antimicrobial', 'Antiparasitic', 'Skin disorders'],
      activeCompounds: ['Azadirachtin', 'Nimbin', 'Salannin'],
      geographicOrigin: 'India',
      latitude: 23.5937,
      longitude: 85.2786,
      ftpLinkGenome: 'ftp://example.com/genomes/azadirachta_indica.fasta',
      ftpLinkAnnotation: 'ftp://example.com/annotations/azadirachta_indica.gff',
      doi: '10.1000/example.13579',
      publicationTitle: 'Genome assembly of Azadirachta indica',
      authors: 'Patel, M., Singh, R., Kumar, S.',
      publicationYear: 2018,
      imageURL: 'https://via.placeholder.com/300x200?text=Azadirachta+indica'
    },
    {
      id: 5,
      scientificName: 'Tinospora cordifolia',
      commonNames: ['Guduchi', 'Giloy'],
      family: 'Menispermaceae',
      genomeSizeMb: 1.8,
      assemblyLevel: 'Scaffold',
      gcContent: 36.7,
      medicinalUses: ['Immunomodulator', 'Antipyretic', 'Anti-inflammatory'],
      activeCompounds: ['Berberine', 'Tinosporin', 'Cordifolioside'],
      geographicOrigin: 'India',
      latitude: 28.6139,
      longitude: 77.2090,
      ftpLinkGenome: 'ftp://example.com/genomes/tinospora_cordifolia.fasta',
      ftpLinkAnnotation: 'ftp://example.com/annotations/tinospora_cordifolia.gff',
      doi: '10.1000/example.97531',
      publicationTitle: 'Genome assembly of Tinospora cordifolia',
      authors: 'Gupta, A., Sharma, P., Verma, K.',
      publicationYear: 2022,
      imageURL: 'https://via.placeholder.com/300x200?text=Tinospora+cordifolia'
    }
  ];

  // Calculate statistics
  const calculateStatistics = () => {
    const stats = {
      totalPlants: plants.length,
      families: {},
      assemblyLevels: {},
      geographicOrigins: {},
      publicationYears: {},
      totalGenomeSize: 0,
      averageGenomeSize: 0,
      averageGCContent: 0,
      totalMedicinalUses: 0,
      uniqueMedicinalUses: new Set(),
      totalActiveCompounds: 0,
      uniqueActiveCompounds: new Set(),
      downloadsByPlant: {}
    };

    // Initialize download counts
    plants.forEach(plant => {
      stats.downloadsByPlant[plant.id] = 0;
    });

    // Count downloads from history
    downloadHistory.forEach(download => {
      if (stats.downloadsByPlant[download.plantId]) {
        stats.downloadsByPlant[download.plantId]++;
      }
    });

    // Calculate other statistics
    plants.forEach(plant => {
      // Count families
      stats.families[plant.family] = (stats.families[plant.family] || 0) + 1;
      
      // Count assembly levels
      stats.assemblyLevels[plant.assemblyLevel] = (stats.assemblyLevels[plant.assemblyLevel] || 0) + 1;
      
      // Count geographic origins
      stats.geographicOrigins[plant.geographicOrigin] = (stats.geographicOrigins[plant.geographicOrigin] || 0) + 1;
      
      // Count publication years
      stats.publicationYears[plant.publicationYear] = (stats.publicationYears[plant.publicationYear] || 0) + 1;
      
      // Sum genome sizes
      stats.totalGenomeSize += plant.genomeSizeMb;
      
      // Add medicinal uses
      plant.medicinalUses.forEach(use => {
        stats.uniqueMedicinalUses.add(use);
      });
      stats.totalMedicinalUses += plant.medicinalUses.length;
      
      // Add active compounds
      plant.activeCompounds.forEach(compound => {
        stats.uniqueActiveCompounds.add(compound);
      });
      stats.totalActiveCompounds += plant.activeCompounds.length;
    });

    // Calculate averages
    stats.averageGenomeSize = stats.totalGenomeSize / stats.totalPlants;
    stats.averageGCContent = plants.reduce((sum, plant) => sum + plant.gcContent, 0) / stats.totalPlants;

    return stats;
  };

  useEffect(() => {
    // Load user count from localStorage or initialize
    const storedUserCount = localStorage.getItem('userCount');
    if (storedUserCount) {
      setUserCount(parseInt(storedUserCount));
    }

    // Check if user has already registered
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setShowRegistration(false);
    }
  }, []);

  const handleRegistration = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUserData = {
      name: formData.get('name'),
      email: formData.get('email'),
      institution: formData.get('institution'),
      registrationDate: new Date().toISOString()
    };
    
    // Save user data
    setUserData(newUserData);
    localStorage.setItem('userData', JSON.stringify(newUserData));
    
    // Update user count
    const newUserCount = userCount + 1;
    setUserCount(newUserCount);
    localStorage.setItem('userCount', newUserCount);
    
    // Hide registration form
    setShowRegistration(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    
    if (!query) {
      setSearchResults([]);
      return;
    }
    
    const results = plants.filter(plant => 
      plant.scientificName.toLowerCase().includes(query) ||
      plant.commonNames.some(name => name.toLowerCase().includes(query)) ||
      plant.family.toLowerCase().includes(query) ||
      plant.medicinalUses.some(use => use.toLowerCase().includes(query)) ||
      plant.activeCompounds.some(compound => compound.toLowerCase().includes(query))
    );
    
    setSearchResults(results);
  };

  const handleDownload = (plant) => {
    // Add to download history
    const newDownload = {
      plantId: plant.id,
      plantName: plant.scientificName,
      downloadDate: new Date().toISOString(),
      genomeLink: plant.ftpLinkGenome,
      annotationLink: plant.ftpLinkAnnotation
    };
    
    setDownloadHistory([...downloadHistory, newDownload]);
    
    // In a real app, this would trigger the actual download
    alert(`Downloading genome data for ${plant.scientificName}`);
  };

  // Calculate statistics
  const statistics = calculateStatistics();

  return (
    <div className="App">
      {showRegistration && (
        <div className="registration-modal">
          <div className="registration-form-container">
            <h2>Welcome to IMPGD</h2>
            <p>Please register to access the database</p>
            <form onSubmit={handleRegistration}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="institution">Institution</label>
                <input type="text" id="institution" name="institution" required />
              </div>
              <button type="submit" className="submit-button">Register</button>
            </form>
          </div>
        </div>
      )}

      <nav className="navbar">
        <div className="navbar-brand">
          <h1>IMPGD</h1>
          <span className="navbar-subtitle">Indian Medicinal Plants Genome Database</span>
        </div>
        <div className="navbar-menu">
          <button 
            className={activeTab === 'home' ? 'active' : ''} 
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button 
            className={activeTab === 'browse' ? 'active' : ''} 
            onClick={() => setActiveTab('browse')}
          >
            Browse
          </button>
          <button 
            className={activeTab === 'search' ? 'active' : ''} 
            onClick={() => setActiveTab('search')}
          >
            Search
          </button>
          <button 
            className={activeTab === 'download' ? 'active' : ''} 
            onClick={() => setActiveTab('download')}
          >
            Download
          </button>
          <button 
            className={activeTab === 'statistics' ? 'active' : ''} 
            onClick={() => setActiveTab('statistics')}
          >
            Statistics
          </button>
          <button 
            className={activeTab === 'about' ? 'active' : ''} 
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </div>
        <div className="user-info">
          {userData && (
            <span className="user-name">Welcome, {userData.name}</span>
          )}
          <span className="user-count">Users: {userCount}</span>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'home' && (
          <div className="home-section">
            <div className="hero">
              <h2>Discover the Genomic Secrets of Indian Medicinal Plants</h2>
              <p>A comprehensive database of genomic information for traditional medicinal plants</p>
              <button className="cta-button" onClick={() => setActiveTab('browse')}>Explore Database</button>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🧬</div>
                <h3>Genome Data</h3>
                <p>Access complete genome sequences and annotations</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌿</div>
                <h3>Medicinal Properties</h3>
                <p>Discover traditional and modern medicinal uses</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🧪</div>
                <h3>Active Compounds</h3>
                <p>Explore bioactive compounds and their properties</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🗺️</div>
                <h3>Geographic Data</h3>
                <p>Learn about plant origins and distribution</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'browse' && (
          <div className="browse-section">
            <h2>Browse Plant Database</h2>
            <div className="filter-container">
              <select>
                <option value="">Filter by Family</option>
                <option value="solanaceae">Solanaceae</option>
                <option value="lamiaceae">Lamiaceae</option>
                <option value="fabaceae">Fabaceae</option>
              </select>
              <select>
                <option value="">Filter by Assembly Level</option>
                <option value="chromosome">Chromosome</option>
                <option value="scaffold">Scaffold</option>
                <option value="contig">Contig</option>
              </select>
            </div>
            <div className="plant-grid">
              {plants.map(plant => (
                <div key={plant.id} className="plant-card" onClick={() => setSelectedPlant(plant)}>
                  <div className="plant-image">
                    <img src={plant.imageURL} alt={plant.scientificName} />
                  </div>
                  <div className="plant-info">
                    <h3>{plant.scientificName}</h3>
                    <p className="common-name">{plant.commonNames.join(', ')}</p>
                    <p className="family">Family: {plant.family}</p>
                    <div className="plant-details">
                      <span>Genome: {plant.genomeSizeMb} Mb</span>
                      <span>GC: {plant.gcContent}%</span>
                    </div>
                    <button className="view-details">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="search-section">
            <h2>Search Database</h2>
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="Search by scientific name, common name, family, medicinal use, or active compound..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
              </div>
            </form>
            
            {searchResults.length > 0 ? (
              <div className="search-results">
                <h3>Search Results ({searchResults.length})</h3>
                <div className="plant-grid">
                  {searchResults.map(plant => (
                    <div key={plant.id} className="plant-card" onClick={() => setSelectedPlant(plant)}>
                      <div className="plant-image">
                        <img src={plant.imageURL} alt={plant.scientificName} />
                      </div>
                      <div className="plant-info">
                        <h3>{plant.scientificName}</h3>
                        <p className="common-name">{plant.commonNames.join(', ')}</p>
                        <p className="family">Family: {plant.family}</p>
                        <div className="plant-details">
                          <span>Genome: {plant.genomeSizeMb} Mb</span>
                          <span>GC: {plant.gcContent}%</span>
                        </div>
                        <button className="view-details">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : searchQuery ? (
              <div className="no-results">
                <p>No results found for "{searchQuery}". Try a different search term.</p>
              </div>
            ) : null}
          </div>
        )}

        {activeTab === 'download' && (
          <div className="download-section">
            <h2>Download Genome Data</h2>
            {selectedPlant ? (
              <div className="download-details">
                <h3>{selectedPlant.scientificName} ({selectedPlant.commonNames.join(', ')})</h3>
                <div className="download-options">
                  <div className="download-option">
                    <h4>Genome Sequence</h4>
                    <p>FASTA format - {selectedPlant.genomeSizeMb} Mb</p>
                    <button onClick={() => handleDownload(selectedPlant)}>Download Genome</button>
                  </div>
                  <div className="download-option">
                    <h4>Annotation</h4>
                    <p>GFF format</p>
                    <button onClick={() => handleDownload(selectedPlant)}>Download Annotation</button>
                  </div>
                </div>
                <div className="download-history">
                  <h4>Your Download History</h4>
                  {downloadHistory.length > 0 ? (
                    <ul>
                      {downloadHistory.map((download, index) => (
                        <li key={index}>
                          {download.plantName} - {new Date(download.downloadDate).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No downloads yet</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="select-plant-message">
                <p>Please select a plant from the Browse or Search pages to download its data.</p>
                <button onClick={() => setActiveTab('browse')}>Browse Plants</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'statistics' && (
          <div className="statistics-section">
            <h2>Database Statistics</h2>
            
            <div className="statistics-overview">
              <div className="stat-card">
                <div className="stat-icon">🌿</div>
                <h3>Total Plants</h3>
                <p className="stat-value">{statistics.totalPlants}</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🧬</div>
                <h3>Total Genome Size</h3>
                <p className="stat-value">{statistics.totalGenomeSize.toFixed(1)} Mb</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <h3>Average Genome Size</h3>
                <p className="stat-value">{statistics.averageGenomeSize.toFixed(1)} Mb</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🧪</div>
                <h3>Unique Active Compounds</h3>
                <p className="stat-value">{statistics.uniqueActiveCompounds.size}</p>
              </div>
            </div>
            
            <div className="statistics-details">
              <div className="stat-detail-card">
                <h3>Plant Families</h3>
                <div className="stat-list">
                  {Object.entries(statistics.families).map(([family, count]) => (
                    <div key={family} className="stat-item">
                      <span className="stat-label">{family}</span>
                      <span className="stat-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="stat-detail-card">
                <h3>Assembly Levels</h3>
                <div className="stat-list">
                  {Object.entries(statistics.assemblyLevels).map(([level, count]) => (
                    <div key={level} className="stat-item">
                      <span className="stat-label">{level}</span>
                      <span className="stat-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="stat-detail-card">
                <h3>Geographic Origins</h3>
                <div className="stat-list">
                  {Object.entries(statistics.geographicOrigins).map(([origin, count]) => (
                    <div key={origin} className="stat-item">
                      <span className="stat-label">{origin}</span>
                      <span className="stat-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="stat-detail-card">
                <h3>Publication Years</h3>
                <div className="stat-list">
                  {Object.entries(statistics.publicationYears).map(([year, count]) => (
                    <div key={year} className="stat-item">
                      <span className="stat-label">{year}</span>
                      <span className="stat-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="statistics-details">
              <div className="stat-detail-card full-width">
                <h3>Medicinal Uses</h3>
                <div className="stat-list">
                  {Array.from(statistics.uniqueMedicinalUses).map(use => (
                    <div key={use} className="stat-item">
                      <span className="stat-label">{use}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="statistics-details">
              <div className="stat-detail-card full-width">
                <h3>Active Compounds</h3>
                <div className="stat-list">
                  {Array.from(statistics.uniqueActiveCompounds).map(compound => (
                    <div key={compound} className="stat-item">
                      <span className="stat-label">{compound}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="statistics-details">
              <div className="stat-detail-card full-width">
                <h3>Download Statistics</h3>
                <div className="stat-list">
                  {plants.map(plant => (
                    <div key={plant.id} className="stat-item">
                      <span className="stat-label">{plant.scientificName}</span>
                      <span className="stat-count">{statistics.downloadsByPlant[plant.id]} downloads</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="about-section">
            <h2>About IMPGD</h2>
            <div className="about-content">
              <p>
                IMPGD is a comprehensive database of Indian medicinal plant genomes, providing researchers, 
                practitioners, and enthusiasts with easy access to genomic data, annotations, and related resources.
              </p>
              <p>
                Our mission is to facilitate research in plant genomics, pharmacology, and traditional medicine 
                by providing structured data about medicinal plants' genomes, their properties, and associated metadata.
              </p>
              <h3>Data Sources</h3>
              <p>
                The data in IMPGD is sourced from published research papers, genome databases, and contributions 
                from researchers worldwide. All data is validated and curated to ensure accuracy and reliability.
              </p>
              <h3>How to Contribute</h3>
              <p>
                We welcome contributions from researchers and institutions. If you have data about Indian medicinal 
                plants that you'd like to add to the database, please follow our submission guidelines.
              </p>
            </div>
          </div>
        )}

        {selectedPlant && (
          <div className="plant-detail-modal">
            <div className="plant-detail-content">
              <button className="close-button" onClick={() => setSelectedPlant(null)}>×</button>
              <div className="plant-detail-header">
                <h2>{selectedPlant.scientificName}</h2>
                <p className="common-name">{selectedPlant.commonNames.join(', ')}</p>
              </div>
              <div className="plant-detail-image">
                <img src={selectedPlant.imageURL} alt={selectedPlant.scientificName} />
              </div>
              <div className="plant-detail-info">
                <div className="info-section">
                  <h3>Taxonomy</h3>
                  <p><strong>Family:</strong> {selectedPlant.family}</p>
                </div>
                <div className="info-section">
                  <h3>Genome Information</h3>
                  <p><strong>Genome Size:</strong> {selectedPlant.genomeSizeMb} Mb</p>
                  <p><strong>Assembly Level:</strong> {selectedPlant.assemblyLevel}</p>
                  <p><strong>GC Content:</strong> {selectedPlant.gcContent}%</p>
                </div>
                <div className="info-section">
                  <h3>Medicinal Uses</h3>
                  <ul>
                    {selectedPlant.medicinalUses.map((use, index) => (
                      <li key={index}>{use}</li>
                    ))}
                  </ul>
                </div>
                <div className="info-section">
                  <h3>Active Compounds</h3>
                  <ul>
                    {selectedPlant.activeCompounds.map((compound, index) => (
                      <li key={index}>{compound}</li>
                    ))}
                  </ul>
                </div>
                <div className="info-section">
                  <h3>Geographic Information</h3>
                  <p><strong>Origin:</strong> {selectedPlant.geographicOrigin}</p>
                  <p><strong>Coordinates:</strong> {selectedPlant.latitude}, {selectedPlant.longitude}</p>
                </div>
                <div className="info-section">
                  <h3>Publication</h3>
                  <p><strong>Title:</strong> {selectedPlant.publicationTitle}</p>
                  <p><strong>Authors:</strong> {selectedPlant.authors}</p>
                  <p><strong>Year:</strong> {selectedPlant.publicationYear}</p>
                  <p><strong>DOI:</strong> <a href={`https://doi.org/${selectedPlant.doi}`} target="_blank" rel="noopener noreferrer">{selectedPlant.doi}</a></p>
                </div>
                <div className="download-actions">
                  <button onClick={() => handleDownload(selectedPlant)}>Download Genome</button>
                  <button onClick={() => handleDownload(selectedPlant)}>Download Annotation</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>IMPGD</h3>
            <p>Indian Medicinal Plants Genome Database</p>
          </div>
          <div className="footer-section">
            <h3>Links</h3>
            <ul>
              <li><a href="#" onClick={() => setActiveTab('home')}>Home</a></li>
              <li><a href="#" onClick={() => setActiveTab('browse')}>Browse</a></li>
              <li><a href="#" onClick={() => setActiveTab('search')}>Search</a></li>
              <li><a href="#" onClick={() => setActiveTab('download')}>Download</a></li>
              <li><a href="#" onClick={() => setActiveTab('statistics')}>Statistics</a></li>
              <li><a href="#" onClick={() => setActiveTab('about')}>About</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>For questions or feedback, please open an issue on our GitHub repository.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} IMPGD. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App; 