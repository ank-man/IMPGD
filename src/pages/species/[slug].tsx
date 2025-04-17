import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { MapPinIcon, DocumentTextIcon, BeakerIcon } from '@heroicons/react/24/outline';

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

interface SpeciesPageProps {
  species: SpeciesData;
}

export default function SpeciesPage({ species }: SpeciesPageProps) {
  return (
    <Layout>
      <Head>
        <title>{`${species.scientificName} - IMPGD`}</title>
        <meta
          name="description"
          content={`Genome information and resources for ${species.scientificName} (${species.commonNames.join(
            ', '
          )})`}
        />
      </Head>

      <article className="container py-6 md:py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h1 className="font-heading text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
              {species.scientificName}
            </h1>
            <div className="flex flex-wrap gap-2">
              {species.commonNames.map((name) => (
                <span
                  key={name}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="text-muted-foreground">Family: {species.family}</p>
          </div>
          {species.imageUrl && (
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={species.imageUrl}
                alt={species.scientificName}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h2 className="font-semibold">Genome Information</h2>
            <dl className="mt-2 space-y-2">
              <div>
                <dt className="text-sm text-muted-foreground">Size</dt>
                <dd className="font-medium">{species.genomeSizeMb} Mb</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Assembly Level</dt>
                <dd className="font-medium">{species.assemblyLevel}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">GC Content</dt>
                <dd className="font-medium">{species.gcContent}%</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border p-4">
            <h2 className="font-semibold">Downloads</h2>
            <div className="mt-2 space-y-2">
              {species.ftpLinks.genome && (
                <a
                  href={species.ftpLinks.genome}
                  className="flex items-center text-sm text-primary hover:underline"
                >
                  <DocumentTextIcon className="mr-2 h-4 w-4" />
                  Genome FASTA
                </a>
              )}
              {species.ftpLinks.annotation && (
                <a
                  href={species.ftpLinks.annotation}
                  className="flex items-center text-sm text-primary hover:underline"
                >
                  <DocumentTextIcon className="mr-2 h-4 w-4" />
                  Annotation GFF
                </a>
              )}
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h2 className="font-semibold">Publication</h2>
            <div className="mt-2 space-y-2">
              <p className="text-sm">{species.primaryPublication.title}</p>
              <p className="text-sm text-muted-foreground">
                {species.primaryPublication.authors.join(', ')} ({species.primaryPublication.year})
              </p>
              <a
                href={`https://doi.org/${species.primaryPublication.doi}`}
                className="text-sm text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI: {species.primaryPublication.doi}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h2 className="font-semibold">Medicinal Uses</h2>
            <ul className="mt-2 list-inside list-disc space-y-1">
              {species.medicinalUses.map((use, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {use}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border p-4">
            <h2 className="font-semibold">Active Compounds</h2>
            <div className="mt-2 space-y-2">
              {species.activeCompounds.map((compound, index) => (
                <div key={index}>
                  <dt className="font-medium">{compound.name}</dt>
                  <dd className="text-sm text-muted-foreground">{compound.description}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border p-4">
          <h2 className="font-semibold">Geographic Origin</h2>
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <MapPinIcon className="mr-2 h-4 w-4" />
            {species.geographicOrigin.region}
          </div>
          {/* Add Leaflet map component here */}
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // In a real implementation, this would read from the processed JSON file
  const species = [
    {
      scientificName: 'Withania somnifera',
      slug: 'withania-somnifera',
    },
    {
      scientificName: 'Ocimum sanctum',
      slug: 'ocimum-sanctum',
    },
    {
      scientificName: 'Curcuma longa',
      slug: 'curcuma-longa',
    },
  ];

  const paths = species.map((species) => ({
    params: { slug: species.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // In a real implementation, this would read from the processed JSON file
  const speciesData: SpeciesData = {
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
  };

  return {
    props: {
      species: speciesData,
    },
  };
}; 