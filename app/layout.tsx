export const metadata = {
  title: 'Pastebin Lite',
  description: 'Simple pastebin with expiry options',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
