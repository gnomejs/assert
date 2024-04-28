# @gnome/assert

<div height=30" vertical-align="top">
<image src="https://raw.githubusercontent.com/gnomejs/gnomejs/main/assets/icon.png"
    alt="logo" width="60" valign="middle" />
<span>Work less. Do more. </span>
</div>

## Overview

Assert wraps deno `@std/assert` to make the functions more ergonomic for testing.

## Mapping

The asserts are mapped to the follow:

```typescript
{
    equals: assertEquals,
    strictEquals: assertStrictEquals,
    notEquals: assertNotEquals,
    notStrictEquals: assertNotStrictEquals,
    match: assertMatch,
    notMatch: assertNotMatch,
    arrayIncludes: assertArrayIncludes,
    throws: assertThrows,
    rejects: assertRejects,
    ok: assertTruthy,
    truthy: assertTruthy,
    exists: assertExists,
    almostEquals: assertAlmostEquals,
    falsey: assertFalse,
    stringIncludes: assertStringIncludes,
    instanceOf: assertInstanceOf,
    isError: assertIsError,
    notInstanceOf: assertNotInstanceOf,
    matchObject: assertObjectMatch,
    fail: fail,
    unimplemented: unimplemented,
    unreachable: unreachable,
}
```

## Basic Usage

```typescript
import { assert, equals } from "@gnome/assert";

assert.ok(null, "truthy condition was false");
assert.equals(1, 1);

// or import just the method
equals(1, 1);
```

[MIT License](./LICENSE.md)
