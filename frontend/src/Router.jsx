import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Wallet } from "./components/Wallet";
import { BlockExplorer } from "./components/BlockExplorer";
import { Transaction } from "./components/Transaction";
import { MainView } from "./view/MainView";


export const router = createBrowserRouter([
  {
    path: "/", // http://localhost:3000/
    element: <MainView />,
    children: [
      {
        path: "/", // http://localhost:3000/
        element: <App />,
        index: true,
      },
      {
        path: "/wallet", // http://localhost:3000/wallet
        element: <Wallet />,
      },
      {
        path: "/explorer", // http://localhost:3000/explorer
        element: <BlockExplorer />,
      },
      {
        path: "/transaction", // http://localhost:3000/transaction
        element: <Transaction />,
      },
      {
        path: "/:random", // http://localhost:3000/

        element: <App />,
      },
    ],
  },
]);