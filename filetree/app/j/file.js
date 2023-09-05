// Import the file system module
const fs = require('fs');

// Import the path module
const p = require('path');

// Define a function that takes a path to a file and performs a dfs
function dfs(path, pre) {
    // Check if the path exists
    if (fs.existsSync(path)) {
        // Get the stats of the path
        let stats = fs.statSync(path);
        // If the path is a directory
        if (stats.isDirectory()) {
            // Print the name of the directory without the extension
            console.log(pre ,p.basename(path));
            // Get the list of files and subdirectories in the directory
            let files = fs.readdirSync(path);
            // Loop through each file or subdirectory
            for (let file of files) {
                // Recursively call dfs on the file or subdirectory with the full path
                dfs(path + '/' + file, pre + '.');
            }
        }
        // If the path is a file
        else if (stats.isFile()) {
            // Get the file name with the extension
            let file = p.basename(path);
            // Print only the file name
            console.log(file);
        }
    }
    // If the path does not exist
    else {
        // Throw an error
        throw new Error('Invalid path');
    }
}

// Call dfs on a sample path
dfs('C:/Users/ketem/Documents/Code/projects/TreeMaker/FileTreeMaker/filetree/app', '');
