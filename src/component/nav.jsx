const style = {
  navStyle: {
    padding: '20px',
    boxShadow: '.5px .5px 10px black',
    borderBottom: '1px solid black',
    fontFamily: 'Ubuntu'
  }
}


const Nav = () => {
  return (
    <div className="nav" style={style.navStyle}>
        <h1>Ceshephard</h1>
    </div>
  )
}

export default Nav;
