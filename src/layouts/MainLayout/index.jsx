import { CartDrawer } from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>MainLayout Loading...</div>}>
        <CartDrawer />
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};
export default MainLayout;
