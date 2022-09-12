import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { InputSearch, IProps, filtersType } from "./types";
import {
  filteredSearchResult,
  handleCancel,
  handleChange,
  handleChecked,
  handleGetFilterValue,
  toggleShow
} from "./utils";

const SearchAndFilters: React.FC<IProps> = ({
  search,
  filters,
  showFilters,
  onFilterChange
}: IProps) => {
  const values = filters?.map((fil) => {
    return {
      name: fil.label,
      value: "",
      isOpen: false,
      checked: false,
      checkedValue: []
    };
  });
  const [filterValues, setFilterValues] = useState<InputSearch[]>(values);
  const [filterFromState, setFiltersFromState] = useState<filtersType[]>([]);
  const ref = React.useRef<React.LegacyRef<HTMLDivElement>>();

  React.useEffect(() => {
    setFiltersFromState(filters);
  }, [filters]);

  // eslint-disable-next-line
  function handleClickOutside(event) {
    // @ts-ignore
    if (ref.current && !ref.current.contains(event.target)) {
      toggleShow("", filterValues, setFilterValues);
    }
  }

  React.useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const renderSearch = () => {
    return (
      <TextField
        type="search"
        label="Search"
        value={search?.value}
        onChange={(e: any) => search?.onChange(e)}
        variant="outlined"
        size="small"
        sx={{ width: showFilters ? "30%" : "100%", marginRight: 2.5 }}
      />
    );
  };

  const renderFilters = () => {
    return (
      // @ts-ignore
      <div ref={ref}>
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Typography sx={{ marginRight: "1rem", whiteSpace: "nowrap", mr: 2 }}>
            Filter by:{" "}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            {filterFromState?.map(
              (
                {
                  label,
                  options,
                  hasSearch,
                  asyncSearch,
                  multiple,
                  onASyncSearch
                },
                index: any
              ) => {
                return (
                  <Box key={label} mr={1} position="relative">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                      width="max-content"
                      mb={1}
                      bgcolor={
                        filterValues!?.[index].checkedValue!.length
                          ? "blue"
                          : "inherit"
                      }
                      color={
                        !filterValues!?.[index].checkedValue!.length
                          ? "black"
                          : "#fff"
                      }
                      border="1px solid rgb(118, 118, 118)"
                      borderRadius="4px"
                      p={1}
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        toggleShow(label, filterValues, setFilterValues)
                      }
                    >
                      {filterValues!?.[index].checkedValue!.length
                        ? `${handleGetFilterValue(
                            filterValues!?.[index].checkedValue![0],
                            filterFromState
                          )} ${
                            filterValues!?.[index].checkedValue!.length > 1
                              ? ` +${
                                  filterValues!?.[index].checkedValue!.length -
                                  1
                                }`
                              : ""
                          }`
                        : label}

                      <KeyboardArrowDownIcon sx={{ marginLeft: 1 }} />
                    </Box>
                    {filterValues[index]?.isOpen ? (
                      <Box
                        component={Paper}
                        position="absolute"
                        width="max-content"
                        maxHeight="300px"
                        sx={{ overflowY: "auto" }}
                      >
                        {hasSearch ? (
                          <Box p={2}>
                            <TextField
                              variant="outlined"
                              label="search"
                              type="search"
                              size="small"
                              fullWidth
                              name={label}
                              value={
                                asyncSearch?.length
                                  ? asyncSearch
                                  : filterValues[index]?.value
                              }
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                handleChange(
                                  e,
                                  filterValues[index],
                                  asyncSearch,
                                  filterValues,
                                  setFilterValues,
                                  filterFromState
                                );
                                if (asyncSearch?.length) onASyncSearch(e);
                              }}
                            />
                          </Box>
                        ) : null}
                        <Box sx={{ textAlign: "left" }} px={3} py={0.5}>
                          {multiple ? (
                            <FormControlLabel
                              label="Select all"
                              control={
                                <Checkbox
                                  checked={
                                    filterValues[index]?.checkedValue
                                      ?.length ===
                                    filterFromState
                                      ?.map(({ options }) => options)
                                      [index]?.map(({ id }) => id)?.length
                                  }
                                  onChange={(e) =>
                                    handleChecked(
                                      e,
                                      filterValues[index],
                                      "all",
                                      index,
                                      filterValues,
                                      setFilterValues,
                                      filterFromState
                                    )
                                  }
                                />
                              }
                            />
                          ) : null}
                        </Box>

                        <Box sx={{ textAlign: "left" }}>
                          {filteredSearchResult(
                            options,
                            filterValues[index]?.value,
                            asyncSearch
                          ).length > 0
                            ? filteredSearchResult(
                                options,
                                filterValues[index]?.value,
                                asyncSearch
                              )?.map(({ id, value }) => {
                                return (
                                  <Box key={id}>
                                    {multiple ? (
                                      <Box px={3} py={0.5}>
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={filterValues[
                                                index
                                              ]?.checkedValue?.includes(id)}
                                              onChange={(e) =>
                                                handleChecked(
                                                  e,
                                                  filterValues[index],
                                                  id,
                                                  index,
                                                  filterValues,
                                                  setFilterValues,
                                                  filterFromState
                                                )
                                              }
                                            />
                                          }
                                          label={value}
                                        />
                                      </Box>
                                    ) : (
                                      <Typography
                                        sx={{
                                          textAlign: "left",
                                          width: "100%",
                                          minWidth: "150px",
                                          cursor: "pointer",
                                          p: 2,
                                          "&:hover": {
                                            background: "#FAFAFA"
                                          }
                                        }}
                                        onClick={() => {
                                          console.log({ filterValues });
                                          const selected = filterValues?.map(
                                            (fv) => {
                                              if (fv.name === label) {
                                                return {
                                                  ...fv,
                                                  checkedValue: id
                                                };
                                              }
                                              return fv;
                                            }
                                          );
                                          console.log({ selected });
                                          onFilterChange(selected);

                                          toggleShow(
                                            label,
                                            filterValues,
                                            setFilterValues
                                          );
                                        }}
                                      >
                                        {value}
                                      </Typography>
                                    )}
                                  </Box>
                                );
                              })
                            : "No search found"}
                        </Box>
                        {multiple ? (
                          <Box my={1}>
                            <Button
                              onClick={() => {
                                onFilterChange(filterValues);
                                toggleShow(
                                  label,
                                  filterValues,
                                  setFilterValues
                                );
                              }}
                            >
                              Select
                            </Button>
                            <Button
                              onClick={() =>
                                handleCancel(
                                  label,
                                  filterValues,
                                  setFilterValues
                                )
                              }
                            >
                              cancel
                            </Button>
                          </Box>
                        ) : null}
                      </Box>
                    ) : null}
                  </Box>
                );
              }
            )}
          </Box>
        </Box>
      </div>
    );
  };

  return (
    <Box display="flex" alignItems="top" justifyContent="flex-start">
      {renderSearch()} {showFilters ? renderFilters() : ""}
    </Box>
  );
};

export default SearchAndFilters;
