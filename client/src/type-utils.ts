/*
 * Utilities for generating types
 */

// TODO: Generate a type much like OptionalPropertyNames<T> except that values only conform to this type when the
// value's properties (taken from type T) all have a value that is of the type from T except cannot be type undefined.
// This would help to statically check for values which do not "complete" type T when merged into a value of
// Partial<T>.

// TODO: I still don't fully understand how this declaration works
export type OptionalPropertyNames<T> = { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T];

export type OptionalProperties<T> = Pick<T, OptionalPropertyNames<T>>;
