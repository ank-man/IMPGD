import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface Species {
  scientificName: string;
  commonNames: string[];
  family: string;
  genomeSizeMb: number;
  assemblyLevel: string;
  imageUrl: string;
}

interface BrowsePageProps {
  species: Species[];
  families: string[];
  assemblyLevels: string[];
}

export default function BrowsePage({ species, families, assemblyLevels }: BrowsePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [selectedAssemblyLevels, setSelectedAssemblyLevels] = useState<string[]>([]);

  const filteredSpecies = species.filter((species) => {
    const matchesSearch =
      species.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      species.commonNames.some((name) => name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFamily =
      selectedFamilies.length === 0 || selectedFamilies.includes(species.family);

    const matchesAssemblyLevel =
      selectedAssemblyLevels.length === 0 ||
      selectedAssemblyLevels.includes(species.assemblyLevel);

    return matchesSearch && matchesFamily && matchesAssemblyLevel;
  });

  return (
    <Layout>
      <Head>
        <title>Browse Species - IMPGD</title>
        <meta
          name="description"
          content="Browse and search through our collection of Indian medicinal plant genomes."
        />
      </Head>

      <div className="container py-6 md:py-12">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Filters sidebar */}
          <aside className="w-full md:w-64">
            <div className="sticky top-20 space-y-6">
              <div className="rounded-lg border p-4">
                <h2 className="font-semibold">Search</h2>
                <div className="mt-2">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="search"
                      placeholder="Search species..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-md border border-input bg-background pl-8 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h2 className="font-semibold">Family</h2>
                <div className="mt-2 space-y-2">
                  {families.map((family) => (
                    <label key={family} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedFamilies.includes(family)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFamilies([...selectedFamilies, family]);
                          } else {
                            setSelectedFamilies(
                              selectedFamilies.filter((f) => f !== family)
                            );
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <span className="text-sm">{family}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h2 className="font-semibold">Assembly Level</h2>
                <div className="mt-2 space-y-2">
                  {assemblyLevels.map((level) => (
                    <label key={level} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedAssemblyLevels.includes(level)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAssemblyLevels([...selectedAssemblyLevels, level]);
                          } else {
                            setSelectedAssemblyLevels(
                              selectedAssemblyLevels.filter((l) => l !== level)
                            );
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <span className="text-sm">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Species grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="font-heading text-3xl font-bold">Browse Species</h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <FunnelIcon className="h-4 w-4" />
                <span>{filteredSpecies.length} species found</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSpecies.map((species) => (
                <Link
                  key={species.scientificName}
                  href={`/species/${species.scientificName.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-colors hover:bg-accent"
                >
                  <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <div className="space-y-2">
                      <h3 className="font-bold">{species.scientificName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {species.commonNames.join(', ')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Family: {species.family}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Genome Size: {species.genomeSizeMb} Mb
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Assembly: {species.assemblyLevel}
                      </p>
                    </div>
                    {species.imageUrl && (
                      <img
                        src={species.imageUrl}
                        alt={species.scientificName}
                        className="absolute bottom-0 right-0 h-24 w-24 object-cover opacity-50 transition-opacity group-hover:opacity-75"
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // In a real implementation, this would read from the processed JSON file
  const species: Species[] = [
    {
      scientificName: 'Withania somnifera',
      commonNames: ['Ashwagandha', 'Indian ginseng'],
      family: 'Solanaceae',
      genomeSizeMb: 2.8,
      assemblyLevel: 'Chromosome',
      imageUrl: '/images/withania-somnifera.jpg',
    },
    {
      scientificName: 'Ocimum sanctum',
      commonNames: ['Holy basil', 'Tulsi'],
      family: 'Lamiaceae',
      genomeSizeMb: 1.2,
      assemblyLevel: 'Scaffold',
      imageUrl: '/images/ocimum-sanctum.jpg',
    },
    {
      scientificName: 'Curcuma longa',
      commonNames: ['Turmeric'],
      family: 'Zingiberaceae',
      genomeSizeMb: 1.5,
      assemblyLevel: 'Contig',
      imageUrl: '/images/curcuma-longa.jpg',
    },
  ];

  const families = Array.from(new Set(species.map((s) => s.family)));
  const assemblyLevels = Array.from(new Set(species.map((s) => s.assemblyLevel)));

  return {
    props: {
      species,
      families,
      assemblyLevels,
    },
  };
} 