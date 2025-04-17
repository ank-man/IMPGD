import type { NextApiRequest, NextApiResponse } from 'next';
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SpeciesData[] | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // In a real implementation, this would read from the processed JSON file
    const speciesData: SpeciesData[] = [
      {
        scientificName: 'Withania somnifera',
        commonNames: ['Ashwagandha', 'Indian ginseng'],
        family: 'Solanaceae',
        genomeSizeMb: 2.8,
        assemblyLevel: 'Chromosome',
        gcContent: 35.2,
        medicinalUses: [
          'Adaptogen',
          'Anti-inflammatory',
          'Immunomodulatory',
          'Neuroprotective',
        ],
        activeCompounds: [
          {
            name: 'Withanolides',
            description: 'Steroidal lactones with anti-inflammatory properties',
          },
          {
            name: 'Withaferin A',
            description: 'Anti-cancer compound with multiple biological activities',
          },
        ],
        geographicOrigin: {
          lat: 20.5937,
          lng: 78.9629,
          region: 'Indian subcontinent',
        },
        ftpLinks: {
          genome: 'ftp://example.com/genomes/withania-somnifera.fasta',
          annotation: 'ftp://example.com/annotations/withania-somnifera.gff',
        },
        primaryPublication: {
          doi: '10.1038/s41588-019-0419-6',
          title: 'The genome of Withania somnifera and its medicinal properties',
          authors: ['Smith, J.', 'Johnson, A.', 'Williams, B.'],
          year: 2019,
        },
        imageUrl: '/images/withania-somnifera.jpg',
      },
      {
        scientificName: 'Ocimum sanctum',
        commonNames: ['Holy basil', 'Tulsi'],
        family: 'Lamiaceae',
        genomeSizeMb: 1.2,
        assemblyLevel: 'Scaffold',
        gcContent: 38.5,
        medicinalUses: [
          'Anti-inflammatory',
          'Antioxidant',
          'Antimicrobial',
          'Adaptogen',
        ],
        activeCompounds: [
          {
            name: 'Eugenol',
            description: 'Phenylpropanoid with antimicrobial properties',
          },
          {
            name: 'Ursolic acid',
            description: 'Triterpenoid with anti-inflammatory properties',
          },
        ],
        geographicOrigin: {
          lat: 20.5937,
          lng: 78.9629,
          region: 'Indian subcontinent',
        },
        ftpLinks: {
          genome: 'ftp://example.com/genomes/ocimum-sanctum.fasta',
          annotation: 'ftp://example.com/annotations/ocimum-sanctum.gff',
        },
        primaryPublication: {
          doi: '10.1038/s41588-019-0420-0',
          title: 'The genome of Ocimum sanctum and its medicinal properties',
          authors: ['Brown, R.', 'Davis, M.', 'Wilson, K.'],
          year: 2019,
        },
        imageUrl: '/images/ocimum-sanctum.jpg',
      },
    ];

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json(speciesData);
  } catch (error) {
    console.error('Error reading species data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 