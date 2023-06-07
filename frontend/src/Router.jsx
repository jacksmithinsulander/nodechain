import { createBrowserRouter, useLocation, Navigate } from "react-router-dom";
import App from "./App";
import { Wallet } from "./components/Wallet";
import { BlockExplorer } from "./components/BlockExplorer";
import { Transaction } from "./components/Transaction";
import { MainView } from "./view/MainView";

const ProtectedRoute = ({
  children
}) => {
  const location = useLocation();

  const walletData = localStorage.getItem("walletData");

  if (!walletData && location.pathname !== "/loginprompt") {
    return < Navigate to = "/loginprompt"
    replace / > ;
  }

  return children;
};

export const router = createBrowserRouter([{
  path: "/", // http://localhost:3000/
  element: < MainView / > ,
  children: [{
      path: "/",
      element: < App / > ,
      index: true,
    },
    {
      path: "/wallet",
      element: ( <
        ProtectedRoute >
        <
        Wallet / >
        <
        /ProtectedRoute>
      ),
    },
    {
      path: "/explorer",
      element: ( <
        ProtectedRoute >
        <
        BlockExplorer / >
        <
        /ProtectedRoute>
      ),
    },
    {
      path: "/transaction",
      element: ( <
        ProtectedRoute >
        <
        Transaction / >
        <
        /ProtectedRoute>
      ),
    },
    {
      path: "/loginprompt",
      element: < p > Login to use this
      function,
      ogre < /p>,
    },
    {
      path: "/:random",
      element: < App / > ,
    },
  ],
}, ]);