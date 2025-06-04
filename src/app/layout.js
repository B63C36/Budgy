export const metadata = {
  title: 'Budgy',
  description: 'Your Smart Budget Tracker',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
