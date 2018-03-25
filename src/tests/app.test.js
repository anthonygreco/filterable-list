import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-testing-library'

import App from '../components/app'
import { Container } from 'semantic-ui-react'
import FilterableList from '../components/filterableList'
import shapesData from '../data/shapesData'

const filterProps = ['name', 'type']

test('<App /> renders without crashing', async () => {
  const div = document.createElement('div')

  ReactDOM.render(<App />, div)
})

test('<App /> should produce a proper snapshot', async () => {
  const { container } = render(
    <App>
      <Container fluid>
        <FilterableList entries={shapesData} filterProps={filterProps} />
      </Container>
    </App>
  )

  expect(container).toMatchSnapshot()
})
