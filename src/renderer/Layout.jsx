import TrendingBanner from "../components/TrendingBar";

const Layout = (props) => {
  const renderedPage = () => {
    const { Page } = props.route();
    return <Page />;
  };

  return (
    <div>
      <nav>
        <div>
          <TrendingBanner />
        </div>
      </nav>
      <main>{renderedPage()}</main>
    </div>
  );
};

export default Layout;
