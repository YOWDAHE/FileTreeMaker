import path from 'path';
import AddRole from '../(landing)/Home/page';



export async function getStaticProps() {
    // Use the 'fs' module to access files on the server
    const fs = require('fs');

    // Declare the data variable inside the function
    const data = {};

    // Define the dfs function inside the getStaticProps function

    function getData(setTree) {
        setTree(fileTree)
    }

    function dfs(path, pre, currentNode = data) {
        // The rest of the dfs function is unchanged
        if (fs.existsSync(path)) {
            let stats = fs.statSync(path);
            if (stats.isDirectory()) {
                console.log(pre, path.basename(path));
                console.log('currentNode', currentNode);
                currentNode['name'] = path.basename(path);
                currentNode.children = [];
                let files = fs.readdirSync(path);
                for (let file of files) {
                    let childNode = {};
                    currentNode.children.push(childNode);
                    dfs(path + '/' + file, pre + '.', childNode);
                }
            } else if (stats.isFile()) {
                let file = path.basename(path);
                console.log(file);
                // Set the name and children properties of the current node
                currentNode['name'] = file;
                currentNode.children = [];
            }
        } else {
            throw new Error('Invalid path');
        }
        return data;
    }

    // Call the dfs function with the desired path and store the result in a variable
    const fileTree = dfs(
        'C:/Users/ketem/Documents/Code/projects/TreeMaker/FileTreeMaker/filetree/app',
        '',
        data
    );

    // Return the file tree as a prop
    return {
        props: {
            fileTree,
        },
    };
}

// Define a page component that receives the file tree as a prop and renders it
function HomePage({ fileTree }) {
    <AddRole Treedata={fileTree} />
}

// Export the page component as default
export default HomePage;
