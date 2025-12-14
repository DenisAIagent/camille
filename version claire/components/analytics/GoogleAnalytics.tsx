"use client";

import Script from 'next/script';

export default function GoogleAnalytics() {
  // Validate GA_MEASUREMENT_ID format to prevent XSS
  const rawId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-YVSR4T8E7G';

  // GA Measurement IDs must match pattern: G-XXXXXXXXXX
  const GA_ID_REGEX = /^G-[A-Z0-9]{10}$/;

  if (!GA_ID_REGEX.test(rawId)) {
    // If invalid, don't render analytics (prevents XSS)
    if (process.env.NODE_ENV === 'development') {
      console.warn('[DEV] Invalid GA_MEASUREMENT_ID format:', rawId);
    }
    return null;
  }

  const GA_MEASUREMENT_ID = rawId;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
