import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    canonicalUrl?: string;
    image?: string;
    type?: 'website' | 'article' | 'product';
    schema?: object; // JSON-LD Structured Data
}

const SEO: React.FC<SEOProps> = ({
    title,
    description = "Discover WristHub's premium collection of luxury watches in Pakistan. Elegant designs, superior craftsmanship, and nationwide delivery.",
    canonicalUrl = "https://wristhub.pk",
    image = "https://wristhub.pk/wristhublogo.svg",
    type = 'website',
    schema
}) => {
    const siteTitle = `${title} | WristHub Premium`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={canonicalUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Structured Data (Google Rich Snippets) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
