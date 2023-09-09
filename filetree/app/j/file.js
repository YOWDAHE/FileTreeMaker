const fs = require('fs');

p = require('path');


const data = {};

export default function dfs(path, pre, currentNode = data) {

    if (fs.existsSync(path)) {

        let stats = fs.statSync(path);

        if (stats.isDirectory()) {

            console.log(pre, p.basename(path));
            console.log('currentNode', currentNode)

            currentNode['name'] = p.basename(path);
            currentNode.children = []

            let files = fs.readdirSync(path);

            for (let file of files) {

                let childNode = {};
                
                currentNode.children.push(childNode);
                
                dfs(path + '/' + file, pre + '.', childNode);
            }
        }
        else if (stats.isFile()) {

            let file = p.basename(path);

            console.log(file);
            // Set the name and children properties of the current node
            currentNode['name'] = file;
            currentNode.children = [];
        }
    }
    else {

        throw new Error('Invalid path');
    }
    
    return data
}

dfs('C:/Users/ketem/Documents/Code/projects/TreeMaker/FileTreeMaker/filetree/app', '', data);
