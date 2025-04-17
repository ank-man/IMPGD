import Head from 'next/head';
import Layout from '@/components/Layout';
import {
  DocumentTextIcon,
  BeakerIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

interface Resource {
  name: string;
  description: string;
  size: string;
  format: string;
  url: string;
  checksum?: string;
}

interface Category {
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  resources: Resource[];
}

const categories: Category[] = [
  {
    name: 'Genome Assemblies',
    description: 'Complete genome assemblies in FASTA format',
    icon: DocumentTextIcon,
    resources: [
      {
        name: 'Withania somnifera v1.0',
        description: 'Chromosome-level assembly of Ashwagandha',
        size: '2.8 GB',
        format: 'FASTA',
        url: 'ftp://example.com/genomes/withania-somnifera.fasta',
        checksum: 'sha256:1234...',
      },
      {
        name: 'Ocimum sanctum v1.0',
        description: 'Scaffold-level assembly of Holy Basil',
        size: '1.2 GB',
        format: 'FASTA',
        url: 'ftp://example.com/genomes/ocimum-sanctum.fasta',
        checksum: 'sha256:5678...',
      },
    ],
  },
  {
    name: 'Annotations',
    description: 'Gene annotations and functional information',
    icon: DocumentDuplicateIcon,
    resources: [
      {
        name: 'Withania somnifera v1.0 GFF',
        description: 'Gene annotations in GFF3 format',
        size: '150 MB',
        format: 'GFF3',
        url: 'ftp://example.com/annotations/withania-somnifera.gff',
        checksum: 'sha256:9012...',
      },
      {
        name: 'Ocimum sanctum v1.0 GFF',
        description: 'Gene annotations in GFF3 format',
        size: '80 MB',
        format: 'GFF3',
        url: 'ftp://example.com/annotations/ocimum-sanctum.gff',
        checksum: 'sha256:3456...',
      },
    ],
  },
  {
    name: 'Expression Data',
    description: 'RNA-seq and microarray datasets',
    icon: ChartBarIcon,
    resources: [
      {
        name: 'Withania somnifera RNA-seq',
        description: 'Tissue-specific expression data',
        size: '500 MB',
        format: 'TSV',
        url: 'ftp://example.com/expression/withania-somnifera-rnaseq.tsv',
        checksum: 'sha256:7890...',
      },
    ],
  },
  {
    name: 'Metabolomics',
    description: 'Metabolite profiles and pathways',
    icon: BeakerIcon,
    resources: [
      {
        name: 'Withania somnifera Metabolites',
        description: 'LC-MS based metabolite profiles',
        size: '200 MB',
        format: 'CSV',
        url: 'ftp://example.com/metabolomics/withania-somnifera.csv',
        checksum: 'sha256:1234...',
      },
    ],
  },
];

export default function DownloadsPage() {
  return (
    <Layout>
      <Head>
        <title>Downloads - IMPGD</title>
        <meta
          name="description"
          content="Download genome assemblies, annotations, and related resources for Indian medicinal plants."
        />
      </Head>

      <div className="container py-6 md:py-12">
        <div className="mx-auto max-w-[58rem] text-center">
          <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Downloads
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Access genome assemblies, annotations, and related resources for research and analysis.
          </p>
        </div>

        <div className="mt-12 grid gap-8">
          {categories.map((category) => (
            <section key={category.name} className="space-y-4">
              <div className="flex items-center space-x-2">
                <category.icon className="h-6 w-6" />
                <h2 className="text-2xl font-bold">{category.name}</h2>
              </div>
              <p className="text-muted-foreground">{category.description}</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.resources.map((resource) => (
                  <div
                    key={resource.name}
                    className="rounded-lg border bg-card p-4 text-card-foreground"
                  >
                    <h3 className="font-semibold">{resource.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                    <dl className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Size</dt>
                        <dd>{resource.size}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Format</dt>
                        <dd>{resource.format}</dd>
                      </div>
                      {resource.checksum && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Checksum</dt>
                          <dd className="font-mono text-xs">{resource.checksum}</dd>
                        </div>
                      )}
                    </dl>
                    <a
                      href={resource.url}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
} 