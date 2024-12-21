import "nes.css/css/nes.css";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>CSI Hackathon 2025</title>
        <link rel = "icon" href = "/favicon.ico"/>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
