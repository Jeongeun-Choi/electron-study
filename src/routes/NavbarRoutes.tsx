import { Home, TodoList } from "pages";
import { ReactElement } from "react";
import { Route } from "react-router";

type NavbarObjectType = {
  title: string;
  path: string;
  element: ReactElement;
};

export const NavbarObject: NavbarObjectType[] = [
  { title: "Home", path: "/", element: <Home /> },
  { title: "TodoList", path: "/todo", element: <TodoList /> },
];

export const NavbarRoutes = NavbarObject.map((item) => (
  <Route key={item.path} path={item.path} element={item.element} />
));
