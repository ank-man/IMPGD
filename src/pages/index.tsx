import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Species {
  scientificName: string;
  commonNames: string[];
  family: string;
  imageUrl: string;
}

interface HomeProps {
  featuredSpecies: Species[];
}

export default function Home({ featuredSpecies }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>IMPGD - Indian Medicinal Plant Genome Database</title>
        <meta
          name="description"
          content="A comprehensive database of Indian medicinal plant genomes, providing easy access to genomic data, annotations, and related resources."
        />
      </Head>

      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Indian Medicinal Plant Genome Database
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Explore the genomic landscape of Indian medicinal plants. Access genome assemblies,
            annotations, and related resources for research and discovery.
          </p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search species..."
                className="w-full rounded-md border border-input bg-background pl-8 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <Link
              href="/browse"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Browse All
            </Link>
          </div>
        </div>
      </section>

      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Featured Species
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Explore our curated selection of medicinal plants with complete genome assemblies
            and annotations.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {featuredSpecies.map((species) => (
            <Link
              key={species.scientificName}
              href={`/species/${species.scientificName.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">{species.scientificName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {species.commonNames.join(', ')}
                  </p>
                  <p className="text-sm text-muted-foreground">Family: {species.family}</p>
                </div>
                {species.imageUrl && (
                  <img
                    src={species.imageUrl}
                    alt={species.scientificName}
                    className="absolute bottom-0 right-0 h-24 w-24 object-cover opacity-50"
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // In a real implementation, this would read from the processed JSON file
  const featuredSpecies = [
    {
      scientificName: 'Withania somnifera',
      commonNames: ['Ashwagandha', 'Indian ginseng'],
      family: 'Solanaceae',
      imageUrl: '/images/withania-somnifera.jpg',
    },
    {
      scientificName: 'Ocimum sanctum',
      commonNames: ['Holy basil', 'Tulsi'],
      family: 'Lamiaceae',
      imageUrl: '/images/ocimum-sanctum.jpg',
    },
    {
      scientificName: 'Curcuma longa',
      commonNames: ['Turmeric'],
      family: 'Zingiberaceae',
      imageUrl: '/images/curcuma-longa.jpg',
    },
  ];

  return {
    props: {
      featuredSpecies,
    },
  };
}; 