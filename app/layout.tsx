import './globals.css'

export const metadata = {
  title: 'Dynamic Data Table - Core'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
