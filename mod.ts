/** 
 * The @gnome/assert provides Deno's @std/assert methods that
 * is more ergonomic and user-friendly.
 * 
 * The code comments comes from the original @std/assert module
 * and are under the MIT license and Deno copyright.
 *
 * @module
 */

import {
    assertAlmostEquals,
    assertArrayIncludes,
    assertEquals,
    assertExists,
    assertFalse,
    assertInstanceOf,
    AssertionError,
    assertIsError,
    assertMatch,
    assertNotEquals,
    assertNotInstanceOf,
    assertNotMatch,
    assertNotStrictEquals,
    assertObjectMatch,
    assertRejects,
    assertStrictEquals,
    assertStringIncludes,
    assertThrows,
    assert as assertTruthy,
    fail,
    unimplemented,
    unreachable,
} from "@std/assert";

export { AssertionError };

// deno-lint-ignore no-explicit-any
type AnyConstructor = new (...args: any[]) => any;
type GetConstructorType<T extends AnyConstructor> = T extends // deno-lint-ignore no-explicit-any
new (...args: any) => infer C ? C
    : never;

export type Assertion = {
    /**
     * Make an assertion that `actual` and `expected` are equal, deeply. If not
     * deeply equal, then throw.
     *
     * Type parameter can be specified to ensure values under comparison have the
     * same type.
     *
     * @example
     * ```ts
     * import { assertEquals } from "@std/assert/assert-equals";
     *
     * assertEquals("world", "world"); // Doesn't throw
     * assertEquals("hello", "world"); // Throws
     * ```
     *
     * Note: formatter option is experimental and may be removed in the future.
     */
    equals<T>(actual: T, expected: unknown, msg?: string): void;

    /**
     * Make an assertion that actual is not null or undefined.
     * If not then throw.
     *
     * @example
     * ```ts
     * import { assertExists } from "@std/assert/assert-exists";
     *
     * assertExists("something"); // Doesn't throw
     * assertExists(undefined); // Throws
     * ```
     */
    exists<T>(actual: T, msg?: string): asserts actual is NonNullable<T>;

    /**
     * Make an assertion that `actual` and `expected` are strictly equal. If
     * not then throw.
     *
     * @example
     * ```ts
     * import { assertStrictEquals } from "@std/assert/assert-strict-equals";
     *
     * const a = {};
     * const b = a;
     * assertStrictEquals(a, b); // Doesn't throw
     *
     * const c = {};
     * const d = {};
     * assertStrictEquals(c, d); // Throws
     * ```
     */
    strictEquals<T>(actual: T, expected: T, msg?: string): void;

    /**
     * Make an assertion that `actual` and `expected` are not equal, deeply.
     * If not then throw.
     *
     * Type parameter can be specified to ensure values under comparison have the same type.
     *
     * @example
     * ```ts
     * import { assertNotEquals } from "@std/assert/assert-not-equals";
     *
     * assertNotEquals(1, 2); // Doesn't throw
     * assertNotEquals(1, 1); // Throws
     * ```
     */
    notEquals<T>(actual: T, expected: unknown, msg?: string): void;

    /**
     * Make an assertion that `actual` and `expected` are not strictly equal.
     * If the values are strictly equal then throw.
     *
     * @example
     * ```ts
     * import { assertNotStrictEquals } from "@std/assert/assert-not-strict-equals";
     *
     * assertNotStrictEquals(1, 1); // Doesn't throw
     * assertNotStrictEquals(1, 2); // Throws
     * ```
     */
    notStrictEquals<T>(actual: T, expected: T, msg?: string): void;

    /**
     * Make an assertion that `actual` match RegExp `expected`. If not
     * then throw.
     *
     * @example
     * ```ts
     * import { assertMatch } from "@std/assert/assert-match";
     *
     * assertMatch("Raptor", RegExp(/Raptor/)); // Doesn't throw
     * assertMatch("Denosaurus", RegExp(/Raptor/)); // Throws
     * ```
     */
    match(actual: string, expected: RegExp, msg?: string): void;

    /**
     * Make an assertion that `obj` is not an instance of `type`.
     * If so, then throw.
     *
     * @example
     * ```ts
     * import { assertNotInstanceOf } from "@std/assert/assert-not-instance-of";
     *
     * assertNotInstanceOf(new Date(), Number); // Doesn't throw
     * assertNotInstanceOf(new Date(), Date); // Throws
     * ```
     */
    notMatch(actual: string, expected: RegExp, msg?: string): void;

    /**
     * Make an assertion that `actual` includes the `expected` values. If not then
     * an error will be thrown.
     *
     * Type parameter can be specified to ensure values under comparison have the
     * same type.
     *
     * @example
     * ```ts
     * import { assertArrayIncludes } from "@std/assert/assert-array-includes";
     *
     * assertArrayIncludes([1, 2], [2]); // Doesn't throw
     * assertArrayIncludes([1, 2], [3]); // Throws
     * ```
     */
    arrayIncludes<T>(
        actual: ArrayLike<T>,
        expected: ArrayLike<T>,
        msg?: string,
    ): void;

    /**
     * Executes a function, expecting it to throw. If it does not, then it
     * throws.
     *
     * To assert that an asynchronous function rejects, use
     * {@linkcode assertRejects}.
     *
     * @example
     * ```ts
     * import { assertThrows } from "@std/assert/assert-throws";
     *
     * assertThrows(() => { throw new TypeError("hello world!"); }); // Doesn't throw
     * assertThrows(() => console.log("hello world!")); // Throws
     * ```
     */
    throws<E extends Error = Error>(
        fn: () => unknown,
        // deno-lint-ignore no-explicit-any
        ErrorClass: new (...args: any[]) => E,
        msgIncludes?: string,
        msg?: string,
    ): E;
    throws<E extends Error = Error>(
        fn: () => unknown,
        errorClassOrMsg?:
            // deno-lint-ignore no-explicit-any
            | (new (...args: any[]) => E)
            | string,
        msgIncludesOrMsg?: string,
        msg?: string,
    ): E | Error | unknown;

    /**
     * Executes a function which returns a promise, expecting it to reject.
     *
     * To assert that a synchronous function throws, use {@linkcode assertThrows}.
     *
     * @example
     * ```ts
     * import { assertRejects } from "@std/assert/assert-rejects";
     *
     * await assertRejects(async () => Promise.reject(new Error())); // Doesn't throw
     * await assertRejects(async () => console.log("Hello world")); // Throws
     * ```
     */
    rejects<E extends Error = Error>(
        fn: () => PromiseLike<unknown>,
        // deno-lint-ignore no-explicit-any
        ErrorClass: new (...args: any[]) => E,
        msgIncludes?: string,
        msg?: string,
    ): Promise<E>;
    rejects<E extends Error = Error>(
        fn: () => PromiseLike<unknown>,
        errorClassOrMsg?:
            // deno-lint-ignore no-explicit-any
            | (new (...args: any[]) => E)
            | string,
        msgIncludesOrMsg?: string,
        msg?: string,
    ): Promise<E | Error | unknown>;

    /**
     * Make an assertion, error will be thrown if `expr` does not have truthy value.
     *
     * @example
     * ```ts
     * import { assert } from "@std/assert/assert";
     *
     * assert("hello".includes("ello")); // Doesn't throw
     * assert("hello".includes("world")); // Throws
     * ```
     */
    truthy(expr: unknown, msg?: string): asserts expr;

    /**
     * Make an assertion, error will be thrown if `expr` does not have truthy value.
     *
     * @example
     * ```ts
     * import { assert } from "@std/assert/assert";
     *
     * assert("hello".includes("ello")); // Doesn't throw
     * assert("hello".includes("world")); // Throws
     * ```
     */
    ok(expr: unknown, msg?: string): asserts expr;

    
    /**
     * Make an assertion that `actual` and `expected` are almost equal numbers
     * through a given tolerance. It can be used to take into account IEEE-754
     * double-precision floating-point representation limitations. If the values
     * are not almost equal then throw.
     *
     * @example
     * ```ts
     * import { assertAlmostEquals } from "@std/assert";
     *
     * assertAlmostEquals(0.01, 0.02, 0.1); // Doesn't throw
     * assertAlmostEquals(0.01, 0.02); // Throws
     * assertAlmostEquals(0.1 + 0.2, 0.3, 1e-16); // Doesn't throw
     * assertAlmostEquals(0.1 + 0.2, 0.3, 1e-17); // Throws
     * ```
     */
    almostEquals(
        actual: number,
        expected: number,
        delta?: number,
        msg?: string,
    ): void;

    /**
     * Make an assertion, error will be thrown if `expr` have truthy value.
     *
     * @example
     * ```ts
     * import { assertFalse } from "@std/assert/assert-false";
     *
     * assertFalse(false); // Doesn't throw
     * assertFalse(true); // Throws
     * ```
     */
    falsey(expr: unknown, msg?: string): asserts expr;

    /**
     * Make an assertion that actual includes expected. If not
     * then throw.
     *
     * @example
     * ```ts
     * import { assertStringIncludes } from "@std/assert/assert-string-includes";
     *
     * assertStringIncludes("Hello", "ello"); // Doesn't throw
     * assertStringIncludes("Hello", "world"); // Throws
     * ```
     */
    stringIncludes(actual: string, expected: string, msg?: string): void;

    /**
     * Make an assertion that `obj` is an instance of `type`.
     * If not then throw.
     *
     * @example
     * ```ts
     * import { assertInstanceOf } from "@std/assert/assert-instance-of";
     *
     * assertInstanceOf(new Date(), Date); // Doesn't throw
     * assertInstanceOf(new Date(), Number); // Throws
     * ```
     */
    instanceOf<T extends AnyConstructor>(
        actual: unknown,
        expectedType: T,
        msg?: string,
    ): asserts actual is GetConstructorType<T>;


    /**
     * Make an assertion that `error` is an `Error`.
     * If not then an error will be thrown.
     * An error class and a string that should be included in the
     * error message can also be asserted.
     *
     * @example
     * ```ts
     * import { assertIsError } from "@std/assert/assert-is-error";
     *
     * assertIsError(null); // Throws
     * assertIsError(new RangeError("Out of range")); // Doesn't throw
     * assertIsError(new RangeError("Out of range"), SyntaxError); // Throws
     * assertIsError(new RangeError("Out of range"), SyntaxError, "Out of range"); // Doesn't throw
     * assertIsError(new RangeError("Out of range"), SyntaxError, "Within range"); // Throws
     * ```
     */
    isError<E extends Error = Error>(
        error: unknown,
        // deno-lint-ignore no-explicit-any
        ErrorClass?: new (...args: any[]) => E,
        msgIncludes?: string,
        msg?: string,
    ): asserts error is E;

    /**
     * Make an assertion that `obj` is not an instance of `type`.
     * If so, then throw.
     *
     * @example
     * ```ts
     * import { assertNotInstanceOf } from "@std/assert/assert-not-instance-of";
     *
     * assertNotInstanceOf(new Date(), Number); // Doesn't throw
     * assertNotInstanceOf(new Date(), Date); // Throws
     * ```
     */
    notInstanceOf<A, T>(
        actual: A,
        // deno-lint-ignore no-explicit-any
        unexpectedType: new (...args: any[]) => T,
        msg?: string,
    ): asserts actual is Exclude<A, T>;

    /**
     * Make an assertion that `actual` object is a subset of `expected` object,
     * deeply. If not, then throw.
     *
     * @example
     * ```ts
     * import { assertObjectMatch } from "@std/assert/assert-object-match";
     *
     * assertObjectMatch({ foo: "bar" }, { foo: "bar" }); // Doesn't throw
     * assertObjectMatch({ foo: "bar" }, { foo: "baz" }); // Throws
     * ```
     */
    matchObject(actual: unknown, expected: unknown, msg?: string): void;

    /**
     * Forcefully throws a failed assertion.
     *
     * @example
     * ```ts
     * import { fail } from "@std/assert/fail";
     *
     * fail("Deliberately failed!"); // Throws
     * ```
     */
    fail(msg?: string): never;

    /**
     * Use this to stub out methods that will throw when invoked.
     *
     * @example
     * ```ts
     * import { unimplemented } from "@std/assert/unimplemented";
     *
     * unimplemented(); // Throws
     * ```
     */
    unimplemented(msg?: string): never;

    /**
     * Use this to assert unreachable code.
     *
     * @example
     * ```ts
     * import { unreachable } from "@std/assert/unreachable";
     *
     * unreachable(); // Throws
     * ```
     */
    unreachable(): never;
};

