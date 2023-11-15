import MUIDataTable from 'mui-datatables'

const DataTable = () => {
  const columns = ['NAME', 'CITY', 'DIRECTION']
  const data = [
    ['Hoyts', 'Cobreloa', -63.28962785],
    ['Hoyts', 'Titirilquen', 26.87468]
  ]
  const options = { filterType: 'checkbox' }

  return (
    <MUIDataTable
      title={'Employee List'}
      data={data}
      columns={columns}
      options={options}
    />
  )
}

export default DataTable
