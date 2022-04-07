import Navbar from "../organisms/Navbar";
import Footer from "../molecules/Footer";

export default function BorderTemplate({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <main className="grow">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
