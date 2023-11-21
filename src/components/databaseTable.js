import DataTable from 'react-data-table-component'

const DatabaseTable = ({ props }) => {
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#313b7e',
        color: '#ffffff'
      }
    }
  }

  return (
    <DataTable
    title={props.name}
    columns={props.columns}
    data={props.data}
    fixedHeader
    highlightOnHover
    responsive
    direction="auto"
    pagination
    defaultSortFieldId={props.defaultSort}
    progressPending={props.pending}
    customStyles={customStyles}
  />
  )
}

export default DatabaseTable
