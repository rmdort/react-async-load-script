import React from 'react'
import asyncScript from 'async-script'

/**
 * Creates a single promise
 * @params {string} url
 */
export function createPromise (url) {
  return new Promise((resolve, reject) => {
    asyncScript(document, url, err => (err ? reject(err) : resolve(url)))
  })
}

/**
 * Sequentially execute promise
 * @param {Array} scripts
 */
function loadScripts (scripts) {
  return scripts.reduce((cur, next) => {
    return cur.then(() => {
      return createPromise(next)
    })
  }, new Promise((resolve, reject) => resolve()))
}

/**
 * Higher order component to load array of script tags
 * @params {Array} scripts
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
        loadScripts(scripts)
          .then(() => {
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
        return (
          <WrappedComponent
            {...this.props}
            isScriptLoaded={this.state.isScriptLoaded}
            isScriptLoadSucceed={this.state.isScriptLoadSucceed}
          />
        )
      }
    }
  }
}
