import "./styles.css";
import React from "react";
import SearchAndFilters from "./SearchAndFilter";

export default function App() {
  const [search, setSearch] = React.useState("");
  const [filterValues, setFilterValues] = React.useState([]);
  console.log(search, filterValues);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <SearchAndFilters
        showFilters
        search={{
          value: search,
          onChange: (e) => setSearch(e.target.value)
        }}
        onFilterChange={(filters) => setFilterValues(filters)}
        filters={[
          {
            label: "Gender",
            options: [
              { id: "MALE", value: "Male" },
              { id: "FEMALE", value: "Female" }
            ]
          },
          {
            label: "Gender2",
            options: [
              { id: "MALE2", value: "Male2" },
              { id: "FEMALE2", value: "Female2" }
            ]
          },
          {
            label: "State",
            hasSearch: true,
            multiple: true,
            options: [
              { id: "LAGOS", value: "Lagos" },
              { id: "ABUJA", value: "Abuja" }
            ]
          },
          {
            label: "State2",
            hasSearch: true,
            multiple: true,
            options: [
              { id: "LAGOS2", value: "Lagos2" },
              { id: "ABUJA2", value: "Abuja2" }
            ]
          }
        ]}
      />
    </div>
  );
}
