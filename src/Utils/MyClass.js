export const handleDrop_down = (e) => {
  if (e === 'add') {
    this.setState({
      add: !this.state.add,
    })
  } else if (e === 'edit') {
    this.setState({
      edit: !this.state.edit,
    })
  } else if (e === 'delO') {
    this.setState({
      delO: !this.state.delO,
    })
  }
  else if (e === 'delAll') {
    this.setState({
      delAll: !this.state.delAll,
    })
  }else if (e === 'previview') {
    this.setState({
      previview: !this.state.previview,
    })
  }else if (e === 'photo') {
    this.setState({
      photo: !this.state.photo,
    })
  }
}
export const handleGetPage = (nowpage, maxpage) => {
  let pagearray = [];
  for (let i = (Number(nowpage) - 2); i <= (Number(nowpage) + 2); i++) {
    if (i > 0 && i <= Number(maxpage)) {
      pagearray.push(i)
    }
  }
  return pagearray;
}