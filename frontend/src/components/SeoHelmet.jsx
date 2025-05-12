import { Helmet, HelmetProvider } from 'react-helmet-async';

// Usage: Wrap your app with <HelmetProvider> in main.jsx or App.jsx
// Then, in any page/component, use <Helmet> to set the title/description.

export function SeoHelmet({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}
