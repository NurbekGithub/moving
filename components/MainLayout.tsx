import { Header } from "./Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout(props: MainLayoutProps) {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
}
