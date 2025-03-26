### Hexlet tests and linter status:
[![Actions Status](https://github.com/st1ssssss/typescript-project-81/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/st1ssssss/typescript-project-81/actions)

[![Test Coverage](https://api.codeclimate.com/v1/badges/d5ffaa284f35370810bc/test_coverage)](https://codeclimate.com/github/st1ssssss/typescript-project-81/test_coverage)

**Пример использования**

```ts
import HexletCode from '@hexlet/code';

const template = { name: 'rob', job: 'hexlet', gender: 'm' };
const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
  f.input('name');
  f.input('job', { as: 'textarea' });
});

console.log(form);

// Для удобства пример указан с переносами строк, реализовывать их необязательно

//  <form action="#" method="post">
//      <input name="name" type="text" value="rob">
//      <textarea cols="20" rows="40" name="job" as="textarea">hexlet</textarea>
//  </form>
```

Для полей можно указать последним параметром дополнительные атрибуты в виде хеша:

```ts
const form = HexletCode.formFor(template, {}, (f) => {
  f.input('name', {class: 'user-input'});
  f.input('job');
});

// <form action="#" method="post">
//   <input name="name" type="text" value="rob" class="user-input">
//   <input name="job" type="text" value="hexlet">
// </form>
```

У полей могут быть дефолтные значения, которые можно переопределить:

```ts
const form = HexletCode.formFor(template, {}, (f) =>
  f.input('job', { as: 'textarea' }));

// <form action="#" method="post">
//   <textarea name="job" cols="20" rows="40">hexlet</textarea>
// </form>


const form = HexletCode.formFor(template, { url: '#' }, (f) =>
  f.input('job', { as: 'textarea', rows: 50, cols: 50}));

// <form action="#" method="post">
//   <textarea cols="50" rows="50" name="job">hexlet</textarea>
// </form>
```