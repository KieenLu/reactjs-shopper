import PrivateRoute from "@/components/PrivateRoute";
import { PATH } from "@/config/path";
import AddressDetail from "@/pages/profile/address/newAddress";
import { lazy } from "react";
const ProfileLayout = lazy(() => import("@/layouts/ProfileLayout"));
const Profile = lazy(() => import("@/pages/profile"));
const ProfileOrder = lazy(() => import("@/pages/profile/order"));
const ProfilePayment = lazy(() => import("@/pages/profile/payment"));
const ProfileWishlist = lazy(() => import("@/pages/profile/wishlist"));
const ProfileAddress = lazy(() => import("@/pages/profile/address"));

const profile = {
  element: <PrivateRoute redirect={PATH.account} />,
  children: [
    {
      element: <ProfileLayout />,
      path: PATH.profile.index,
      children: [
        {
          element: <Profile />,
          index: true,
        },
        {
          element: <ProfileOrder />,
          path: PATH.profile.order,
        },
        {
          element: <ProfilePayment />,
          path: PATH.profile.payment,
        },
        {
          element: <ProfileWishlist />,
          path: PATH.profile.wishlist,
        },
        {
          element: <ProfileAddress />,
          path: PATH.profile.address,
        },
        {
          element: <AddressDetail />,
          path: PATH.profile.newAddress,
        },
        {
          element: <AddressDetail />,
          path: PATH.profile.addressDetail,
        },
      ],
    },
  ],
};
export default profile;
