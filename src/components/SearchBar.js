import { Search } from "@mui/icons-material";
import React, { useState } from "react";
import styles from "../styles/Admin.module.css";

function SearchBar({ setSearchData, setSearchTerm, data }) {
  const [wordEntered, setwordEntered] = useState("");

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setSearchTerm(searchWord)
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase()) || value.indexNo.toLowerCase().includes(searchWord.toLowerCase());
    });

    setwordEntered(searchWord);

    if (searchWord === "") {
        setSearchData([]);
    } else {
      setSearchData(newFilter)
    }
  };

  return (
    <>
      <div className={styles.search__container}>
        <form className={styles.banner__search}>
          <div className={styles.banner__searchContainer}>
          <Search className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search"
              value={wordEntered}
              onChange={handleFilter}
            />

          </div>
        </form>
      </div>
    </>
  );
}

export default SearchBar;
