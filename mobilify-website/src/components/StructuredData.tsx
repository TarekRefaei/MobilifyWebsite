import Script from 'next/script';

interface StructuredDataProps {
  type: 'organization' | 'service' | 'faq' | 'breadcrumb' | 'website';
  data?: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mobilify.app';

  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Mobilify",
          "description": "Professional mobile app development company specializing in converting websites and ideas into custom iOS and Android applications.",
          "url": baseUrl,
          "logo": `${baseUrl}/logo.svg`,
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "hello@mobilify.app",
            "availableLanguage": "English"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          },
          "sameAs": [
            "https://twitter.com/mobilifyapp",
            "https://linkedin.com/company/mobilify"
          ],
          "foundingDate": "2024",
          "numberOfEmployees": "2-10",
          "industry": "Software Development",
          "serviceArea": {
            "@type": "Place",
            "name": "Worldwide"
          }
        };

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Mobile App Development",
          "description": "Professional mobile app development services including website conversion, custom app development, and enterprise solutions.",
          "provider": {
            "@type": "Organization",
            "name": "Mobilify",
            "url": baseUrl
          },
          "serviceType": "Mobile Application Development",
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Mobile App Development Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Website to App Conversion",
                  "description": "Convert your existing website into a native mobile app"
                },
                "price": "5000",
                "priceCurrency": "USD"
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Custom Mobile App Development",
                  "description": "Build a custom mobile app from your idea"
                },
                "price": "15000",
                "priceCurrency": "USD"
              }
            ]
          }
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data?.faqs?.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          })) || []
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data?.breadcrumbs?.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `${baseUrl}${item.url}`
          })) || []
        };

      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Mobilify",
          "description": "Turn your website or idea into a custom mobile app",
          "url": baseUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Mobilify",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.svg`
            }
          }
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) {
    return null;
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
};

export default StructuredData;
