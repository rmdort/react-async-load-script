import React from 'react'
import ReactDOM from 'react-dom'
import scriptLoader from 'react-async-load-script'


class App extends React.Component {
  componentDidUpdate (prevProps) {
    if (
      prevProps.isScriptLoadSuccess !== this.props.isScriptLoadSucceed && 
      this.props.isScriptLoadSucceed
    ) {
      console.log(jQuery)
    }
  }
  render () {
    return <div>Hello from app</div>
  }
}

const AppWithScripts = scriptLoader([
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'
])(App)

ReactDOM.render(
  <AppWithScripts />
  , document.getElementById('root')
)
