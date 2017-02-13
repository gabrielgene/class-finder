import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import filter from 'lodash/filter'
import omit from 'lodash/omit'
import uniq from 'lodash/uniq'
import { setFilteredTurmas, setFilters } from '../actions'


class Filters extends Component {

  handleChange = (key) => (event, index, value) => {
    const filters = {
      ...this.props.filters,
      [key]: value,
    }

    this.props.setFilters(filters)
    const filteredTurmas = filter(this.props.turmas, filters)
    this.props.setFilteredTurmas(filteredTurmas)
  }

  clearFilter = (key) => () => {
    const filters = omit(this.props.filters, key)
    this.props.setFilters(filters)
    const filteredTurmas = filter(this.props.turmas, filters)
    this.props.setFilteredTurmas(filteredTurmas)
  }

  clearFilters = () => {
    this.props.setFilters({})
    this.props.setFilteredTurmas(this.props.turmas)
  }

  render() {
    const {turmas, filteredTurmas, filters} = this.props
    const [codTurmas, disciplinas, dias] = filteredTurmas
      .reduce((arr, turma) => {
        const [codTurmas, disciplinas, dias] = arr
        codTurmas.push(turma.codTurma)
        disciplinas.push(turma.disciplina)
        dias.push(turma.dia)
        return arr
      }, [[], [], []])
      .map(uniq)

    return (
      <div className="searchDiv">

        <div className="itemWrapper">
          <SelectField
            fullWidth
            floatingLabelText="Código da Turma"
            value={filters.codTurma}
            onChange={this.handleChange('codTurma')}
            >
            {codTurmas.map(codTurma =>
              <MenuItem key={codTurma} value={codTurma} primaryText={codTurma} />
            )}
          </SelectField>
          <div className="close" hidden={!filters.codTurma}>
            <IconButton onTouchTap={this.clearFilter('codTurma')}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>

        <div className="itemWrapper">
          <SelectField
            fullWidth
            floatingLabelText="Nome da Matéria"
            value={filters.disciplina}
            onChange={this.handleChange('disciplina')}
            >
            {disciplinas.map(disciplina =>
              <MenuItem key={disciplina} value={disciplina} primaryText={disciplina} />
            )}
          </SelectField>
          <div className="close" hidden={!filters.disciplina}>
            <IconButton onTouchTap={this.clearFilter('disciplina')}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>

        <div className="itemWrapper">
          <SelectField
            fullWidth
            floatingLabelText="Horário"
            value={filters.dia}
            onChange={this.handleChange('dia')}
            >
            {dias.map(dia =>
              <MenuItem key={dia} value={dia} primaryText={dia} />
            )}
          </SelectField>
          <div className="close" hidden={!filters.dia}>
            <IconButton style={{color: '#FFC107'}} onTouchTap={this.clearFilter('dia')}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>

        <div className="itemWrapper">
          <div className="buttonWrapper">
            <RaisedButton className="button" label="Limpar Tudo" onTouchTap={this.clearFilters} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  turmas: state.turmas,
  filteredTurmas: state.filteredTurmas,
  filters: state.filters,
})



const mapDispatchToProps = { setFilteredTurmas, setFilters }

export default connect(mapStateToProps, mapDispatchToProps)(Filters)