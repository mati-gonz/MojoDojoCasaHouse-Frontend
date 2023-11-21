const cinemaTableData = [
  {
    id: 'id',
    name: 'ID',
    selector: row => row.id,
    sortable: true
  },
  {
    name: 'NAME',
    selector: row => row.name,
    sortable: true
  },
  {
    name: 'LONGITUDE',
    selector: row => row.longitude
  },
  {
    name: 'LATITUDE',
    selector: row => row.latitude
  },
  {
    name: 'CREATED AT',
    selector: row => row.createdAt
  },
  {
    name: 'UPDATED AT',
    selector: row => row.updatedAt
  }
]

export default cinemaTableData
