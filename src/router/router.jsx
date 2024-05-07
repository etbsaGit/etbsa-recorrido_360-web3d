import { createBrowserRouter } from "react-router-dom";
import { Home, NotFound } from "../pages/index";
import { LayoutHome } from "../layout/index";

export const router = createBrowserRouter([
	{
		errorElement: <NotFound />,
		path: "/",
		element: <LayoutHome />,
		children: [{ index: true, element: <Home /> }],
	},
]);
