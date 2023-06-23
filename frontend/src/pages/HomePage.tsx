import AuthCard from "@/components/Auth/AuthCard";
import AppLayout from "@/components/Layouts/AppLayout";
import { ReactElement } from "react";

const HomePage = (): ReactElement => {
  return (
    <AppLayout>
      <>
        <AuthCard />
      </>
    </AppLayout>
  );
};

export default HomePage;
