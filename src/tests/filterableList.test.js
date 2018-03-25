import React from 'react'
import { render, Simulate } from 'react-testing-library'

import FilterableList from '../components/filterableList'
import shapesData from '../data/shapesData'

const filterProps = ['name', 'type']

const FILTERED_TEST_VALUE = 'triangle'
const FILTERED_TEST_LENGTH = 8
const UNFILTERED_TEST_LENGTH = 26
const TABLE_ROWS_SELECTOR = 'table tbody tr'

test('<FilterableList /> should produce a proper snapshot', async () => {
  const { container } = render(
    <FilterableList entries={shapesData} filterProps={filterProps} />
  )

  expect(container).toMatchSnapshot()
})

test('<FilterableList /> should filter items successfully', async () => {
  const { container } = render(
    <FilterableList entries={shapesData} filterProps={filterProps} />
  )

  const filterRef = container.querySelector('input[type=text]')
  filterRef.value = FILTERED_TEST_VALUE
  Simulate.change(filterRef)

  const filteredRows = container.querySelectorAll(TABLE_ROWS_SELECTOR)

  expect(filteredRows.length).toBe(FILTERED_TEST_LENGTH)
})

test('<FilterableList /> should be cleared when clicking the X in the far right of the input', async () => {
  const { container } = render(
    <FilterableList entries={shapesData} filterProps={filterProps} />
  )

  const filterRef = container.querySelector('input[type=text]')
  filterRef.value = FILTERED_TEST_VALUE
  Simulate.change(filterRef)

  const clearFilterRef = container.querySelector('.icon.remove.circle')
  Simulate.click(clearFilterRef)

  const filteredRows = container.querySelectorAll(TABLE_ROWS_SELECTOR)

  expect(filteredRows.length).toBe(UNFILTERED_TEST_LENGTH)
})

test('<FilterableList /> should be cleared when pressing backspace within the input', async () => {
  const { container } = render(
    <FilterableList entries={shapesData} filterProps={filterProps} />
  )

  const filterRef = container.querySelector('input[type=text]')
  filterRef.value = 'a'
  Simulate.change(filterRef)

  // Simulate.keyDown(filterRef, { key: 'Backspace', keyCode: 8, which: 8 })
  filterRef.value = ''
  Simulate.change(filterRef)
  const filteredRows = container.querySelectorAll(TABLE_ROWS_SELECTOR)

  expect(filteredRows.length).toBe(UNFILTERED_TEST_LENGTH)
})