export const assert: Assertion = {
    /**
     * Make an assertion that `actual` and `expected` are equal, deeply. If not
     * deeply equal, then throw.
     *
     * Type parameter can be specified to ensure values under comparison have the
     * same type.
     *
     * @example
     * ```ts
     * import { assertEquals } from "@std/assert/assert-equals";
     *
     * assertEquals("world", "world"); // Doesn't throw
     * assertEquals("hello", "world"); // Throws
     * ```
     *
     * Note: formatter option is experimental and may be removed in the future.
     */
    equals: assertEquals,

    /**
     * Make an assertion that actual is not null or undefined.
     * If not then throw.
     *
     * @example
     * ```ts
     * import { assertExists } from "@std/assert/assert-exists";
     *
     * assertExists("something"); // Doesn't throw
     * assertExists(undefined); // Throws
     * ```
     */
    exists: assertExists,

    /**
     * Make an assertion that `actual` and `expected` are strictly equal. If
     * not then throw.
     *
     * @example
     * ```ts
     * import { assertStrictEquals } from "@std/assert/assert-strict-equals";
     *
     * const a = {};
     * const b = a;
     * assertStrictEquals(a, b); // Doesn't throw
     *
     * const c = {};
     * const d = {};
     * assertStrictEquals(c, d); // Throws
     * ```
     */
    strictEquals: assertStrictEquals,

    /**
     * Make an assertion that `actual` and `expected` are not equal, deeply.
     * If not then throw.
     *
     * Type parameter can be specified to ensure values under comparison have the same type.
     *
     * @example
     * ```ts
     * import { assertNotEquals } from "@std/assert/assert-not-equals";
     *
     * assertNotEquals(1, 2); // Doesn't throw
     * assertNotEquals(1, 1); // Throws
     * ```
     */
    notEquals: assertNotEquals,

    /**
     * Make an assertion that `actual` and `expected` are not strictly equal.
     * If the values are strictly equal then throw.
     *
     * @example
     * ```ts
     * import { assertNotStrictEquals } from "@std/assert/assert-not-strict-equals";
     *
     * assertNotStrictEquals(1, 1); // Doesn't throw
     * assertNotStrictEquals(1, 2); // Throws
     * ```
     */
    notStrictEquals: assertNotStrictEquals,

    /**
     * Make an assertion that `actual` match RegExp `expected`. If not
     * then throw.
     *
     * @example
     * ```ts
     * import { assertMatch } from "@std/assert/assert-match";
     *
     * assertMatch("Raptor", RegExp(/Raptor/)); // Doesn't throw
     * assertMatch("Denosaurus", RegExp(/Raptor/)); // Throws
     * ```
     */
    match: assertMatch,

    /**
     * Make an assertion that `obj` is not an instance of `type`.
     * If so, then throw.
     *
     * @example
     * ```ts
     * import { assertNotInstanceOf } from "@std/assert/assert-not-instance-of";
     *
     * assertNotInstanceOf(new Date(), Number); // Doesn't throw
     * assertNotInstanceOf(new Date(), Date); // Throws
     * ```
     */
    notMatch: assertNotMatch,

    /**
     * Make an assertion that `actual` includes the `expected` values. If not then
     * an error will be thrown.
     *
     * Type parameter can be specified to ensure values under comparison have the
     * same type.
     *
     * @example
     * ```ts
     * import { assertArrayIncludes } from "@std/assert/assert-array-includes";
     *
     * assertArrayIncludes([1, 2], [2]); // Doesn't throw
     * assertArrayIncludes([1, 2], [3]); // Throws
     * ```
     */
    arrayIncludes: assertArrayIncludes,

    /**
     * Executes a function, expecting it to throw. If it does not, then it
     * throws.
     *
     * To assert that an asynchronous function rejects, use
     * {@linkcode assertRejects}.
     *
     * @example
     * ```ts
     * import { assertThrows } from "@std/assert/assert-throws";
     *
     * assertThrows(() => { throw new TypeError("hello world!"); }); // Doesn't throw
     * assertThrows(() => console.log("hello world!")); // Throws
     * ```
     */
    throws: assertThrows,

    /**
     * Executes a function which returns a promise, expecting it to reject.
     *
     * To assert that a synchronous function throws, use {@linkcode assertThrows}.
     *
     * @example
     * ```ts
     * import { assertRejects } from "@std/assert/assert-rejects";
     *
     * await assertRejects(async () => Promise.reject(new Error())); // Doesn't throw
     * await assertRejects(async () => console.log("Hello world")); // Throws
     * ```
     */
    rejects: assertRejects,

    /**
     * Make an assertion, error will be thrown if `expr` does not have truthy value.
     *
     * @example
     * ```ts
     * import { assert } from "@std/assert/assert";
     *
     * assert("hello".includes("ello")); // Doesn't throw
     * assert("hello".includes("world")); // Throws
     * ```
     */
    ok: assertTruthy,

    /**
     * Make an assertion, error will be thrown if `expr` does not have truthy value.
     *
     * @example
     * ```ts
     * import { assert } from "@std/assert/assert";
     *
     * assert("hello".includes("ello")); // Doesn't throw
     * assert("hello".includes("world")); // Throws
     * ```
     */
    truthy: assertTruthy,



    /**
     * Make an assertion that `actual` and `expected` are almost equal numbers
     * through a given tolerance. It can be used to take into account IEEE-754
     * double-precision floating-point representation limitations. If the values
     * are not almost equal then throw.
     *
     * @example
     * ```ts
     * import { assertAlmostEquals } from "@std/assert";
     *
     * assertAlmostEquals(0.01, 0.02, 0.1); // Doesn't throw
     * assertAlmostEquals(0.01, 0.02); // Throws
     * assertAlmostEquals(0.1 + 0.2, 0.3, 1e-16); // Doesn't throw
     * assertAlmostEquals(0.1 + 0.2, 0.3, 1e-17); // Throws
     * ```
     */
    almostEquals: assertAlmostEquals,

    /**
     * Make an assertion, error will be thrown if `expr` have truthy value.
     *
     * @example
     * ```ts
     * import { assertFalse } from "@std/assert/assert-false";
     *
     * assertFalse(false); // Doesn't throw
     * assertFalse(true); // Throws
     * ```
     */
    falsey: assertFalse,

    /**
     * Make an assertion that actual includes expected. If not
     * then throw.
     *
     * @example
     * ```ts
     * import { assertStringIncludes } from "@std/assert/assert-string-includes";
     *
     * assertStringIncludes("Hello", "ello"); // Doesn't throw
     * assertStringIncludes("Hello", "world"); // Throws
     * ```
     */
    stringIncludes: assertStringIncludes,

    /**
     * Make an assertion that `obj` is an instance of `type`.
     * If not then throw.
     *
     * @example
     * ```ts
     * import { assertInstanceOf } from "@std/assert/assert-instance-of";
     *
     * assertInstanceOf(new Date(), Date); // Doesn't throw
     * assertInstanceOf(new Date(), Number); // Throws
     * ```
     */
    instanceOf: assertInstanceOf,


    /**
     * Make an assertion that `error` is an `Error`.
     * If not then an error will be thrown.
     * An error class and a string that should be included in the
     * error message can also be asserted.
     *
     * @example
     * ```ts
     * import { assertIsError } from "@std/assert/assert-is-error";
     *
     * assertIsError(null); // Throws
     * assertIsError(new RangeError("Out of range")); // Doesn't throw
     * assertIsError(new RangeError("Out of range"), SyntaxError); // Throws
     * assertIsError(new RangeError("Out of range"), SyntaxError, "Out of range"); // Doesn't throw
     * assertIsError(new RangeError("Out of range"), SyntaxError, "Within range"); // Throws
     * ```
     */
    isError: assertIsError,

    /**
     * Make an assertion that `obj` is not an instance of `type`.
     * If so, then throw.
     *
     * @example
     * ```ts
     * import { assertNotInstanceOf } from "@std/assert/assert-not-instance-of";
     *
     * assertNotInstanceOf(new Date(), Number); // Doesn't throw
     * assertNotInstanceOf(new Date(), Date); // Throws
     * ```
     */
    notInstanceOf: assertNotInstanceOf,

    /**
     * Make an assertion that `actual` object is a subset of `expected` object,
     * deeply. If not, then throw.
     *
     * @example
     * ```ts
     * import { assertObjectMatch } from "@std/assert/assert-object-match";
     *
     * assertObjectMatch({ foo: "bar" }, { foo: "bar" }); // Doesn't throw
     * assertObjectMatch({ foo: "bar" }, { foo: "baz" }); // Throws
     * ```
     */
    matchObject: assertObjectMatch,

    /**
     * Forcefully throws a failed assertion.
     *
     * @example
     * ```ts
     * import { fail } from "@std/assert/fail";
     *
     * fail("Deliberately failed!"); // Throws
     * ```
     */
    fail: fail,

    /**
     * Use this to stub out methods that will throw when invoked.
     *
     * @example
     * ```ts
     * import { unimplemented } from "@std/assert/unimplemented";
     *
     * unimplemented(); // Throws
     * ```
     */
    unimplemented: unimplemented,

    /**
     * Use this to assert unreachable code.
     *
     * @example
     * ```ts
     * import { unreachable } from "@std/assert/unreachable";
     *
     * unreachable(); // Throws
     * ```
     */
    unreachable: unreachable,
};

export {
    assertAlmostEquals as almostEquals,
    assertArrayIncludes as arrayIncludes,
    assertEquals as equals,
    assertExists as exists,
    assertFalse as falsey,
    assertInstanceOf as instanceOf,
    assertIsError as isError,
    assertMatch as match,
    assertNotEquals as notEquals,
    assertNotInstanceOf as notInstanceOf,
    assertNotMatch as notMatch,
    assertNotStrictEquals as notStrictEquals,
    assertObjectMatch as matchObject,
    assertRejects as rejects,
    assertStrictEquals as strictEquals,
    assertStringIncludes as stringIncludes,
    assertThrows as throws,
    assertTruthy as truthy,
    fail,
    unimplemented,
    unreachable,
};