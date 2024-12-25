import { type PropsWithChildren } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales } from '@/navigation';

export default async function LocaleLayout({
  children,
  params,
}: PropsWithChildren<PageProps>) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as never)) notFound();

  // https://next-intl-docs.vercel.app/blog/next-intl-3-0#static-rendering-of-server-components
  setRequestLocale(locale);

  // Receive messages provided in `i18n.ts`
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`bg-[#ebeeef] dark:bg-[#02080F]`}>
        {/* FIXM: we can put NextIntlClientProvider into Where client internationalization is required, Extract minimized messages from server-side (getMessages) */}
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
