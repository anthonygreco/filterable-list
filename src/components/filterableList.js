import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

import '../styles/filterableList.css'

import FilterInput from './filterInput'
import { uniqueArray } from './helper'

class FilterableList extends Component {
  state = {
    entries: []
  }

  componentDidMount = () => {
    const { entries } = this.props
    this.setState({ entries })
  }

  matchesFilter = query => uniqueArray(
    [].concat.apply([], this.props.filterProps.map(
      filterProp => this.props.entries.filter(
        entry => entry[filterProp].indexOf(query) > -1
      )
    ))
  )

  clearFilter = () => {
    this.setState({ entries: this.props.entries })
  }

  filter = query => {
    this.setState({ entries: this.matchesFilter(query) })
  }

  generateTableHeaders = () => this.props.columns.map(name => (
      <Table.HeaderCell key={name}>{name}</Table.HeaderCell>
    )
  )

  getInfo = info => JSON.stringify(info).replace(/"/g, '')

  generateTableRows = () => {
    const { entries } = this.state

    if (!entries.length) {
      return (
        <Table.Row>
          <Table.Cell colSpan={3} className='no-results'>No Results</Table.Cell>
        </Table.Row>
      )
    }

    return entries.map(entry => (
      <Table.Row key={entry.name}>
        <Table.Cell>{entry.name}</Table.Cell>
        <Table.Cell>{entry.type}</Table.Cell>
        <Table.Cell>{this.getInfo(entry.info)}</Table.Cell>
      </Table.Row>
    ))
  }

  render () {
    return (
      <div>
        <FilterInput onFilter={this.filter} onClearFilter={this.clearFilter} />
        <Table striped selectable>
          <Table.Header>
            <Table.Row>
              {this.generateTableHeaders()}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.generateTableRows()}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

FilterableList.propTypes = {
  columns: PropTypes.array.isRequired,
  entries: PropTypes.array.isRequired,
  filterProps: PropTypes.array.isRequired
}

FilterableList.defaultProps = {
  columns: [],
  entries: [],
  filterProps: []
}

export default FilterableList
