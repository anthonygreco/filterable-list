import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Input } from 'semantic-ui-react'

class FilterInput extends Component {
  filterRef = null

  state = {
    filter: '',
    filtering: false
  }

  setFilterRef = ref => {
    this.filterRef = ref
  }

  clearFilter = () => {
    this.filterRef.inputRef.value = ''
    this.setState({ filter: '' })
    this.props.onClearFilter()
  }

  filter = (synthEvent, { value }) => {
    synthEvent.preventDefault()

    const query = value.trim()
    if (query.length < 1) {
      this.clearFilter()
      return
    }

    this.setState({ filtering: true })

    this.props.onFilter(query)

    this.setState({
      filter: query,
      filtering: false
    })
  }

  filterIcon = () => {
    const { filter, filtering } = this.state
    let icon = <Icon name='search' />
    if (filter.length && !filtering) {
      icon = <Icon name='remove circle' link onClick={this.clearFilter} />
    }
    return icon
  }

  render () {
    const { filter, filtering } = this.state
    const loading = filter.length > 0 && filtering
    const icon = this.filterIcon()
    const label = { icon: 'asterisk' }

    return (
      <Input fluid ref={this.setFilterRef} loading={loading} icon={icon} label={label} labelPosition='left corner' placeholder='Filter...' onChange={this.filter} />
    )
  }
}

FilterInput.propTypes = {
  onFilter: PropTypes.func.isRequired,
  onClearFilter: PropTypes.func.isRequired
}

FilterInput.defaultProps = {
  onFilter: () => {},
  onClearFilter: () => {}
}

export default FilterInput
