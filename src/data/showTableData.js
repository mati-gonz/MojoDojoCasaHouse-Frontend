const showTableData = [
  {
    id: 'id_cinema',
    name: 'ID CINEMA',
    selector: row => row.id_cinema,
    sortable: true
  },
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true
  },
  {
    name: 'LINK TO PICTURE',
    selector: row => row.link_to_picture
  },
  {
    name: 'LINK TO SHOW',
    selector: row => row.link_to_show
  },
  {
    name: 'SCHEDULE',
    selector: row => row.schedule,
    sortable: true
  },
  {
    name: 'TITLE',
    selector: row => row.title,
    sortable: true
  },
  {
    name: 'UPDATED AT',
    selector: row => row.updatedAt
  },
  {
    name: 'CREATED AT',
    selector: row => row.createdAt
  }
]

export default showTableData
