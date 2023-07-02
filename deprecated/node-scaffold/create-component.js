/* Example:
* $ npm run create-component Spinner
*/

const fs = require("fs");
const args = process.argv.slice(2);
const componentName = args[0];

const defaultPath = './src/components/';

const getPathsFrom = (path) => path.split('/').filter(path => path !== '.' && path);

const createFolders = (path) => {
  const paths = getPathsFrom(path);

  let newPath = '.'
  paths.forEach(path => {
    newPath += `/${path}`;
    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }
  });
}

const indexTemplate = `import React from 'react';

const ${componentName}: React.FC = () => {
  return (
    <div>
    </ div>
  )
}

export default ${componentName};
`;

const stylesTemplate = ``;

const testsTemplate = `import userEvent from '@testing-library/user-event';
import { render, screen, store } from 'jest/testing-utils';
import React from 'react';
import ${componentName} from '.';

describe('<${componentName} />', () => {
  beforeEach(() => {
    render(
      <${componentName} />,
      {},
    );
  });

  it('renders correctly', () => { });

});
`;

const defaultTemplates = [indexTemplate, stylesTemplate, testsTemplate]

const createFiles = (path, componentName, templates) => {
  const fileNames = ['index.tsx', `${componentName}.module.scss`, `${componentName}.test.tsx`];

  fileNames.forEach((fileName, index) => {
    if (!fs.existsSync(`${path}/${fileName}`)) {
      fs.writeFileSync(`${path}/${fileName}`, templates[index]);
    }
  });
};

createFolders(defaultPath);
createFiles(defaultPath, componentName, defaultTemplates);
