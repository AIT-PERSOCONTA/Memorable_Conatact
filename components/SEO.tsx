import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description = "MemorableContact is the Gen AI Powered Application for your professional network. Never forget a connection again.",
    canonical = "https://memorablecontact.com",
    ogImage = "https://memorablecontact.com/og-image.jpg",
    ogType = "website"
}) => {
    const siteTitle = "Memorable Contact";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    return (
        <Helmet>
            {/* Base metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={canonical} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Schema.org for Google */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Memorable Contact",
                    "url": "https://memorablecontact.com",
                    "logo": "https://memorablecontact.com/logo.png",
                    "description": description
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
