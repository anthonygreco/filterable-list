import React from 'react'
import { Container } from 'semantic-ui-react'

import '../styles/app.css'

import FilterableList from './filterableList'
import shapesData from '../data/shapesData'

const filterProps = ['name', 'type']
const columnNames = ['Name', 'Type', 'Info']

const App = () => (
  <div className='app'>
    <Container fluid>
      <FilterableList columns={columnNames} entries={shapesData} filterProps={filterProps} />
    </Container>
  </div>
)

export default App
