export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <html>
      <body>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )

}
