import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

interface SpeciesData {
  scientificName: string;
  commonNames: string[];
  family: string;
  genomeSizeMb: number;
  assemblyLevel: string;
  gcContent: number;
  medicinalUses: string[];
  activeCompounds: Array<{
    name: string;
    description: string;
  }>;
  geographicOrigin: {
    lat: number;
    lng: number;
    region: string;
  };
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

function processExcel(): SpeciesData[] {
  const workbook = XLSX.readFile(path.join(process.cwd(), 'data', 'IMPGD_master.xlsx'));
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawData = XLSX.utils.sheet_to_json(worksheet);

  return rawData.map((row: any) => ({
    scientificName: row.ScientificName,
    commonNames: row.CommonNames.split(',').map((name: string) => name.trim()),
    family: row.Family,
    genomeSizeMb: parseFloat(row.GenomeSizeMb),
    assemblyLevel: row.AssemblyLevel,
    gcContent: parseFloat(row.GCContent),
    medicinalUses: row.MedicinalUses.split(';').map((use: string) => use.trim()),
    activeCompounds: row.ActiveCompounds.split(';').map((compound: string) => {
      const [name, description] = compound.split(':').map(s => s.trim());
      return { name, description };
    }),
    geographicOrigin: {
      lat: parseFloat(row.Latitude),
      lng: parseFloat(row.Longitude),
      region: row.GeographicOrigin
    },
    ftpLinks: {
      genome: row.FTPLinkGenome,
      annotation: row.FTPLinkAnnotation
    },
    primaryPublication: {
      doi: row.DOI,
      title: row.PublicationTitle,
      authors: row.Authors.split(',').map((author: string) => author.trim()),
      year: parseInt(row.PublicationYear)
    },
    imageUrl: row.ImageURL
  }));
}

function main() {
  try {
    const speciesData = processExcel();
    
    // Ensure the data directory exists
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write the processed data
    fs.writeFileSync(
      path.join(dataDir, 'species.json'),
      JSON.stringify(speciesData, null, 2)
    );

    console.log('✅ Successfully processed Excel file and generated species.json');
  } catch (error) {
    console.error('❌ Error processing Excel file:', error);
    process.exit(1);
  }
}

main(); 