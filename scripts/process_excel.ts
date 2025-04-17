import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

interface SpeciesData {
  scientificName: string;
  commonNames: string[];
  family: string;
  genomeSizeMb: number;
  assemblyLevel: string;
  gcContent: number;
  medicinalUses: string[];
  activeCompounds: string[];
  geographicOrigin: string;
  latitude: number;
  longitude: number;
  ftpLinks: {
    genome: string;
    annotation: string;
  };
  primaryPublication: {
    doi: string;
    title: string;
    authors: string[];
    year: number;
  };
  imageUrl: string;
}

function processExcelFile(filePath: string): SpeciesData[] {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(worksheet);

  return data.map((row: any) => ({
    scientificName: row.ScientificName,
    commonNames: row.CommonNames.split(',').map((name: string) => name.trim()),
    family: row.Family,
    genomeSizeMb: parseFloat(row.GenomeSizeMb),
    assemblyLevel: row.AssemblyLevel,
    gcContent: parseFloat(row.GCContent),
    medicinalUses: row.MedicinalUses.split(',').map((use: string) => use.trim()),
    activeCompounds: row.ActiveCompounds.split(';').map((compound: string) => compound.trim()),
    geographicOrigin: row.GeographicOrigin,
    latitude: parseFloat(row.Latitude),
    longitude: parseFloat(row.Longitude),
    ftpLinks: {
      genome: row.FTPLinkGenome,
      annotation: row.FTPLinkAnnotation,
    },
    primaryPublication: {
      doi: row.DOI,
      title: row.PublicationTitle,
      authors: row.Authors.split(',').map((author: string) => author.trim()),
      year: parseInt(row.PublicationYear),
    },
    imageUrl: row.ImageURL,
  }));
}

function main() {
  const inputFile = path.join(process.cwd(), 'data', 'IMPGD_master_template.xlsx');
  const outputDir = path.join(process.cwd(), 'public', 'data');
  const outputFile = path.join(outputDir, 'species.json');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    const speciesData = processExcelFile(inputFile);
    fs.writeFileSync(outputFile, JSON.stringify(speciesData, null, 2));
    console.log(`Successfully processed ${speciesData.length} species entries`);
    console.log(`Output written to ${outputFile}`);
  } catch (error) {
    console.error('Error processing Excel file:', error);
    process.exit(1);
  }
}

main(); 