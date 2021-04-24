import { Header } from "./Header";
import { QueryClientProvider, QueryClient } from "react-query";

type MainLayoutProps = {
  children: React.ReactNode;
};
const queryClient = new QueryClient();

export function MainLayout(props: MainLayoutProps) {
  const { children } = props;
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        {children}
      </QueryClientProvider>
    </>
  );
}
