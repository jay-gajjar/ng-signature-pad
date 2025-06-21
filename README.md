
# ng-signature-pad

Generates digital signature


## Installation

```bash
  npm install ng-signature-pad
```


## Usage

```ts
import { NgSignaturePadModule } from 'ng-signature-pad';

@Component({
  imports: [NgSignaturePadModule],
  ...,
})
export class AppComponent {}

```

```html
// add as component

<ng-signature-pad></ng-signature-pad>

// add as directive

<div ngSignaturePad></div>

```

&nbsp;
## Configuration Options

**`Configs`**

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `lineSize` | number | To increase/descrease line size drawn. Default is 3. |


## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://choosealicense.com/licenses/mit/) 
