/* Example:
* $ npm run create-reducer todos/todosGetAll
*/

const fs = require("fs");
const args = process.argv.slice(2);
const items = args[0].split('/');
const domainName = items[0];
const reducerName = items[1];

const defaultPath = `./src/redux/${domainName}/${reducerName}`;

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

const actionTemplate = `import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { axiosAdminServer } from 'services/axios';
import generateRejectErrorFromError, { RejectError } from 'utils/generateRejectErrorFromError';

interface Input {
  params: RequestParams
  body: RequestBody
}

interface Output {
  data: ResponseBody
}

const ActionName = createAsyncThunk<
  Output,
  Input,
  { rejectValue: RejectError }
>(
  'countries/ActionName',
  async ({ body, params }, { rejectWithValue }) => {
    const { authtoken } = params;
    const toastId = toast.loading('Loading...');
    try {
      await axiosAdminServer.post(
        '',
        body,
        {
          headers: {
            authtoken,
          },
        },
      );
      toast.success('Success!', { id: toastId });
      return { data: body };
    } catch (error) {
      const newError = generateRejectErrorFromError(error);
      toast.error(newError.message, { id: toastId });
      return rejectWithValue(newError);
    }
  },
);

export default ActionName;
`;

const sliceTemplate = `import { createSlice } from '@reduxjs/toolkit';
import ActionName from './${reducerName}.action';
import { ${reducerName}State } from './${reducerName}.types';

const initialState: ${reducerName}State = {
  isLoading: false,
  data: undefined,
  error: undefined,
};

const ${reducerName}Slice = createSlice({
  name: '${reducerName}',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ActionName.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ActionName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.error = undefined;
    });
    builder.addCase(ActionName.rejected, (state, action) => {
      state.isLoading = false;
      state.data = undefined;
      state.error = action.payload;
    });
  },
});

export default ${reducerName}Slice;
`;

const typesTemplate = `import { RejectError } from 'utils/generateRejectErrorFromError';
import { Domain } from '../${domainName}.type';

export interface ${reducerName}State {
  isLoading: boolean
  data?: ${reducerName}RequestBody
  error?: RejectError
}

export interface ${reducerName}RequestParams {
  authtoken: string
}

export type ${reducerName}RequestBody = Pick<Domain, 'name'>;

export type ${reducerName}ResponseBody = Domain;
`;

const defaultTemplates = [actionTemplate, sliceTemplate, typesTemplate]

const createFiles = (path, reducerName, templates) => {
  const fileNames = [`${reducerName}.action.ts`, `${reducerName}.slice.ts`, `${reducerName}.types.ts`];

  fileNames.forEach((fileName, index) => {
    if (!fs.existsSync(`${path}/${fileName}`)) {
      fs.writeFileSync(`${path}/${fileName}`, templates[index]);
    }
  });
};

createFolders(defaultPath);
createFiles(defaultPath, reducerName, defaultTemplates);
