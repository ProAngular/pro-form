<div align="center">
  <a href="https://www.ProAngular.com" target="_blank">
    <img 
      src="https://raw.githubusercontent.com/ProAngular/pro-form/refs/heads/main/public/images/pro-angular-logo.png" 
    />
  </a>
  <h1 align="center">
    @proangular/pro-form
  </h1>
  <p align="center">
    <a href="https://www.ProAngular.com" target="_blank">
      ProAngular
    </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="https://github.com/ProAngular/pro-form" target="_blank">
      GitHub Repo
    </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="https://www.npmjs.com/@proangular/pro-form" target="_blank">
      NPM Package
    </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="https://www.ProAngular.com/demos/pro-form" target="_blank">
      Demo Page
    </a>
  </p>
  <p align="center">
    An abstraction of Angular Material form controls that speeds up form 
    building with drop in, standalone inputs, unified labels, hints, and 
    errors, plus helpers like scroll to first error and focus on invalid. 
    Built for modern Angular and plugs straight into Reactive Forms to cut 
    boilerplate.
  </p>
</div>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

<p align="center">
  <a href="https://www.npmjs.com/@proangular/pro-form" target="_blank">
    <img src="https://badge.fury.io/js/@proangular%2Fpro-form.svg" >
  </a>
  <a href="https://bundlephobia.com/result?p=ProAngular/pro-form" target="_blank">
    <img src="https://img.shields.io/bundlephobia/minzip/@proangular/pro-form.svg" >
  </a>
  <a href="/LICENSE" target="_blank">
    <img src="https://img.shields.io/npm/l/express.svg?maxAge=2592000" >
  </a>
</p>

<!--
<p align="center">
  <a href="https://github.com/ProAngular/pro-form/actions/workflows/on-merge-main-deploy-gpr.yml" target="_blank">
    <img src="https://github.com/ProAngular/pro-form/actions/workflows/on-merge-main-deploy-gpr.yml/badge.svg" >
  </a>
  <a href="https://github.com/ProAngular/pro-form/actions/workflows/on-merge-main-deploy-npmjs.yml" target="_blank">
    <img src="https://github.com/ProAngular/pro-form/actions/workflows/on-merge-main-deploy-npmjs.yml/badge.svg" >
  </a>
</p>
-->

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

<p align="center">
  <code>ng add @proangular/pro-form</code>
</p>
<p align="center">
  <img 
    src="https://raw.githubusercontent.com/ProAngular/pro-form/refs/heads/main/.github/images/screenshots/screenshot.png"
  />
</p>
<p align="center">
  <a href="https://www.ProAngular.com/demos/pro-form" target="_blank">Click here to preview it live!</a>
</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## 📇 Index <a name="index"></a>

