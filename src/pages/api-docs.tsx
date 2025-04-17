import Head from 'next/head';
import Layout from '@/components/Layout';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

export default function ApiDocsPage() {
  return (
    <Layout>
      <Head>
        <title>API Documentation - IMPGD</title>
        <meta
          name="description"
          content="API documentation for accessing IMPGD data programmatically."
        />
      </Head>

      <div className="container py-6 md:py-12">
        <div className="mx-auto max-w-[58rem] text-center">
          <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            API Documentation
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Access IMPGD data programmatically through our REST API.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[58rem] space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Base URL</h2>
            <div className="rounded-lg border bg-muted p-4">
              <code className="text-sm">https://impgd.org/api</code>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Endpoints</h2>

            <div className="space-y-6">
              <div className="rounded-lg border p-4">
                <div className="flex items-center space-x-2">
                  <CodeBracketIcon className="h-5 w-5" />
                  <h3 className="text-xl font-semibold">Get All Species</h3>
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-medium">Endpoint</h4>
                    <div className="mt-1 rounded bg-muted p-2">
                      <code className="text-sm">GET /species</code>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Response</h4>
                    <pre className="mt-1 overflow-x-auto rounded bg-muted p-2 text-sm">
                      {`[
  {
    "scientificName": "Withania somnifera",
    "commonNames": ["Ashwagandha", "Indian ginseng"],
    "family": "Solanaceae",
    "genomeSizeMb": 2.8,
    "assemblyLevel": "Chromosome",
    "gcContent": 35.2,
    "medicinalUses": [
      "Adaptogen",
      "Anti-inflammatory",
      "Immunomodulatory",
      "Neuroprotective"
    ],
    "activeCompounds": [
      {
        "name": "Withanolides",
        "description": "Steroidal lactones with anti-inflammatory properties"
      }
    ],
    "geographicOrigin": {
      "lat": 20.5937,
      "lng": 78.9629,
      "region": "Indian subcontinent"
    },
    "ftpLinks": {
      "genome": "ftp://example.com/genomes/withania-somnifera.fasta",
      "annotation": "ftp://example.com/annotations/withania-somnifera.gff"
    },
    "primaryPublication": {
      "doi": "10.1038/s41588-019-0419-6",
      "title": "The genome of Withania somnifera and its medicinal properties",
      "authors": ["Smith, J.", "Johnson, A.", "Williams, B."],
      "year": 2019
    },
    "imageUrl": "/images/withania-somnifera.jpg"
  }
]`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center space-x-2">
                  <CodeBracketIcon className="h-5 w-5" />
                  <h3 className="text-xl font-semibold">Get Species by Scientific Name</h3>
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-medium">Endpoint</h4>
                    <div className="mt-1 rounded bg-muted p-2">
                      <code className="text-sm">GET /species/{'{scientificName}'}</code>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Parameters</h4>
                    <div className="mt-1">
                      <table className="min-w-full divide-y divide-border">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium">
                              Parameter
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Type</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          <tr>
                            <td className="px-4 py-2 text-sm">scientificName</td>
                            <td className="px-4 py-2 text-sm">string</td>
                            <td className="px-4 py-2 text-sm">
                              Scientific name of the species (URL encoded)
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Rate Limiting</h2>
            <p className="text-muted-foreground">
              The API is rate limited to 100 requests per hour per IP address. If you need higher
              limits, please contact us.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">CORS</h2>
            <p className="text-muted-foreground">
              Cross-Origin Resource Sharing (CORS) is enabled for all origins. You can make requests
              from any domain.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Support</h2>
            <p className="text-muted-foreground">
              For API support or to request additional features, please{' '}
              <a
                href="https://github.com/yourusername/impgd/issues"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                open an issue
              </a>{' '}
              on our GitHub repository.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
} 