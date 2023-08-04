import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./routes/LandingPage";
import SignupPage from "./routes/SignupPage";
import SigninPage from "./routes/SigninPage";
import HomePage from "./routes/HomePage";
import ErrorPage from "./routes/ErrorPage";
import AddRecipeForm from "./components/AppRecipeForm";
import RecipeGrid from "./components/RecipeGrid";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
    children: [
      {
        path: "explore",
        element: <RecipeGrid />,
      },
      {
        path: "add_recipe",
        element: <AddRecipeForm />,
      },
      {
        path: "my_recipe",
        element: <RecipeGrid />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
