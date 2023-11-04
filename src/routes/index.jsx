import { lazy } from "react";

const Registration = lazy(() => import("../pages/auth/register"));
const Login = lazy(() => import("../pages/auth/login"));
const Home = lazy(() => import("../pages/home"));
const Chat = lazy(() => import("../pages/chat"));
const Group = lazy(() => import("../pages/group"));
const Search = lazy(() => import("../pages/search"));
const Accaunt = lazy(() => import("../pages/profil"));
const Message = lazy(() => import("../pages/message"));
const GroupMessage = lazy(() => import("../pages/group-message"))

const authRoutes = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Registration />,
  },
];

const privateRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [{}]
  },
  {
    path: "/chat",
    element: <Chat />,
    children: [{}]
  },
  {
    path: "/group",
    element: <Group />,
    children: [{}]
  },
  {
    path: "/search",
    element: <Search />,
    children: [{}]
  },
  {
    path: "/accaunt",
    element: <Accaunt />,
    children: [{}]
  },
  {
    path: "/message",
    element: <Message />,
    children: [{}]
  },
  {
    path: "/group-message",
    element: <GroupMessage />,
    children: [{}]
  }
];

export { authRoutes, privateRoutes };
