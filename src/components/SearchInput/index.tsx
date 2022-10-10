import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoCloseSharp } from 'react-icons/io5'
import styled from 'styled-components'

const StyledSearchInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 25px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.BACKGROUND_TERTIARY};
`

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  padding: 4px 6px;
`

const StyledInput = styled.input`
  width: 110px;
  font-size: 14px;
  font-weight: 500;
  background: none;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.TEXT_NORMAL};
  transition: width 0.3s;

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }

  &:focus {
    width: 208px;
  }
`

const StyledSearchButton = styled.button`
  display: grid;
  border: none;
  outline: none;
  background: none;
  color: ${({ theme }) => theme.INTERACTIVE_NORMAL};
  padding: 0;
  min-height: unset;

  &:hover {
    box-shadow: none;
  }
`

export const SearchInput: React.FC = () => {
  const [value, setValue] = useState<string>('')
  return (
    <StyledSearchInputWrapper>
      <StyledForm>
        <StyledInput
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e?.target?.value)
          }
        />
        <StyledSearchButton>
          <AiOutlineSearch />
          <IoCloseSharp />
        </StyledSearchButton>
      </StyledForm>
    </StyledSearchInputWrapper>
  )
}
