import React from 'react'
import { shallow, mount } from 'enzyme'
import assert from 'assert'
import * as asyncLoader from './../'
import { setTimeout } from 'core-js/library/web/timers';

const jquery = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'
class SampleApp extends React.Component {
  render () {
    return <div>jquery</div>
  }
}
const fetchPromise = Promise.resolve()
asyncLoader.loadScripts = () => {
  console.log('crap')
}
const App = asyncLoader.default([jquery])(SampleApp)

describe('Async script', () => {
  beforeEach(() => {
    
  })
  it('can create a promise', async() => {
    const data = await asyncLoader.createPromise(jquery)
    expect(data).toEqual(jquery)
  })

  it('can render a component', () => {
    const wrapper = shallow(<App />).dive()
    expect(wrapper.find('div')).toHaveLength(1)    
    expect(wrapper.find('div').text()).toEqual('jquery')
  })
  
  it('has initial state and props', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.prop('isScriptLoadSucceed')).toEqual(false)
    expect(wrapper.prop('isScriptLoaded')).toEqual(false)
  })

  it('props are passed down', () => {
    const wrapper = shallow(<App type='prop' />)
  })

})