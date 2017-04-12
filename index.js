(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
    
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but only CommonJS-like enviroments that support module.exports, like Node.    
    module.exports = factory;
    
  } else {
    // Browser globals (root is window)
    root.imxQuery = factory;
  }
})(this, (function(){
  
  /**
   * get the total top offset of an object to the window object, not only to the next positioned object
   * @param {object} targetNode
   * @returns {Number}
   */
  var offsetTop = function(targetNode){
    var stopElement = document.querySelector('body');
    var offsetTopValue = targetNode.getBoundingClientRect().top - stopElement.getBoundingClientRect().top;
    
    return offsetTopValue;
  };
  
  /**
   * get the total left offset of an object to the window object, not only to the next positioned object
   * @param {object} targetNode
   * @returns {Number}
   */
  var offsetLeft = function(targetNode){
    var stopElement = document.querySelector('body');
    var offsetLeftValue = targetNode.getBoundingClientRect().left - stopElement.getBoundingClientRect().left;
    
    return offsetLeftValue;
  }; 
  
  
  /**
   * animated scrolling to a specific position
   * @param {int} positionX
   * @param {int} positionY
   * @param {int} duration
   * @returns null
   */
  var scrollTo = function(positionX, positionY, duration){
    var _getCurrentScrollPositions = function(){
      return {
        x : window.pageXOffset,
        y : window.pageYOffset
      };
    };
    
    var _isTargetPositionReached = function(){
      var currentScrollPosition = _getCurrentScrollPositions();
      var flags = {
        x : false,
        y : false
      };
      
      if(scrollSteps.x < 0){
        if(currentScrollPosition.x + scrollSteps.x <= positionX){
          flags.x = true;
        };
      }else{
        if(currentScrollPosition.x + scrollSteps.x >= positionX){
          flags.x = true;
        };
      };
      
      if(scrollSteps.y < 0){
        if(currentScrollPosition.y + scrollSteps.y <= positionY){
          flags.y = true;
        };
      }else{
        if(currentScrollPosition.y + scrollSteps.y >= positionY){
          flags.y = true;
        };
      };
      
      if(flags.x && flags.y){
        return true;
      }else{
        return false;
      };
    };
    
    var intervalGap = 15;
    var currentScrollPosition = _getCurrentScrollPositions();
    
    var scrollSteps = {
      x : (positionX - currentScrollPosition.x) / (duration / intervalGap),
      y : (positionY - currentScrollPosition.y) / (duration / intervalGap)
    };
    
    var scrollInterval = setInterval(function(){

      if(_isTargetPositionReached()){
        clearInterval(scrollInterval);
        window.scrollTo(positionX, positionY);
      }else{
        window.scrollBy(scrollSteps.x, scrollSteps.y);
      }
    }, intervalGap);
  };
  
  /**
   * animated scrolling inside an element
   * @param {int} positionX
   * @param {int} positionY
   * @param {int} duration
   * @param {htmlNode} target
   * @returns null
   */
  var scrollElementTo = function(positionX, positionY, duration, target){
    var _getCurrentScrollPositions = function(){
      return {
        x : target.scrollLeft,
        y : target.scrollTop
      };
    };
    
    var _isTargetPositionReached = function(){
      var currentScrollPosition = _getCurrentScrollPositions();
      var flags = {
        x : false,
        y : false
      };
      
      if(scrollSteps.x < 0){
        if(currentScrollPosition.x + scrollSteps.x <= positionX){
          flags.x = true;
        };
      }else{
        if(currentScrollPosition.x + scrollSteps.x >= positionX){
          flags.x = true;
        };
      };
      
      if(scrollSteps.y < 0){
        if(currentScrollPosition.y + scrollSteps.y <= positionY){
          flags.y = true;
        };
      }else{
        if(currentScrollPosition.y + scrollSteps.y >= positionY){
          flags.y = true;
        };
      };
      
      if(flags.x && flags.y){
        return true;
      }else{
        return false;
      };
    };
    
    var intervalGap = 15;
    var currentScrollPosition = _getCurrentScrollPositions();
    
    var scrollSteps = {
      x : (positionX - currentScrollPosition.x) / (duration / intervalGap),
      y : (positionY - currentScrollPosition.y) / (duration / intervalGap)
    };
    
    var scrollInterval = setInterval(function(){

      if(_isTargetPositionReached()){
        clearInterval(scrollInterval);
        
        target.scrollLeft = positionX;
        target.scrollTop += positionY;
      }else{
        target.scrollLeft += scrollSteps.x;
        target.scrollTop += scrollSteps.y;
      }
    }, intervalGap);
  };
  
  /**
   * wrapper to access html5 data set (use this for ie10 compatibility)
   * @param {htlmnode} object
   * @param {string} value
   * @returns {mixed}
   */
  var accessDataset = function(object, value){
    if(object.dataset) {
      return object.dataset[value];
    }else{
      return object.getAttribute('data-' + value);
    };
  };
  
  /**
   * extend an object with another object, adding missing fields, overwriting existing fields
   * @param {object} objectForExtension
   * @param {object} extensionObject
   * @returns {object}
   */
  var extendObject = function(objectForExtension, extensionObject){
    for(var property in extensionObject){
      if(!objectForExtension.hasOwnProperty(property)){
        objectForExtension[property] = extensionObject[property];
      };
    };
    return objectForExtension;
  };
  
  var documentReady = function(callback){
    
    var loadComplete = function(){
      document.removeEventListener('DOMContentLoaded', loadComplete);
      window.removeEventListener('load', loadComplete);
      
      setTimeout(callback);
    };
  
    if(document.readyState === 'complete'){
      setTimeout(callback);
    }else{
      document.addEventListener('DOMContentLoaded', loadComplete);
      window.addEventListener('load', loadComplete);
    }
  };
  
  return {
    offsetTop : offsetTop,
    offsetLeft : offsetLeft,
    scrollTo : scrollTo,
    scrollElementTo : scrollElementTo,
    accessDataset : accessDataset,
    extendObject : extendObject,
    documentReady : documentReady
  };
})();
);