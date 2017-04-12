# imxQuery

A small helper module to provide convinience methods

## Who is this for?

If you one of those jQuery users who only use this framework for some convinience methods and totaly aware of the fact that there is no need to use jQuery only for creating selectors, than imxQuery might come in handy.

## Installing

Currently there is only one way to install the CSS3Slider, using NPM:
```
$ npm install imxquery
```
After this you can either simply require imxQuery:
```javascript
var imxQuery = require('imxquery');
```

or simply include it via script tag:
```javascript
<script type="text/javascript" src="node_modules/imxQuery/index.js"></script>
```

## Accessing imxQuery

imxQuery down to the base, is a simple VanilaJS module. You can access it through several public methds:

### offsetTop

offsetTop will return you the top offset of a given node relative to the body
```javascript
imxQuery.offsetTop(htmlNode);
```

### offsetLeft

offsetTop will return you the left offset of a given node relative to the body
```javascript
imxQuery.offsetLeft(htmlNode);
```

### scrollTo

scrollTo will scroll the window to a specific position.
```javascript
imxQuery.scrollTo(xPosition, yPosition, duration);
```

#### The params

* **xPosition** - target position on the x-axis
* **yPosition** - target position on the y-axis
* **duration** - amount of time it shall need, for the scroll to perform

#### Tip

In order to scroll to a specific node on the page, you can combine the offset methods with the scroll method:
```javascript
imxQuery.scrollTo(0, imxQuery.offsetTop(htmlNode), 100);
```

### scrollElementTo

The same as scrollTo, but scrolls inside an element.
```javascript
imxQuery.scrollElementTo(xPosition, yPosition, duration, targetNode);
```
* **targetNode** - the htmlNode that you want to scroll

### accessDataset

A handy small wrapper method to read out data attributes
```html
<article id="myTestArticle" data-info_latitude="54.756">
```
```javascript
imxQuery.accessDataset(document.getElementById('myTestArticle'), 'info_latitude');
```

### extendObject
Extend an object with another object, adding missing fields
```javascript
var baseObject = {
  title : 'title text',
  text : 'a lot of text'
};

var configObject = {
  lat : '54.765',
  lng : '7.897'
};

imxQuery.extendObject(baseObject, configObject);
```
This will result in:
```javascript
var baseObject = {
  title : 'title text',
  text : 'a lot of text',
  lat : '54.765',
  lng : '7.897'
};
```

### documentReady

Wait for the document to be loaded completly, to perform a callBack function.
```javascript
imxQuery.documentReady(function(){
  alert('document is loaded');
});
```