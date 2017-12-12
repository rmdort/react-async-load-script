# React async script loader

A higher order React component to lazy load external javascript files.

Note: Requires Promise polyfill

## Installation

````
yarn add react-async-load-script
````

## Usage

````
import scriptLoader from 'react-async-load-script'

scriptLoader([...scripts])(YourComponent)
````

## Example

````
class D3Chart extends React.Component {
  componentDidUpdate (prevProps) {
    if (
      prevProps.isScriptLoadSucceed !== this.props.isScriptLoadSucceed && 
      this.props.isScriptLoadSucceed
    ) {
      // Initialize d3 chart
      console.log(d3)
    }
  }
  render () {
    return <div className='chart' />
  }
}

export default scriptLoader([
  'https://cdnjs.cloudflare.com/ajax/libs/d3/4.12.0/d3.min.js
])(D3Chart)
````

## Properties

Your component will receive the following props

|Name|Type|Description|
|----|----|-----------|
|isScriptLoaded|boolean|Indicates if scripts have been loaded|
|isScriptLoadSuccess|boolean|Indicates if all scripts are loaded without error|

## Test

````
yarn test
````

## License

MIT