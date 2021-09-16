# github actions react ts

Example of using github-actions, with a React app.

# Setup

- Initialize app with create-react-app

- Create repo

- Connect to remote
```bash
$ git remote add origin git@github.com:...
$ git branch -M main
$ git push -u origin main
```

- Setup tests

- Create `client-test.yaml` via github actions, or create a `.github/workflows/client-test.yaml` file in root dir
```yml
name: client-test

on:
  pull_request:
    # NOTE: Both paths and branches need to be satisfied
    paths: "client/**"
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Position to client and install modules
      run: cd client && npm install
    
    - name: Position to client and run tests
      run: cd client && npm test

```

- Create and checkout new `feature` branch

- Push from feature branch

- Triger action by `Create pull request` from the feture branch to the main branch

> NOTE: You can still mearge even if tests fail! In order to have merge option disabled untill tests pass, you need to have GitHub Pro to be able to set Branch protection rules via Settings > Branches

- Merge if all tests have passed
