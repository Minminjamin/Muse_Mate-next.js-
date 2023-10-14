import React from "react";

interface Search {
  value: string;
  onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: () => void;
  placeholder: string;
}
const Search = ({ value, onHandleChange, search, placeholder }: Search) => {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={onHandleChange}
        placeholder={placeholder}
      />
      <button onClick={search}></button>
    </>
  );
};

export default Search;
