import Dashboard from "./scenes/Dashboard";
import AddItem from "./scenes/AddItem";

const adminRoutes = [
  {
    path: "",
    component: Dashboard
  },
  {
    path: "add-item",
    component: AddItem
  }
];

export default adminRoutes;
