import React from 'react'
import { shallow, mount } from 'enzyme'
import assert from 'assert'
import { default as asyncLoader, createPromise } from './../'
import { setTimeout } from 'core-js/library/web/timers';

const jquery = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'
const App = asyncLoader([jquery])(() => <div>jquery</div>)
// const App = () => <div className='c'>jquery plugin</div>

describe('Async script', () => {
  it('can create a promise', async() => {
    const data = await createPromise(jquery)
    expect(data).toEqual(jquery)
  })

  it('can render a component', () => {
    const wrapper = shallow(<App />).dive()
    expect(wrapper.find('div')).toHaveLength(1)    
    expect(wrapper.find('div').text()).toEqual('jquery')
  })

})