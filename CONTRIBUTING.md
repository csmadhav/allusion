## Contributing to Allusion

Allusion is an open source JavaScript bug tracking library. We really appreciate pull requests, bug reports and enhancement suggestions, here are our guidelines:

1. If filing a bug report, please verify the bug completely end-to-end. We encourage you to open up a [new issue](https://github.com/csmadhav/allusion/issues/new) with details.
2. Working on an issue? File the bug at https://github.com/csmadhav/allusion/issues/new (if there
isn’t one already). If your new change is going to be large it might be a good idea
to get the discussion started early. We are happy to discuss it beforehand.
3. Make sure that all the pull requests and bug reports provide justification for why they should be merged.

## Setup From Source

To set up a working **development environment**, just fork the project git repository 

Please note that these instructions are for setting a functional development environment. If you want to set up an Allusion instance to integrate into your app, you should probably try and install Allusion by using the instructions in the main [README](README.md) file.

Your Branch name should of the following format -
`[tag]#[issue number]/-[short description]`

```bash
git clone git@github.com:[YOUR_FORK_HERE]/allusion.git

cd allusion

npm i

git checkout -b [YOUR_BRANCH_NAME]
```

After finishing the installation process, you can start writing and editing code.

## Build

To build a new version of the Allusion server, all you need to do is run the build like this:

```bash
npm run build

npm run build:standalone
```

## Tests

To run tests manually.

```bash
npm run test
```

If you are uisng vscode, download [JEST Extension](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest).

## Sending a Pull Request

When you send a PR, just make sure that:

* You add valid test cases (you can run them using `npm run test`).
* Tests are green.
* You check build (you can run using `npm run build` and `npm run build:standalone`).




