import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Wallet } from "./components/Wallet";
import { Blockexplorer } from "./components/Blockexplorer";
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
        path: "/blockexplorer", // http://localhost:3000/blockexplorer
        element: <Blockexplorer />,
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