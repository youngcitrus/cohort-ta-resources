## Running JS Locally (W2D1) - Learning Objectives

### Running JS Locally
1. Match the commands ls, cd, pwd to their descriptions
- `ls` lists all of the files and directories in the current location
- `cd` changes directory. We can provide a single directory to move into that's at our current location, or a full path to move to. We can also use `..` to indicate to move up one directory.
- `pwd` shows the present working directory, ie where we currently are in our computer's file system.

2. Given a folder structure diagram, a list of 'cd (path)' commands and target files, match the paths to the target files.
- The "Match the Path" quiz is a great example of knowledge that you should have for navigation.
![Directory Structure](./directory_structure.png)
- For example:
  - To get from `root` to `Applications`, we can use `cd Applications`
  - To get from `root` to `USB`, we can use `cd Volumes/USB`
  - To get from `Mac` to `Applications`, we can use `cd ../../Applications`

3. Use VSCode to create a folder. Within the folder create a .js file containing `console.log('hello new world');` and save it.
- Be able to use the GUI to create folders and files.
- The terminal is often more efficient than a GUI.
  - `mkdir` will make a new directory at the current location: `mkdir problems`
  - `cd` can move our terminal into that directory: `cd problems`
  - `touch` can create a new file: `touch demo.js`
  - `code` can open a file in the VSCode environment: `code demo.js`
  - The new file, nested inside of the folder you just created, is now open for you to type in.

4. Use node to execute a JavaScript file in the terminal
- The `node` command can be used to execute a JavaScript file. We use `node path/to/file` to tell node what file to run.
- If our terminal is in the same location as the file, we can use the file name directly: `node demo.js`
- If we want to run a file at another location, we can provide the full or relative path to the file: `node ../W02D1/problems/demo.js` navigates up one directory, into the `W02D1` directory, into the `problems` directory, then executes the `demo.js` file.
