## Contributing to Allusion

Allusion is an open source JavaScript bug tracking library. We really appreciate pull requests, bug reports and enhancement suggestions, here are our guidelines:

1. If filing a bug report, please verify the bug completely end-to-end. We encourage you to open up a [new issue](https://github.com/csmadhav/allusion/issues/new) with details.
Does the bug have to do with inlining styles, general module failures or installation issues? Those are also
possibly Allusion bugs and we will definetly look at them.
2. Working on an issue? File the bug at https://github.com/csmadhav/allusion/issues/new (if there
isn’t one already). If your new change is going to be large it might be a good idea
to get the discussion started early. We are happy to discuss it beforehand.
3. Make sure that all the pull requests and bug reports provide justification for why they should be merged.

## Setup From Source

To set up a working **development environment**, just fork the project git repository 

Please note that these instructions are for setting a functional dev environment. If you want to set up an Allusion instance to integrate into your app, you should probably try and install Allusion by using the instructions in the main [README](README.md) file.

```bash
git clone git@github.com:[YOUR_FORK_HERE]/allusion.git

cd allusion

npm i

git chechkout -b <tag>#<issue number>/-<short description>
```

After finishing the installation process, you can start writing and editing code.

## Tests

To run tests manually, install JEST extension.
or,

```bash
npm run test
```

## Sending a Pull Request

When you send a PR, just make sure that:

* You add valid test cases (you can run them using `npm run test`).
* Tests are green.
* You check build (you can run using `npm run build` and `npm run build:standalone`).
* You make the PR on the same branch you based your changes on.
* Also don't forget to add a comment when you update a PR with a ping to [the maintainer](https://github.com/csmadhav/allusion), so he will get a notification.
* Squash your commits into one commit.

All Pull Requests must include the following header:

```markdown
| Q             | A
| ------------- | ---
| Bug fix?      | yes/no
| New feature?  | yes/no
| Tests pass?   | yes
| Fixed issues  | #1
| Description   | Summarize your task done
```

