<p align="center">
  <a href="https://www.ProAngular.com" target="_blank">
    <img src="public/images/pro-angular-logo.png" />
  </a>
  <h1 align="center">
    <a href="https://www.ProAngular.com" target="_blank">Pro Angular</a>: Form Components
  </h1>
</p>

[![npm](https://badgen.net/badge/icon/npm?icon=npm&label)](https://www.npmjs.com/@proangular/pro-form)
[![GitHub](https://badgen.net/badge/icon/GitHub?icon=github&label)](https://github.com/ProAngular/pro-form)
[![TypeScript](https://badgen.net/badge/icon/TypeScript?icon=typescript&label)](https://github.com/ProAngular/pro-form/search?l=typescript)
[![npm Version](https://badge.fury.io/js/@proangular%2Fngx-scroll-top.svg)](https://www.npmjs.com/@proangular/pro-form)
[![Node Version](https://badgen.net/npm/node/@proangular/pro-form)](https://www.npmjs.com/@proangular/pro-form)
[![Package Downloads](https://badgen.net/npm/dw/@proangular/pro-form)](https://www.npmjs.com/@proangular/pro-form)
[![Size](https://img.shields.io/bundlephobia/minzip/@proangular/pro-form.svg)](https://bundlephobia.com/result?p=ProAngular/pro-form)
[![Demo Status](https://badgen.net/badge/Demo/Online/green)](https://www.ProAngular.com/demos/pro-form)
[![Website Status](https://img.shields.io/website?down_color=lightgrey&down_message=Offline&label=Website&up_color=green&up_message=Online&url=https%3A%2F%2Fwww.proangular.com)](https://www.proangular.com)
[![Gitter Chat](https://badges.gitter.im/ProAngular/lobby.svg)](https://gitter.im/ProAngular/community)
[![Discord Chat](https://img.shields.io/discord/1003103094588055552?label=Discord)](https://discord.com/channels/1003103094588055552)
[![Sponsors](https://img.shields.io/github/sponsors/proangular?label=Sponsors)](https://github.com/sponsors/ProAngular)
[![License](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)
[![GitHub Package Status](https://github.com/ProAngular/pro-form/actions/workflows/on-merge-main-deploy-gpr.yml/badge.svg)](https://github.com/ProAngular/pro-form/actions/workflows/on-merge-main-deploy-gpr.yml)
[![npmjs Package Status](https://github.com/ProAngular/pro-form/actions/workflows/on-merge-main-deploy-npmjs.yml/badge.svg)](https://github.com/ProAngular/pro-form/actions/workflows/on-merge-main-deploy-npmjs.yml)

## Index <a name="index"></a>

- [Preview](#preview)
- [Description](#description)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Install Pro Form Components](#install-pro-form-components)
- [Usage](#usage)
- [Compatibility](#compatibility)
- [Development](#development)
- [Licensing](#licensing)
- [Wrapping Up](#wrapping-up)

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Preview <a name="preview"></a>

Preview the live demo below to see the Pro Form Components in action:

https://www.ProAngular.com/demos/pro-form

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Description <a name="description"></a>

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
- **InputDatepickerComponent**: A datepicker input field.
- **InputDropdownComponent**: A dropdown input field.
- **InputRadioModule**: A radio input options field.
- **InputTextareaComponent**: A textarea input field.
- **InputTimepickerComponent**: A timepicker input field.
- **InputToggleComponent**: A toggle input field.
- More to come...

Each component is designed to be easily customized and extended to meet your
specific needs. They are built using Angular Material and Angular CDK, ensuring
that they are accessible, responsive, and performant.

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Installation <a name="installation"></a>

Using Node Package Manager ([NPM][url-node-js]) in a new terminal window run the
following commands to install the required dependencies.

### Prerequisites <a name="prerequisites"></a>

**Angular Material**

More information on theming Angular Material:
https://material.angular.io/guide/theming

```bash
ng add @angular/material
```

### Install Pro Form Components <a name="install-pro-form-components"></a>

```bash
ng add @proangular/pro-form@latest
```

or

```bash
npm install @proangular/pro-form --save
```

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Usage <a name="usage"></a>

Import one or all of the following custom form components to use in your Angular
application where used:

```diff
+ import {
+   InputComponent,
+   InputCheckboxComponent,
+   InputDatepickerComponent,
+   InputDropdownComponent,
+   InputRadioModule,
+   InputTextareaComponent,
+   InputTimepickerComponent,
+   InputToggleComponent,
+ } from '@proangular/pro-form';

// Import to module
@NgModule({
  ...
  imports: [
+   InputComponent,
    ...
  ],
})

...

// or component
@Component({
  ...
  imports: [
+   InputComponent,
    ...
  ],
})
```

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Compatibility <a name="usage"></a>

| Angular version | @proangular/pro-form | Status     |
| --------------- | -------------------- | ---------- |
| v19             | v19.0.0              | Compatible |
| v18             | ------               | Untested   |
| v17             | ------               | Untested   |

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Development <a name="development"></a>

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

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Licensing <a name="licensing"></a>

This project is licensed under the **MIT** License. See the
[LICENSE](LICENSE.md) file for the pertaining license text.

`SPDX-License-Identifier: MIT`

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Wrapping Up <a name="wrapping-up"></a>

Thank you to the entire Angular team and community for such a great framework to
build upon. If you have any questions, please let me know by opening an issue
[here][url-new-issue].

| Type                                                                      | Info                                                           |
| :------------------------------------------------------------------------ | :------------------------------------------------------------- |
| <img width="48" src=".github/images/ng-icons/email.svg" />                | webmaster@codytolene.com                                       |
| <img width="48" src=".github/images/simple-icons/github.svg" />           | https://github.com/sponsors/CodyTolene                         |
| <img width="48" src=".github/images/simple-icons/buymeacoffee.svg" />     | https://www.buymeacoffee.com/codytolene                        |
| <img width="48" src=".github/images/simple-icons/bitcoin-btc-logo.svg" /> | bc1qfx3lvspkj0q077u3gnrnxqkqwyvcku2nml86wmudy7yf2u8edmqq0a5vnt |

Fin. Happy programming friend!

Cody Tolene

<!-- LINKS -->

[url-new-issue]: https://github.com/ProAngular/pro-form/issues
[url-node-js]: https://nodejs.org/
