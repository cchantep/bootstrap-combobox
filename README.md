# Bootstrap Combobox plugin

Supports combobox as a Twitter Bootstrap component, 
based on [dropdown](http://getbootstrap.com/components/#dropdowns).

## JavaScript usage

```javascript
$('.btn-group').btComboBox()
```

### Methods

#### selectedOption

`.btComboBox('selectedOption')`

Returns selected option (`[val, label, element]`) or `null` (if none).

```javascript
var o = $('.btn-group').btComboBox('selectedOption');
var val = o[0], label = o[1], elem = o[2];
```

#### clear

`.btComboBox('clear')`

Removes all options and unselect value.

```javascript
$('.btn-group').btComboBox('clear')
```

#### load

`.btComboBox({'action':"load", parameters})`

Appends options, using given `parameters` properties.

* `pairs`: Array of option to be appended; Each array element 
should be either `[val,label]`, or anything else if next `extractor` 
property is provided.
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

#### reset

`.btComboBox({'action':"reset", parameters})`

Reset options, using same `parameters` as load method.
Keep value selection (if value is still available in new options).