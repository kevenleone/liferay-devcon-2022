import { Liferay } from "../services/Liferay";

const Layout: React.FC = ({ children }) => (
  <main>
    <header className="App">
      <nav className="container">
        <div className="brand">
          Liferay<b>DEVCON</b>
        </div>
      </nav>
    </header>

    <div className="cards container">
      <div className="w-100">
        <h1 className="text-white">
          Welcome <i>{Liferay.ThemeDisplay.getUserName()}</i>
        </h1>

        {children}
      </div>
    </div>
  </main>
);

export default Layout;
