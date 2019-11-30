var TreeComponent = (function () {
    // private
    let componentDOM;
    let formattedComponentData = [];
    let rawComponentData = [
        {
          "id": 0,
          "name": "Node 0",
          "thumbnail": {
            "description": "Random Picture",
            "href": "https://picsum.photos/200/200/?random&a"
          },
          "parent": null
        },
        {
          "id": 1,
          "name": "Node 1",
          "thumbnail": {
            "description": "Another Random Picture",
            "href": "https://picsum.photos/200/200/?random&b"
          },
          "parent": 0
        },
        {
          "id": 2,
          "name": "Node 2",
          "thumbnail": {
            "description": "A Picture Is Random",
            "href": "https://picsum.photos/200/200/?random&c"
          },
          "parent": null
        },
        {
          "id": 3,
          "name": "Node 3",
          "thumbnail": {
            "description": "Picture, Random",
            "href": "https://picsum.photos/200/200/?random&d"
          },
          "parent": 1
        },
        {
          "id": 4,
          "name": "Node 4",
          "thumbnail": {
            "description": "rand(pix)",
            "href": "https://picsum.photos/200/200/?random&e"
          },
          "parent": 5
        },
        {
          "id": 5,
          "name": "Node 5",
          "thumbnail": {
            "description": "pickPix <- rand",
            "href": "https://picsum.photos/200/200/?random&f"
          },
          "parent": null
        }
    ];

    // Format the Tree Component data
    function formatData() {
        rawComponentData.forEach(function(item){
            if(item.parent != null) {
                item.root = false;
            } else {
                item.root = true;
            }

            formattedComponentData.push(item);
        });
    }

    // Draw the Tree Component
    function drawComponentNodes() {
        var node;
        var queuedNodes = [];

        // add tree nodes
        formattedComponentData.forEach(function(item){
            node = document.createElement('div');
            node.setAttribute("id", "treeNode" + item.id);
            node.className = (item.root) ? "node root" : "node child"
            drawNodeContent(node, item);

            if(item.parent != null) {
                var parent = document.getElementById("treeNode" + item.parent);

                // if the parent of the node we are adding isn't undefined, add it
                // otherwise add it to a queue for later inclusion
                if(parent != undefined) {

                    parent.classList.add("children");
                    parent.getElementsByClassName("nodeContent")[0].appendChild(node);
                } else {
                    queuedNodes.push(item);
                }

            } else {
                componentDOM.appendChild(node);
            }
        });

        // add any queued nodes
        queuedNodes.forEach(function(item){
            node = document.createElement('div');
            node.setAttribute("id", "treeNode" + item.id);
            node.className = (item.root) ? "node root" : "node child"
            drawNodeContent(node, item);

            var parent = document.getElementById("treeNode" + item.parent);
            parent.classList.add("children");
            parent.getElementsByClassName("nodeContent")[0].appendChild(node);
        })
    }

    // Draw node content
    function drawNodeContent(node, nodeData) {
        var content = document.createElement('div');
        content.className = "nodeContent";

        drawNodeHeader(content, nodeData);
        node.appendChild(content);
    }

    // Add image to the node
    function drawNodeHeader(node, data) {
        var nodeHeader = document.createElement('div');
        nodeHeader.className = "nodeHeader";

        var nodeHeaderContent = document.createElement('div');
        nodeHeaderContent.className = "vertical-center";

        // draw thumbnail
        var image = document.createElement('img');
        image.src = data.thumbnail.href;
        image.className = "nodeImage";
        image.setAttribute("title", data.thumbnail.description);

        // draw title
        var title = document.createElement("span");
        title.innerText = data.name;

        // draw icon
        var icon = document.createElement('i');
        icon.className ="fas fa-caret-right";

        nodeHeaderContent.appendChild(image);
        nodeHeaderContent.appendChild(title);
        nodeHeaderContent.appendChild(icon);
        nodeHeader.appendChild(nodeHeaderContent);
        node.appendChild(nodeHeader);
    }

    function addClickListeners() {
        var nodes = document.getElementsByClassName("nodeHeader");

        // If this node has child elements, toggle the animation
        var clickFunction = function(e) {

            // get the parent node element
            var parent = this.parentNode.parentNode;

            // get the node's icon
            var icon = this.getElementsByTagName("i")[0];

            if(parent.classList.contains("children")) {
                // node is open so close it
                if(parent.classList.contains("open")) {
                    parent.classList.remove("open");
                    icon.classList.remove("fa-caret-down");
                    icon.classList.add("fa-caret-right");
                } else {
                    parent.classList.add("open");
                    icon.classList.remove("fa-caret-right");
                    icon.classList.add("fa-caret-down");
                }

                e.stopPropagation();
            }
        };

        
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].addEventListener('click', clickFunction, false);
        }
        
    }

    // public
    return {
        init: function(treeElement) {
            // Get a reference to our component's DOM
            componentDOM = document.getElementById(treeElement);

            formatData();
            drawComponentNodes();
            addClickListeners();
        }
    }

}());