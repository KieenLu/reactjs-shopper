import { PATH } from "@/config/path";
import { lazy } from "react";
import profile from "./profile";
import AuthRoute from "@/components/AuthRoute";
import ProductDetails from "@/pages/product/[slug]";
import Checkout from "../pages/Checkout";
import ViewCart from "@/pages/cart";
const ResetPasswordPage = lazy(() => import("@/pages/reset-password"));
const ShippingPage = lazy(() => import("@/pages/shipping"));
const Home = lazy(() => import("@/pages"));
const Page404 = lazy(() => import("@/pages/404"));
const AboutPage = lazy(() => import("@/pages/about"));
const AuthPage = lazy(() => import("@/pages/auth"));
const BlogPage = lazy(() => import("@/pages/blog"));
const BlogPostPage = lazy(() => import("@/pages/blog-post"));
const ComingSoonPage = lazy(() => import("@/pages/coming-soon"));
const ContactPage = lazy(() => import("@/pages/contact-us"));
const FaqPage = lazy(() => import("@/pages/faq"));
const ShopPage = lazy(() => import("@/pages/shop"));
const MainLayout = lazy(() => import("@/layouts/MainLayout"));

export const routers = [
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      profile,
      {
        element: <AuthRoute redirect={PATH.profile.index} />,
        children: [
          {
            element: <AuthPage />,
            path: PATH.account,
          },
          {
            element: <ResetPasswordPage />,
            path: PATH.resetPassword,
          },
        ],
      },
      {
        element: <Page404 />,
        path: "*",
      },
      {
        element: <BlogPage />,
        path: PATH.blog,
      },
      {
        element: <BlogPostPage />,
        path: PATH.blogPost,
      },
      {
        element: <AboutPage />,
        path: PATH.about,
      },
      {
        element: <ComingSoonPage />,
        path: PATH.comingSoon,
      },
      {
        element: <ContactPage />,
        path: PATH.contact,
      },
      {
        element: <FaqPage />,
        path: PATH.faq,
      },
      {
        element: <ShopPage />,
        path: PATH.shop,
      },
      {
        element: <ShopPage />,
        path: PATH.category,
      },
      {
        element: <ShippingPage />,
        path: PATH.shiping,
      },
      {
        element: <ProductDetails />,
        path: PATH.productDetail,
      },
      {
        element: <Checkout />,
        path: PATH.checkout,
      },
      {
        element: <ViewCart />,
        path: PATH.viewCart,
      },
    ],
  },
];
