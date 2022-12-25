import Header from "./Header";
import Footer from "./Footer";
import "./PageContainer.css";

export type PageContainerProps = {
  children: any;
};

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="page">
      <Header />
      <div className="page-container">{children}</div>
      <Footer />
    </div>
  );
};

export default PageContainer;
