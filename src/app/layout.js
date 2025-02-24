import "./globals.css";

export const metadata = {
  title: "Travel App",
  icons: {
    icon: './../../public/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
