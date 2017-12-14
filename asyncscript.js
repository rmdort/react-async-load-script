/**
 * Credits - https://github.com/unshiftio/one-time
 */
'use strict'

var one = require('one-time')

/**
 * Async load a script file.
 *
 * @param {Document} document Reference to the document were we create elements
 * @param {String} url URL we want to load.
 * @param {Function} fn Completion callback.
 * @api public
 */
module.exports = function scripts (document, url, fn) {
  fn = one(fn)

  var script = document.createElement('script')

  /**
   * Completely clean up the created script and all of it's created handlers.
   *
   * @api private
   */
  function unload () {
    // fn(new Error('The script has been removed.'));
    // if (!script) return;
    // if (script.parentNode) script.parentNode.removeChild(script);
    // script = script.onerror = script.onload = script.onreadystatechange = null;
  }

  //
  // Required for FireFox 3.6 / Opera async loading. Normally browsers would
  // load the script async without this flag because we're using createElement
  // but these browsers need explicit flags.
  //
  script.async = false

  //
  // onerror is not triggered by all browsers, but should give us a clean
  // indication of failures so it doesn't matter if you're browser supports it
  // or not, we still want to listen for it.
  //
  script.onerror = function onerror () {
    fn(new Error('Failed to load the script.'))
    unload()
  }

  //
  // All "latest" browser seem to support the onload event for detecting full
  // script loading. Internet Explorer 11 no longer needs to use the
  // onreadystatechange method for completion indication.
  //
  script.onload = function onload () {
    fn()
    unload()
  }

  //
  // Fall-back for older IE versions, they do not support the onload event on the
  // script tag and we need to check the script readyState to see if it's
  // successfully loaded.
  //
  script.onreadystatechange = function onreadystatechange () {
    if (this.readyState in { loaded: 1, complete: 1 }) {
      fn()
      unload()
    }
  }

  //
  // The src needs to be set after the element has been added to the document.
  // If I remember correctly it had to do something with an IE8 bug.
  //
  ;(document.head || document.body).appendChild(script)
  script.src = url

  return unload
}
