const Layout = (props) => {
  const renderedPage = () => {
    const { Page } = props.route();
    return <Page />;
  };

  return (
    <div>
      <nav>
        <a href="/">Link to: "/"</a>
      </nav>
      <main>{renderedPage()}</main>
    </div>
  );
};

export default Layout;
