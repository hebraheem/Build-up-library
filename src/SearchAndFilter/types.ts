export type InputSearch = {
  value: string;
  isOpen: boolean;
  name: string;
  checkedValue?: string[] | any[];
  checked?: boolean;
};

export type filtersType = {
  multiple: boolean;
  label: string;
  hasSearch: boolean;
  options: {
    id: string | number;
    value: string;
  }[];
  asyncSearch?: string;
  onASyncSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type IProps = {
  search: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  showFilters: boolean;
  filters: filtersType[];
  onFilterChange: (filters: any) => {} | [];
};
