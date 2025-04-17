# IMPGD - Indian Medicinal Plant Genome Database

IMPGD is a comprehensive, open-source database of Indian medicinal plant genomes. This static website provides easy access to genomic data, annotations, and related resources for researchers and practitioners in the field of medicinal plant genomics.

## Features

- 📚 Rich species description pages with detailed metadata
- 🔍 Advanced search and filtering capabilities
- 📊 Interactive data visualizations
- 📥 Centralized downloads hub
- 🌐 API-ready JSON dataset
- 🌓 Modern, responsive design with dark/light mode
- 🔄 Automated updates via GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/impgd.git
   cd impgd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Place your Excel data file:
   - Copy your `IMPGD_master.xlsx` to the `data/` directory

4. Run the ETL process:
   ```bash
   npm run etl
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the site in action.

## Project Structure

```
/data
  └─ IMPGD_master.xlsx    # Source data
/scripts
  └─ etl.ts               # Data processing
/src
  ├─ pages/              # Next.js pages
  ├─ components/         # React components
  ├─ styles/            # CSS and Tailwind
  ├─ lib/               # Utilities
  └─ api/               # API endpoints
```

## Data Format

The Excel file should contain the following columns:

- ScientificName
- CommonNames
- Family
- GenomeSizeMb
- AssemblyLevel
- GCContent
- MedicinalUses
- ActiveCompounds
- GeographicOrigin
- Latitude
- Longitude
- FTPLinkGenome
- FTPLinkAnnotation
- DOI
- PublicationTitle
- Authors
- PublicationYear
- ImageURL

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.dev/)
- [MiniSearch](https://lunrjs.com/)
- [Leaflet](https://leafletjs.com/)

## Contact

For questions and feedback, please [open an issue](https://github.com/yourusername/impgd/issues). 