## Node.js and Git (W3D2) - Learning Objectives

### Node.js 
1. Define NodeJS as distinct from browser based JavaScript runtimes.
- NodeJS is an environment that allows us to execute JavaScript code outside of the browser. There are a couple of differences between the two implementations:
  - global vs window
    - In Node, we have a global object, whereas in the browser, our top level object is the window.
    - The window has attributes that wouldn't make sense in a Node environment, such as the document (the html of the page), the location (url info), cookies, etc.
  - In Node, we can also use the `require` and module.exports in order to export and import code between files. Browsers have no notion of file systems, so we cannot write a require statement in the browser's console, for example. We will get into how we can use multiple files in the browser later on in the course.

2. Write a program that reads in a dictionary file using node's FS API and reads a line of text from the terminal input. The program should 'spell check' by putting asterisks around every word that is NOT found in the dictionary.
```js
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a sentence to be spell-checked: ', (sentence) => {
  fs.readFile('dictionary.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    }
    const dictionary = data.split('\n');
    console.log(checkSentence(sentence, dictionary));
    rl.close();
  });
});

function checkSentence(sentence, dictionary) {
  const words = sentence.split(' ');
  const newWords = words.map((word) => {
    // This will check for words present in the dictionary file exactly as written
    // We could expand this functionality in the future to make it more flexible
      // lowercase before comparison to make it case insensitive
      // strip away punctuation (slice if the word ends in '.' for example)
      // etc.
    if (dictionary.includes(word)) {
      return word;
    } else {
      return "*" + word + "*";
    }
  });
  return newWords.join(' ');
}
```

### Git
1. Use Git to initialize a repo
- We can use the command `git init` to create a new repository on our machine.
- Running this command with create a `.git` folder (hidden by default) at our current location, making the directory that we are in a git repository.

2. Explain the difference between Git and GitHub
- Git is a version control system that lets you manage and keep track of your source code history.
- GitHub is a cloud-based hosting service that lets you manage Git repositories.
- You can make a git repository on your machine without ever connecting it to a hosting service like GitHub or BitBucket.

3. Given 'adding to staging', 'committing', and 'pushing to remote', match attributes that apply to each.
- `Adding to staging` and `committing` have to deal with our local repository. We are dealing with changes that we have made to our files locally and want to track with our local .git
- `Pushing to remote` does not affect our local repository. When we push to remote, we are telling another location (most likely GitHub) about the changes that we have made locally so that it is up to date.

4. Use Git to clone an existing repo from GitHub
- The command `git clone <url>` will copy down all of the files from a hosted repository (including the `.git` directory which tracks the commits to file changes, branches, etc.).
- This is different from simply downloading the zip from GitHub, which will only be the code, not the git repository.

5. Use Git to push a local commit to a remote branch
- First, if this is our first time pushing up to the remote, we have to make sure we have the remote repository added.
  - `git remote add origin <url>`
- In order to track our changes, we use git to make commits. In order for these commits to be added to our remotes, we need to push up those changes.
- After making changes and saving our files, add the files to be committed, commit the changes, and push.
  - `git add .` (adds all files that are not tracked, or we can specify specific files)
  - `git commit -m"Add functions.js"` (the -m is allowing us to provide a descriptive message)
  - `git push` (pushes the changes that we have locally up to our remote)

6. Use git to make a branch, push it to github, and make a pull request on GitHub to merge it to master
 - `git branch <name-of-branch>`
 - `git push <remote> <branch>`
 -  PR (demo)
 - `git merge master`
7. Given a git merge conflict, resolve it
 - show (demo) https://stackoverflow.com/questions/38216541/visual-studio-code-how-to-resolve-merge-conflicts-with-git
8. Match the three types of git reset with appropriate descriptions of the operation.
- Soft reset: moves our `HEAD` to a specified commit, leaving any changes to files in our staging area. We could potentially use this to consolidate many commit messages into one.
- Mixed reset: moves our `HEAD` to a specified commit, keeping any changes to files in the files, but not staged. We could make changes to these files before restaging and committing.
- Hard reset: moves our `HEAD` to a specified commit, deleting all changes to files. This is like going back in time to that commit, removing all references to later commits and file changes.

9. Use Git reset to rollback local-only commits.
- We can use `git log --oneline` to get a quick reference to what our previous commits were.
- When we locate which commit we want to roll back to, we can use the `git reset <hash>` in order to rollback to that commit.
- By default, our `reset` command is a `mixed` reset, but if we would like to change this we can provide `--soft` or `--hard` to change that nature.

10. Identify what the git rebase command does
- Rebase has a similar functionality to merging, but with a different implementation.
- Instead of adding a new commit with the combined branches, rebase changes the current branch's base branch, essentially rewriting the history of the branch to be based off of another.
- The end result is often exactly the same, but the history will be different. This can result in difficulties if multiple people are working on the same branch, with commits no longer lining up with each other.

11. Use git diff to compare a local 'staging' branch and 'master' branch.
- We can provide the name of another branch that we want to compare to using `git diff <branch-name>`. This will compare the result of being on the other branch and coming over to our current location.
- If we want to see the differences between our 'staging' and 'master' branches, we can run `git diff staging`, assuming we are currently on 'master'.

12. Use git checkout to check out a specific commit by commit id
 - `git checkout <hash or commit-id>`
