import React from 'react'
import { render, Simulate } from 'react-testing-library'

import FilterInput from '../components/filterInput'

test('<FilterInput /> should produce a proper snapshot', async () => {
  const { container } = render(
    <FilterInput />
  )

  expect(container).toMatchSnapshot()
})

test('<FilterableInput /> should call onFilter prop method properly', async () => {
  const onFilter = jest.fn()
  const { container } = render(
    <FilterInput onFilter={onFilter} onClearFilter={() => {}} />
  )

  const filterRef = container.querySelector('input[type=text]')
  filterRef.value = 'a'
  Simulate.change(filterRef)

  expect(onFilter).toHaveBeenCalled()
})

test('<FilterableInput /> should call onClearFilter prop method properly', async () => {
  const onClearFilter = jest.fn()
  const { container } = render(
    <FilterInput onFilter={() => {}} onClearFilter={onClearFilter} />
  )

  const filterRef = container.querySelector('input[type=text]')
  filterRef.value = ''
  Simulate.change(filterRef)

  expect(onClearFilter).toHaveBeenCalled()
})
