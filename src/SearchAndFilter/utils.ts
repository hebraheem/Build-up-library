import { InputSearch } from "./types";

export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  val: InputSearch,
  asyncSearch: string,
  filterValues: any,
  setFilterValues: any,
  filterFromState: any
) => {
  e.preventDefault();
  if (asyncSearch?.length) return filterFromState;
  const result = filterValues?.map((el) => {
    if (el.name === val.name) el.value = e.target.value;
    return el;
  });
  setFilterValues(result);
};

export const toggleShow = (
  label: string,
  filterValues: any,
  setFilterValues: any
) => {
  const result = filterValues?.map((el) => {
    if (el.name === label) {
      el.isOpen = !el.isOpen;
    } else if (el.name !== label && el.isOpen) el.isOpen = false;

    return el;
  });
  setFilterValues(result);
};

export const filteredSearchResult = (
  list: any[] = [],
  search: string,
  asyncSearch: string
) => {
  if (asyncSearch) return list;
  if (Boolean(search)) {
    let filteredList = list.filter(({ value }) => {
      let filtered = value?.toLowerCase()?.includes(search?.toLowerCase());

      return filtered;
    });
    return filteredList;
  }
  return list;
};

export const handleChecked = (
  e: React.ChangeEvent<HTMLInputElement>,
  selected: InputSearch,
  id: string,
  index: number,
  filterValues: any,
  setFilterValues: any,
  filterFromState: any
) => {
  console.log(filterValues);
  const ids: (string | number)[] = filterFromState
    ?.map(({ options }) => options)
    [index]?.map(({ id }) => id);

  if (e.target.checked) {
    if (id === "all") {
      const result = filterValues?.map((el) => {
        if (el.name === selected.name) {
          el.checkedValue = ids;
          el.checked = !el.checked;
        }
        return el;
      });
      setFilterValues(result);

      return;
    }
    const result = filterValues?.map((el) => {
      if (el.name === selected.name) {
        el.checkedValue!.push(id);
        el.checked = !el.checked;
      }
      return el;
    });
    setFilterValues(result);
  } else {
    if (id === "all") {
      const result = filterValues?.map((el) => {
        if (el.name === selected.name) {
          el.checkedValue = [];
          el.checked = !el.checked;
        }
        return el;
      });
      setFilterValues(result);

      return;
    }
    const result = filterValues?.map((el) => {
      if (el.name === selected.name) {
        el.checkedValue = el.checkedValue?.filter((un) => un !== id);
        el.checked = !el.checked;
      }
      return el;
    });
    setFilterValues(result);
  }
};

export const handleGetFilterValue = (
  fit: string | number,
  filterFromState: any
): string => {
  let elem = [];

  //Check through the options and join them into a single array
  for (let i = 0; i < filterFromState!?.length; i++) {
    elem.push(...filterFromState![i].options);
  }
  //Find by id return the value
  let foundFilter = elem.find((i: any) => i.id === fit);
  return foundFilter!?.value;
};

export const handleCancel = (
  label: string,
  filterValues: any,
  setFilterValues: any
) => {
  toggleShow(label, filterValues, setFilterValues);
  const result = filterValues?.map((el) => {
    if (el.name === label) {
      el.checkedValue = [];
    }
    return el;
  });
  console.log(result);
  setFilterValues(result);
};
