# Bootstrap Combobox

Provides combobox as a Twitter Bootstrap component, based on [dropdown](http://getbootstrap.com/components/#dropdowns) (which is compatible down to IE7).

See [demo](http://rawgit.com/cchantep/bootstrap-combobox/master/demo.html).

## Get started

Files of this component can be download from the source repository: [js/](https://github.com/cchantep/bootstrap-combobox/blob/master/js/)

> It requires jQuery 1.10+ & Twitter Bootstrap 3+.

It's also available as a [NPM package](https://www.npmjs.com/package/bootstrap-combobox): `npm install bootstrap-combobox`

## Setup

Combobox plugin can be applied on `select` elements, to turn them into comboboxes.

```html
<!-- Dependencies -->
<script src="//url/to/jquery-1.10.2.min.js"></script>
<script src="//url/to/bootstrap.js"></script>
<script src="//url/to/bootstrap-combobox.min.js"></script>

<!-- UI dependencies -->
<link href="//url/to/bootstrap.min.css" rel="stylesheet" />

<!-- HTML to be rendered as a combobox -->
<select id="uniqueId" name="fieldName"
  class="optional overall classes"
  data-btn-class="option toggle classes">
  <!-- ... -->
</select>

<!-- Install combobox UI on the select -->
<script>$('select').btComboBox()</script>
```

## API reference

### selectedOption

`.btComboBox('selectedOption')`

Returns selected option (`[val, label, element]`) or `null` (if none).

```javascript
var o = $('.btn-group').btComboBox('selectedOption');
var val = o[0], label = o[1], elem = o[2];
```

### value

`.btComboBox('value')`

Returns value of selected option.

```javascript
var v = $('.btn-group').btComboBox('value')
```

### select

`.btComboBox({'action':"select",'value':"V"})`

Selects option matching given value (if one).

```javascript
$('.btn-group).btComboBox({'action':"select",'value':"value_to_select"})
```

### clear

`.btComboBox('clear')`

Removes all options and unselect value.

```javascript
$('.btn-group').btComboBox('clear')
```

### load

`.btComboBox({'action':"load", parameters})`

Appends options, using given `parameters` properties.

* `pairs`: Array of option to be appended; Each array element 
should be either `[val,label]`, or anything else if next `extractor` 
property is provided. If pair is `['_',null]` it will be a divider.
* `extractor` (optional, required if elements of `pairs` array 
aren't `[val,label]`): Function `(element of pairs) => [value, label]`.

```javascript
$('.btn-group').btComboBox({
  'action':"load", 
  'pairs': [["val1", "label1"], ["val2", "label2"]]
});

// OR
$('.btn-group').btComboBox({
  'action':"load", 
  'pairs': [{v:"val1", l:"label1"}, {v:"val2", l:"label2"}],
  'extractor': function(o) { return [o.v, o.l] }
})
```

### reset

`.btComboBox({'action':"reset", parameters})`

Reset options, using same `parameters` as load method.
Keep value selection (if value is still available in new options).

### values

`.btComboBox('values')`

Returns values from all available options.

```javascript
var vs = $('.btn-group').btComboBox('values')
```

### disable/enable

`.btComboBox('disable')` / `.btComboBox('enable')`

Disable/enable combobox.

```javascript
$('.btn-group').btComboBox('disable');
$('.btn-group').btComboBox('enable');
```

## Events

`change`

Fired when combobox value is changed.

```javascript
$("#combobox").on('change', function() { /* ... */ })
```
