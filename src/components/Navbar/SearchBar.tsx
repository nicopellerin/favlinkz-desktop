import * as React from "react"
import { useState } from "react"
import styled from "styled-components"
import { FaSearch, FaTimesCircle } from "react-icons/fa"
import { useRecoilState } from "recoil"

import { searchTextState } from "../../state/searchbar"
import { motion } from "framer-motion"

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [searchText, setSearchText] = useRecoilState(searchTextState)

  return (
    <>
      <SearchBarWrapper>
        <SearchIcon>
          <SearchBarContainer>
            <motion.input
              type="text"
              value={searchText}
              placeholder="Search by title..."
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 100)}
              style={{ width: isFocused ? 275 : 180 }}
            />
          </SearchBarContainer>
          {searchText.length > 0 ? (
            <FaTimesWrapper
              onClick={(e) => {
                setSearchText("")
              }}
            />
          ) : (
            <FaSearchWrapper />
          )}
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
    background: ${(props) => props.theme.searchBarInput};
    color: ${(props) => props.theme.searchBarInputText};
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: none;
    font-size: 15px;
    font-family: inherit;
    padding: 10px 12px;
    width: 180px;
    outline: none;
    transition: all 300ms ease-in-out;

    &:placeholder {
      -webkit-user-select: none;
    }
    /* 
    &:focus {
      width: 275px;
      outline: none;
    } */
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
`

const FaTimesWrapper = styled(FaTimesCircle)`
  font-size: 2rem;
  transition: all 300ms ease;
  height: 33px;
  padding: 3px;
  position: absolute;
  right: 10px;
  z-index: 20;
`
