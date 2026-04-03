import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    endOfLine: 'lf',
    singleQuote: true,
    overrides: [
      {
        files: ['*.css'],
        options: {
          singleQuote: false,
        },
      },
    ],
    experimentalSortPackageJson: false,
    experimentalSortImports: {
      newlinesBetween: true,
      partitionByComment: true,
      groups: [
        ['value-builtin', 'type-builtin'],
        ['value-external', 'value-internal', 'type-external', 'type-internal'],
        [
          'value-parent',
          'value-sibling',
          'value-index',
          'type-parent',
          'type-sibling',
          'type-index',
        ],
        ['style'],
      ],
    },
  },
  lint: { options: { typeAware: true, typeCheck: true } },
});
