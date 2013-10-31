# Bootstrap Combobox plugin

Supports combobox as a Twitter Bootstrap component, 
based on [dropdown](http://getbootstrap.com/components/#dropdowns).

## JavaScript usage

```javascript
$('.btn-group').btComboBox()
```

### Methods

#### .btComboBox('selectedOption')
Returns selected option (`[val, label, element]`) or `null` (if none).

```javascript
var o = $('.btn-group').btComboBox('selectedOption');
var val = o[0], label = o[1], elem = o[2];
```

#### .btComboBox('clear')
Removes all options and unselect value.

```javascript
$('.btn-group').btComboBox('clear')
```

#### .btComboBox({'action':"load", parameters})

Appends options, using given `parameters` properties.

* `pairs`: Array of option to be appended; Each array element 
should be either `[val,label]`, or anything else if next `extractor` 
property is provided.
* `extractor` (optional, required if elements of `pairs` array 
aren't `[val,label]`): Function `(element of pairs) => [value, label]`.

#### .btComboBox({'action':"reset", parameters})

Reset options, using same `parameters` as load method.
Keep value selection (if value is still available in new options).
