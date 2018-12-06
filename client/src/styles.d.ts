// This declaration allows typescript files to import css files without the typescript compiler complaining. However,
// that also means that the typescript compiler will not offer completions for css classes in typescript.
// ---
// The alternatives considered were:
// 1. To use a module that builds *.d.ts files for each css file, so that there is a type definition that exposes the
//    specific classes in the css file as properties. This alternative worked with the caveat that the generation of the
//    *.d.ts files was not easy to tie into the development or production build process. It was typically done
//    asynchronously and even the production builds could not wait on that generation, causing build flakiness.
// 2. To place a `// @ts-ignore` directive above each import of a css file, so that the typescript compiler would not
//    complain. This has exactly the same outcome as this solution, but requires much more work for a developer.

declare module '*.css' {
  const content: any;
  export = content;
}
