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
    description = "Memorable Contact (AES) by Asokumar IT (AIT). The world's first Gen AI professional memory assistant. Capture context, recall details, and optimize your networking.",
    canonical = "https://memorablecontact.com",
    ogImage = "https://memorablecontact.com/og-image.jpg",
    ogType = "website"
}) => {
    const siteTitle = "Asokumar IT (AIT) | Memorable Contact (AES)";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    return (
        <Helmet>
            {/* Base metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            <meta name="keywords" content="Asokumar IT, AIT, Memorable Contact, AES, AI Contact Manager, Professional Memory, Networking Assistant" />

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
                    "name": "Asokumar IT (AIT)",
                    "legalName": "Asokumar IT",
                    "alternateName": ["AIT", "Memorable Contact", "AES", "Asokumar Engineering Services"],
                    "url": "https://memorablecontact.com",
                    "logo": "https://memorablecontact.com/logo.png",
                    "description": "Memorable Contact (AES) is a premier AI-powered cognitive assistant developed by Asokumar IT (AIT) to revolutionize professional relationship management."
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
