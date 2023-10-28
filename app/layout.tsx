import Navbar from "@/components/Navbar"
import "./global.css"
import Footer from "@/components/Footer"

export const metaData = {
  title: "Flexibble",
  description: "Showcase and Discover Remarkable Developer Projects"
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
export default RootLayout