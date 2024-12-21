import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>CSI Hackathon 2025</title>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
