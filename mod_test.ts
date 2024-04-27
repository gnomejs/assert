
import * as assert from "./mod.ts";


Deno.test("validate equality", () => {
    assert.equals(1, 1);
    assert.strictEquals(1, 1);
    assert.notEquals(1, 2);
    assert.notStrictEquals(1, 2);
});

Deno.test("validate truthy", () => {
    assert.truthy(true);
    assert.falsey(false);
});

Deno.test("validate exists", () => {
    assert.exists("hello");
});


// test rejects
Deno.test("validate rejects", async () => {
    await assert.rejects(() => Promise.reject(10));
});

// test throws
Deno.test("validate throws", () => {
    assert.throws(() => {
        throw new Error("error");
    }, "error");
});

// object match
Deno.test("validate object match", () => {
    assert.matchObject({ a: 1, b: 2 }, { a: 1 });
});

// test match
Deno.test("validate match", () => {
    assert.match("hello world", /hello/);
});

// test not match
Deno.test("validate not match", () => {
    assert.notMatch("hello world", /world2/);
});

// test includes
Deno.test("validate includes", () => {
    assert.arrayIncludes([1, 2, 3], [2]);
});

// test string includes
Deno.test("validate string includes", () => {
    assert.stringIncludes("hello world", "world");
});

// test instance of
Deno.test("validate instance of", () => {
    assert.instanceOf(new Error(), Error);
});

// test not instance of
Deno.test("validate not instance of", () => {
    assert.notInstanceOf(new Error(), String);
});
