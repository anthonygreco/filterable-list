import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-testing-library'

import { uniqueArray } from '../components/helper'

const duplicativeItems = [0, 1, 2, 3, 0, 1]

test('uniqueArray should return a unique array', async () => {
  const unique = uniqueArray(duplicativeItems)

  expect(unique).toEqual([0, 1, 2, 3])
})
