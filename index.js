import React from 'react'
import asyncScript from './asyncscript.js'

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
 * @params {Array} scripts
 */
export function loadScripts (scripts) {
  return Promise.all(scripts.map(createPromise))
}

/**
 * Higher order component to load array of script tags
 * @params {Array} scripts
 */
export default function (scripts) {
  return function (WrappedComponent) {
    class LoadScript extends React.Component {
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
        const { forwardedRef, ...rest } = this.props
        return (
          <WrappedComponent            
            ref={forwardedRef}
            isScriptLoaded={this.state.isScriptLoaded}
            isScriptLoadSucceed={this.state.isScriptLoadSucceed}
            {...rest}
          />
        )
      }
    }
    return React.forwardRef((props, ref) => {
      return <LoadScript {...props} forwardedRef={ref} />
    })
  }
}
