# IMPGD - Indian Medicinal Plants Genome Database

A comprehensive database of Indian medicinal plant genomes, providing easy access to genomic data, annotations, and related resources.

## 🌿 Overview

IMPGD is a centralized repository for genomic information about Indian medicinal plants. This database aims to facilitate research in plant genomics, pharmacology, and traditional medicine by providing structured data about medicinal plants' genomes, their properties, and associated metadata.

## 📊 Data Structure

The database includes the following information for each medicinal plant:

- **Scientific Name**: The binomial nomenclature of the plant
- **Common Names**: Various names used to refer to the plant
- **Family**: The botanical family the plant belongs to
- **Genome Size**: Size of the genome in megabases (Mb)
- **Assembly Level**: The level of genome assembly (Chromosome, Scaffold, etc.)
- **GC Content**: The percentage of guanine and cytosine bases
- **Medicinal Uses**: Traditional and modern medicinal applications
- **Active Compounds**: Key bioactive compounds found in the plant
- **Geographic Origin**: Native region of the plant
- **Coordinates**: Latitude and longitude of the collection site
- **FTP Links**: Links to download genome and annotation files
- **Publication Information**: DOI, title, authors, and year of publication
- **Image URL**: Link to a representative image of the plant

## 🚀 Getting Started

### For Researchers

1. Download the template Excel file from the [data](data/IMPGD_master_template.xlsx) directory
2. Fill in the data for your medicinal plant following the template structure
3. Submit your data by creating a pull request to this repository

### For Users

1. Visit the [IMPGD website](https://ank-man.github.io/IMPGD)
2. Browse the database to find information about medicinal plants
3. Use the search functionality to find specific plants or properties
4. Download genome data and annotations using the provided FTP links

## 📝 Data Submission Guidelines

When submitting data to IMPGD, please ensure:

1. All required fields are filled in the template
2. Scientific names follow the correct binomial nomenclature
3. Genome data is properly annotated and validated
4. Publication information includes a valid DOI
5. Geographic coordinates are accurate
6. Image URLs point to freely available images

## 🔍 Search and Filter

The IMPGD website allows you to:

- Search by scientific name, common name, or family
- Filter by medicinal uses or active compounds
- Sort by genome size, assembly level, or publication year
- Export search results in various formats

## 📚 References

When using data from IMPGD in your research, please cite:

```
IMPGD - Indian Medicinal Plants Genome Database. Available at: https://ank-man.github.io/IMPGD
```

## 🤝 Contributing

We welcome contributions to IMPGD! If you have data about Indian medicinal plants that you'd like to add to the database, please:

1. Fork this repository
2. Add your data using the provided template
3. Submit a pull request with a description of your contribution

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions, suggestions, or to report issues, please open an issue on this GitHub repository.

## Features

- 📚 Rich species description pages with detailed metadata
- 🔍 Advanced search and filtering capabilities
- 📊 Interactive data visualizations
- 📥 Centralized downloads hub
- 🌐 API-ready JSON dataset
- 🌓 Modern, responsive design with dark/light mode
- 🔄 Automated updates via GitHub Actions

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

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.dev/)
- [MiniSearch](https://lunrjs.com/)
- [Leaflet](https://leafletjs.com/)

## Contact

For questions and feedback, please [open an issue](https://github.com/yourusername/impgd/issues).
