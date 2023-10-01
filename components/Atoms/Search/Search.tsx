import React from "react";

const Search = ({
  value,
  onHandleChange,
  search,
  placeholder,
}: {
  value: any;
  onHandleChange: any;
  search: any;
  placeholder: any;
}) => {
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
