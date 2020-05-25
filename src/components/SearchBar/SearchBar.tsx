import React, { useContext, useCallback } from "react"
import styled from "styled-components"
import { FaSearch } from "react-icons/fa"

// import { SearchContext } from "../../context/search-context"

const SearchBar = ({ props }: any) => {
  // const { searchCtx, setSearchCtx } = useContext(SearchContext)

  const filterSearch = useCallback()
  // (e) => {
  //   setSearchCtx(e.target.value)
  // },
  // [searchCtx]

  return (
    <>
      <SearchBarWrapper>
        <SearchIcon>
          <SearchBarContainer>
            <input
              type="text"
              // value={searchCtx}
              placeholder="Search by title..."
              onChange={filterSearch}
            />
          </SearchBarContainer>
          <FaSearchWrapper />
        </SearchIcon>
      </SearchBarWrapper>
    </>
  )
}

export default SearchBar

// Styles
const SearchBarWrapper = styled.div`
  width: 100%;
  display: flex;
  -webkit-app-region: no-drag;
`

const SearchBarContainer = styled.div`
  margin: 0 auto;
  justify-items: center;
  align-items: center;
  display: grid;

  input {
    background: #fff;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: none;
    font-size: 15px;
    font-family: inherit;
    padding: 10px 12px;
    width: 180px;
    transition: all 300ms ease-in-out;

    &:placeholder {
      -webkit-user-select: none;
    }

    &:focus {
      width: 275px;
      outline: none;
    }
  }
`

const SearchIcon = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  position: relative;
  margin-left: 0.5rem;
  transition: all 300ms ease;
  overflow: hidden;
  transform: translateX(1px);
`

const FaSearchWrapper = styled(FaSearch)`
  font-size: 2rem;
  transition: all 300ms ease;
  height: 33px;
  padding: 3px;
  position: absolute;
  right: 10px;

  /* ${SearchIcon}:hover & {
    color: #4b36dc;
  } */
`