- [📄 Description](#description)
- [📦 Installation](#installation)
  - [📋 Prerequisites](#prerequisites)
  - [📥 Install Pro Form Components](#install-pro-form-components)
- [💻 Usage](#usage)
- [🔄 Compatibility](#compatibility)
- [🔨 Development](#development)
- [⚖️ Licensing](#licensing)
- [🏁 Wrapping Up](#wrapping-up)

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## 📄 Description <a name="description"></a>

This project provides a collection of custom, reactive form components built
upon Angular Material. Designed for seamless integration into any Angular
application, these components help standardize the look and feel of forms across
your project(s). They offer features such as automatic scrolling to errors,
highlighting invalid fields on touch or submit, focusing on problematic inputs
to enhance usability, etc. By promoting the consistent use of hints, labels, and
error messages, these components improve not only developer but user experience
alike.

Also included is an example form to demonstrate the usage of each component.
This form is built using the Angular Reactive Forms approach and includes custom
validators, error messages, hints, labels, and more. The example form is
designed to be a starting point for your own forms, providing a solid foundation
to build upon. It takes a mobile-first approach, ensuring that the form is
responsive and accessible across all devices with minimal effort using
breakpoints.

The components included in this project are:

- **InputComponent**: A generic input field that can be used for text, email,
  password, etc.
- **InputCheckboxComponent**: A checkbox input field.
- **InputChipsComponent**: A chips list input field.
- **InputChipComponent**: A chip element for the chips list input field.
- **InputDatepickerComponent**: A datepicker input field.
- **InputDropdownComponent**: A dropdown list input field.
- **InputDropdownOptionComponent**: An option element for the dropdown list
  input field.
- **InputDropdownOptionGroupComponent**: An option group element for the
  dropdown list input field.
- **InputRadioComponent**: A radio input options field.
- **InputRadioOptionComponent**: An option element for the radio input field.
- **InputTextareaComponent**: A textarea input field.
- **InputTimepickerComponent**: A timepicker input field.
- **InputToggleComponent**: A toggle input field.

Each component is designed to be easily customized and extended to meet your
specific needs. They are built using Angular Material and Angular CDK, ensuring
that they are accessible, responsive, and performant.

<p align="right">[ <a href="#index">🔍 Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## 📦 Installation <a name="installation"></a>

Using Node Package Manager ([NPM][url-node-js]) in a new terminal window run the
following commands to install the required dependencies.

### 📋 Prerequisites <a name="prerequisites"></a>

**Angular Material**

More information on theming Angular Material:
https://material.angular.io/guide/theming

```bash
ng add @angular/material
```

### 📥 Install Pro Form Components <a name="install-pro-form-components"></a>

```bash
ng add @proangular/pro-form@latest
```

or

```bash
npm install @proangular/pro-form --save
```

<p align="right">[ <a href="#index">🔍 Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## 💻 Usage <a name="usage"></a>

Import one or all of the following custom form components to use in your Angular
application where used:

```diff
+ import {
+   InputComponent,
+   InputCheckboxComponent,
+   InputChipComponent,
+   InputChipsComponent,
+   InputDatepickerComponent,
+   InputDropdownComponent,
+   InputDropdownOptionComponent,
+   InputDropdownOptionGroupComponent,
+   InputRadioComponent,
+   InputRadioOptionComponent,
+   InputTextareaComponent,
+   InputTimepickerComponent,
+   InputToggleComponent,
+ } from '@proangular/pro-form';

// Import to module
@NgModule({
  ...
  imports: [
+   InputComponent,
+   InputCheckboxComponent,
+   InputChipComponent,
+   InputChipsComponent,
+   InputDatepickerComponent,
+   InputDropdownComponent,
+   InputDropdownOptionComponent,
+   InputDropdownOptionGroupComponent,
+   InputRadioComponent,
+   InputRadioOptionComponent,
+   InputTextareaComponent,
+   InputTimepickerComponent,
+   InputToggleComponent,
    ...
  ],
})

...

// Or import to a standalone component
@Component({
  ...
  imports: [
+   InputComponent,
+   InputCheckboxComponent,
+   InputChipComponent,
+   InputChipsComponent,
+   InputDatepickerComponent,
+   InputDropdownComponent,
+   InputDropdownOptionComponent,
+   InputDropdownOptionGroupComponent,
+   InputRadioComponent,
+   InputRadioOptionComponent,
+   InputTextareaComponent,
+   InputTimepickerComponent,
+   InputToggleComponent,
    ...
  ],
})

...

// Then use in template, simplified example form below:
+ <form [formGroup]="formGroup">
+   <pro-input [formControl]="formGroup.controls.input" ... />
+   <pro-input-checkbox [formControl]="formGroup.controls.checkbox" ... />
+   <pro-input-chips [formControl]="formGroup.controls.chips" ... />
+   <pro-input-datepicker [formControl]="formGroup.controls.datepicker" ... />
+   <pro-input-dropdown [formControl]="formGroup.controls.dropdown" ... />
+   <pro-input-radio [formControl]="formGroup.controls.radio" ... />
+   <pro-input-textarea [formControl]="formGroup.controls.textarea" ... />
+   <pro-input-timepicker [formControl]="formGroup.controls.timepicker" ... />
+   <pro-input-toggle [formControl]="formGroup.controls.toggle" ... />
+ </form>
```

> ![Info][img-info] See an the example form code [here][url-example-form-code],
> or a live demo [here][url-demo].

<p align="right">[ <a href="#index">🔍 Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## 🔄 Compatibility <a name="compatibility"></a>

| Angular version | @proangular/pro-form | Install                         |
| --------------- | -------------------- | ------------------------------- |
| v20             | v20.x.x              | ng add @proangular/pro-form@^20 |
| v19             | v19.x.x              | ng add @proangular/pro-form@^19 |
| v18             | ------               | Untested                        |
| v17             | ------               | Untested                        |

<p align="right">[ <a href="#index">🔍 Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## 🔨 Development <a name="development"></a>

Please submit all issues, and feature requests here:
[https://github.com/ProAngular/pro-form/issues][url-new-issue]

Contribution:

1. Clone the repo and create a new branch:

- `git clone https://github.com/ProAngular/pro-form.git`
- `git checkout -b username/feature-or-bug-description`

2. Bump up the version of package in `package.json` and `package-lock.json`,
   commit all changes, push.

- `git add -A`
- `git commit -m "My commit message"`
- `git push origin username/feature-or-bug-description`

3. Submit code in published PR for review and approval. Add a good description
   and link any possible user stories or bugs.

- [Create a new pull request](https://github.com/ProAngular/pro-form/compare).

4. Allow CI actions to completely run and verify files.
5. Add/ping reviewers and await approval.

Thank you for any and all contributions!

<p align="right">[ <a href="#index">🔍 Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## ⚖️ Licensing <a name="licensing"></a>

This project is licensed under the **MIT** License. See the
[LICENSE](LICENSE.md) file for the pertaining license text.

`SPDX-License-Identifier: MIT`

<p align="right">[ <a href="#index">🔍 Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## 🏁 Wrapping Up <a name="wrapping-up"></a>

Thank you to the entire Angular team and community for such a great framework to
build upon. If you have any questions, please let me know by opening an issue
[here][url-new-issue].

| Type                                                                                                                                            | Info                                                           |
| :---------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| <img width="48" src="https://raw.githubusercontent.com/ProAngular/pro-form/refs/heads/main/.github/images/ng-icons/email.svg" />                | webmaster@codytolene.com                                       |
| <img width="48" src="https://raw.githubusercontent.com/ProAngular/pro-form/refs/heads/main/.github/images/simple-icons/github.svg" />           | https://github.com/sponsors/CodyTolene                         |
| <img width="48" src="https://raw.githubusercontent.com/ProAngular/pro-form/refs/heads/main/.github/images/simple-icons/buymeacoffee.svg" />     | https://www.buymeacoffee.com/codytolene                        |
| <img width="48" src="https://raw.githubusercontent.com/ProAngular/pro-form/refs/heads/main/.github/images/simple-icons/bitcoin-btc-logo.svg" /> | bc1qfx3lvspkj0q077u3gnrnxqkqwyvcku2nml86wmudy7yf2u8edmqq0a5vnt |

Fin. Happy programming friend!

Cody Tolene

<!-- LINKS -->

[img-info]:
  https://raw.githubusercontent.com/ProAngular/pro-form/refs/heads/main/.github/images/ng-icons/info.svg
[url-demo]: https://www.ProAngular.com/demos/pro-form
[url-example-form-code]:
  https://github.com/ProAngular/pro-form/blob/main/src/app/form/form.component.html
[url-new-issue]: https://github.com/ProAngular/pro-form/issues
[url-node-js]: https://nodejs.org/
