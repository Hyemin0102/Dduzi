import StickyNav from "components/navigation/StickyNav";
import CommonLayout from "layouts/CommonLayout";

const Layout = (props: React.PropsWithChildren) => {
  const { children } = props;
  return <CommonLayout header={<StickyNav />}>{children}</CommonLayout>;
};

export default Layout;
