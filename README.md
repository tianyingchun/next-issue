## install

1. yarn install
2. yarn dev
3. http://localhost:4001/

## Notes

1. remove `modularizeImports` setup for @mui
2. change `node_modules/@0no-co/graphql.web` (https://github.com/vercel/next.js/issues/72232)

````diff
diff --git a/node_modules/@0no-co/graphql.web/package.json b/node_modules/@0no-co/graphql.web/package.json
index bd060d6..99b7d28 100644
--- a/node_modules/@0no-co/graphql.web/package.json
+++ b/node_modules/@0no-co/graphql.web/package.json
@@ -16,8 +16,7 @@
   "exports": {
     ".": {
       "types": "./dist/graphql.web.d.ts",
-      "import": "./dist/graphql.web.mjs",
-      "require": "./dist/graphql.web.js",
+      "default": "./dist/graphql.web.js",
       "source": "./src/index.ts"
     },
     "./package.json": "./package.json"
     ```
````

3. avoid use `fragment query` for `RSC`
