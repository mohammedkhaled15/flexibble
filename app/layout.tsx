import Navbar from "@/components/Navbar"
import "./global.css"
import Footer from "@/components/Footer"
import AppSessionProvider from "@/components/AppSessionProvider"

export const metaData = {
  title: "Flexibble",
  description: "Showcase and Discover Remarkable Developer Projects"
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <AppSessionProvider>
        <body>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </body>
      </AppSessionProvider>
    </html>
  )
}
export default RootLayout