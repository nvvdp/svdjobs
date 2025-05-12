import { Helmet, HelmetProvider } from 'react-helmet-async';

// Usage: Wrap your app with <HelmetProvider> in main.jsx or App.jsx
// Then, in any page/component, use <Helmet> to set the title/description.

export function SeoHelmet({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {/* Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "SVD Jobs",
          "url": "https://svdjobs.com/",
          "logo": "https://svdjobs.com/vite.svg",
          "sameAs": [
            "https://www.facebook.com/",
            "https://www.linkedin.com/",
            "https://www.instagram.com/",
            "https://github.com/",
            "https://www.youtube.com/"
          ]
        })}
      </script>
    </Helmet>
  );
}
