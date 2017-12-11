import React from 'react'
import asyncScript from 'async-script'

/**
 * Creates a single promise
 * @params url: string
 */
export function createPromise (url) {
  return new Promise((resolve, reject) => {
    asyncScript(document, url, err => (err ? reject(err) : resolve(url)))
  })
}

/**
 * Higher order component to load array of script tags
 * @params scripts: Array
 */
export default function (scripts) {
  return function (WrappedComponent) {
    return class LoadScript extends React.Component {
      constructor (props) {
        super(props)
        this.state = {
          isScriptLoadSucceed: false,
          isScriptLoaded: false
        }
      }
      static displayName = 'AsyncLoadScripts'
      componentDidMount () {
        var promises = []
        for (let i = 0; i < scripts.length; i++) {
          promises.push(createPromise(scripts[i]))
        }
        Promise.all(promises)
          .then(url => {
            this.setState({
              isScriptLoaded: true,
              isScriptLoadSucceed: true
            })
          })
          .catch(err => {
            this.setState({
              isScriptLoaded: true,
              isScriptLoadSucceed: false
            })
          })
      }
      render () {
        return <WrappedComponent {...this.state} />
      }
    }
  }
}
