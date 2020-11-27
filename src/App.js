import * as React from 'react'


function App() {

  const [user,setUser] = React.useState(null)

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/v1/user`).then(async (response) => {
      const userObject = await response.json()
      setUser(userObject)
    })

  },[setUser])
  return (
    <div className="App">
      <header className="App-header">
        {user && <span id="myName">{user.name}</span>}
      </header>
    </div>
  );
}

export default App;
