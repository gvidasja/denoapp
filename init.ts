const options = {
  compilerOptions: {
    lib: ['deno.window', 'dom'],
    jsx: 'react-jsx',
    jsxImportSource: 'https://esm.sh/react@18.2.0',
  },
  imports: {
    react: 'https://esm.sh/react@18.2.0',
    'react-dom': 'https://esm.sh/react-dom@18.2.0',
    'react-dom/client': 'https://esm.sh/react-dom@18.2.0/client',
  },
  tasks: {
    dev: 'deno run -A --watch src/mod.ts',
  },
}

const existingConfig = read()

const newConfig = {
  ...(existingConfig || {}),
  compilerOptions: {
    ...(existingConfig?.compilerOptions || {}),
    ...options.compilerOptions,
    lib: mergeArrays(existingConfig?.compilerOptions?.lib || [], options.compilerOptions.lib),
  },
  imports: {
    ...(existingConfig?.imports || {}),
    ...options.imports,
  },
  tasks: {
    ...(existingConfig?.tasks || {}),
    ...options.tasks,
  },
}

Deno.writeTextFileSync('./deno.jsonc', JSON.stringify(newConfig, null, 2))

function read() {
  try {
    return JSON.parse(Deno.readTextFileSync('./deno.jsonc'))
  } catch {
    return {}
  }
}

function mergeArrays<T>(...arrays: T[][]) {
  return Array.from(new Set(arrays.flat()))
}
