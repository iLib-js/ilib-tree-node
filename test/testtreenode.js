/*
 * testtreenode.js - test the TreeNode object
 *
 * Copyright © 2019, 2021 JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Node from "../TreeNode.js";

module.exports.testTreeNode = {
    testNodeConstructor: function(test) {
        test.expect(2);

        // default type
        let node = new Node();
        test.ok(node);
        test.equal(node.children.length, 0);

        test.done();
    },

    testNodeConstructorDefaultType: function(test) {
        test.expect(4);

        // default type
        let node = new Node();
        test.ok(node);
        test.equal(node.type, "text");
        test.ok(!node.value);
        test.equal(node.children.length, 0);

        test.done();
    },

    testNodeConstructorCopyAllProperties: function(test) {
        test.expect(6);

        let node = new Node({
            type: "text",
            value: "foo",
            index: 5,
            isRoot: false
        });
        test.ok(node);
        test.equal(node.children.length, 0);
        test.equal(node.type, "text");
        test.equal(node.value, "foo");
        test.equal(node.index, 5);
        test.equal(node.isRoot, false);

        test.done();
    },

    testNodeConstructorDontCopyUndefinedProperties: function(test) {
        test.expect(5);

        let node = new Node({
            type: "text",
            value: "foo",
            index: undefined
        });
        test.ok(node);
        test.equal(node.children.length, 0);
        test.equal(node.type, "text");
        test.equal(node.value, "foo");
        test.equal(typeof(node.index), 'undefined');

        test.done();
    },

    testNodeConstructorDontCopyNullProperties: function(test) {
        test.expect(5);

        let node = new Node({
            type: "text",
            value: "foo",
            isRoot: null
        });
        test.ok(node);
        test.equal(node.children.length, 0);
        test.equal(node.type, "text");
        test.equal(node.value, "foo");
        test.equal(node.isRoot, null);

        test.done();
    },

    testNodeConstructorRejectChildren: function(test) {
        test.expect(3);

        let node = new Node({
            type: "text",
            children: [new Node({type: "a"})]
        });

        test.ok(node);
        test.equal(node.children.length, 0);
        test.equal(node.type, "text");

        test.done();
    },

    testNodeAddHasChildren: function(test) {
        test.expect(3);

        let node = new Node({
            type: "text",
            value: "foo"
        });
        test.ok(node);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.add(node);

        test.ok(parent.children);

        test.done();
    },

    testNodeAddRightNumberOfChildren: function(test) {
        test.expect(2);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.add(new Node({
            type: "text",
            value: "foo"
        }));

        test.equal(parent.children.length, 1);

        test.done();
    },

    testNodeAddRightNumberOfChildrenMultiple: function(test) {
        test.expect(3);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.add(new Node({
            type: "text",
            value: "foo"
        }));

        test.equal(parent.children.length, 1);

        parent.add(new Node({
            type: "text",
            value: "bar"
        }));

        test.equal(parent.children.length, 2);

        test.done();
    },

    testNodeAddRightChildren: function(test) {
        test.expect(6);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.add(new Node({
            type: "text",
            value: "foo"
        }));

        parent.add(new Node({
            type: "text",
            value: "bar"
        }));

        test.equal(parent.children.length, 2);

        test.equal(parent.children[0].type, "text");
        test.equal(parent.children[0].value, "foo");

        test.equal(parent.children[1].type, "text");
        test.equal(parent.children[1].value, "bar");

        test.done();
    },

    testNodeAddRightNumberOfChildrenArray: function(test) {
        test.expect(2);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.addChildren([
            new Node({
                type: "text",
                value: "foo"
            }),
            new Node({
                type: "text",
                value: "bar"
            })
        ]);

        test.equal(parent.children.length, 2);

        test.done();
    },

    testNodeAddArrayRightChildren: function(test) {
        test.expect(6);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.addChildren([
            new Node({
                type: "text",
                value: "foo"
            }),
            new Node({
                type: "text",
                value: "bar"
            })
        ]);

        test.equal(parent.children.length, 2);

        test.equal(parent.children[0].type, "text");
        test.equal(parent.children[0].value, "foo");

        test.equal(parent.children[1].type, "text");
        test.equal(parent.children[1].value, "bar");

        test.done();
    },

    testNodeAddArraysMultiple: function(test) {
        test.expect(12);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.addChildren([
            new Node({
                type: "text",
                value: "foo"
            }),
            new Node({
                type: "text",
                value: "bar"
            })
        ]);

        parent.addChildren([
            new Node({
                type: "text",
                value: "asdf"
            }),
            new Node({
                type: "text",
                value: "rach"
            }),
            new Node({
                type: "text",
                value: "blort"
            })
        ]);

        test.equal(parent.children.length, 5);

        test.equal(parent.children[0].type, "text");
        test.equal(parent.children[0].value, "foo");

        test.equal(parent.children[1].type, "text");
        test.equal(parent.children[1].value, "bar");

        test.equal(parent.children[2].type, "text");
        test.equal(parent.children[2].value, "asdf");

        test.equal(parent.children[3].type, "text");
        test.equal(parent.children[3].value, "rach");

        test.equal(parent.children[4].type, "text");
        test.equal(parent.children[4].value, "blort");

        test.done();
    },

    testNodeAddRejectNonNode: function(test) {
        test.expect(3);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.add(new Node({
            type: "text",
            value: "foo"
        }));

        test.equal(parent.children.length, 1);

        // not a Node instance
        parent.add({
            type: "text",
            value: "foo"
        });

        test.equal(parent.children.length, 1);

        test.done();
    },

    testNodeAddArrayNonArray: function(test) {
        test.expect(2);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        // should not add nodes that are not in an array
        parent.addChildren(new Node({
            type: "text",
            value: "foo"
        }));

        test.equal(parent.children.length, 0);

        test.done();
    },

    testNodeAddArrayRejectNonNodes: function(test) {
        test.expect(2);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.addChildren([
            new Node({
                type: "text",
                value: "foo"
            }),
            {
                type: "text",
                value: "bar"
            }
        ]);

        test.equal(parent.children.length, 0);

        test.done();
    },

    testNodeAddUndefined: function(test) {
        test.expect(3);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.add(new Node({
            type: "text",
            value: "foo"
        }));

        test.equal(parent.children.length, 1);

        // not a Node instance
        parent.add();

        test.equal(parent.children.length, 1);

        test.done();
    },

    testNodeAddNull: function(test) {
        test.expect(3);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.add(new Node({
            type: "text",
            value: "foo"
        }));

        test.equal(parent.children.length, 1);

        // not a Node instance
        parent.add(null);

        test.equal(parent.children.length, 1);

        test.done();
    },

    testNodeAddIntrinsic: function(test) {
        test.expect(3);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.add(new Node({
            type: "text",
            value: "foo"
        }));

        test.equal(parent.children.length, 1);

        // not a Node instance
        parent.add(5);
        parent.add("foo");
        parent.add(true);

        test.equal(parent.children.length, 1);

        test.done();
    },

    testNodeAddChildrenEmpty: function(test) {
        test.expect(3);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.add(new Node({
            type: "text",
            value: "foo"
        }));

        test.equal(parent.children.length, 1);

        // not an array of Node instances
        parent.addChildren([]);

        test.equal(parent.children.length, 1);

        test.done();
    },

    testNodeAddChildrenUndefined: function(test) {
        test.expect(3);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.add(new Node({
            type: "text",
            value: "foo"
        }));

        test.equal(parent.children.length, 1);

        // not an array of Node instances
        parent.addChildren([undefined, undefined]);

        test.equal(parent.children.length, 1);

        test.done();
    },

    testNodeAddChildrenNull: function(test) {
        test.expect(3);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.add(new Node({
            type: "text",
            value: "foo"
        }));

        test.equal(parent.children.length, 1);

        // not an array of Node instances
        parent.addChildren([null, null]);

        test.equal(parent.children.length, 1);

        test.done();
    },

    testNodeAddIntrinsic: function(test) {
        test.expect(3);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.add(new Node({
            type: "text",
            value: "foo"
        }));

        test.equal(parent.children.length, 1);

        // not an array of Node instances
        parent.addChildren([5]);
        parent.addChildren(["foo"]);
        parent.addChildren([true]);

        test.equal(parent.children.length, 1);

        test.done();
    },

    testNodeToArraySimpleRightLength: function(test) {
        test.expect(4);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.add(new Node({
            type: "text",
            value: "foo"
        }));

        parent.add(new Node({
            type: "text",
            value: "bar"
        }));

        test.equal(parent.children.length, 2);

        let array = parent.toArray();

        test.ok(array);
        test.equal(array.length, 4);

        test.done();
    },

    testNodeToArraySimpleRightContents: function(test) {
        test.expect(11);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.add(new Node({
            type: "text",
            value: "foo"
        }));

        parent.add(new Node({
            type: "text",
            value: "bar"
        }));

        test.equal(parent.children.length, 2);

        let array = parent.toArray();

        test.ok(array);

        test.equal(array[0].type, "parent");
        test.equal(array[0].use, "start");

        test.equal(array[1].type, "text");
        test.equal(array[1].value, "foo");

        test.equal(array[2].type, "text");
        test.equal(array[2].value, "bar");

        test.equal(array[3].type, "parent");
        test.equal(array[3].use, "end");

        test.done();
    },

    testNodeToArrayEmptyComponents: function(test) {
        test.expect(10);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        parent.add(new Node({
            type: "component",
            extra: {name: "A"}
        }));

        test.equal(parent.children.length, 1);

        let array = parent.toArray();

        test.ok(array);

        test.equal(array[0].type, "parent");
        test.equal(array[0].use, "start");

        test.equal(array[1].type, "component");
        test.deepEqual(array[1].extra, {name: "A"});
        test.equal(array[1].use, "startend");

        test.equal(array[2].type, "parent");
        test.equal(array[2].use, "end");

        test.done();
    },

    testNodeToArrayDegenerate: function(test) {
        test.expect(5);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        let array = parent.toArray();

        test.ok(array);
        test.equal(array.length, 1);

        test.equal(array[0].type, "parent");
        test.equal(array[0].use, "startend");

        test.done();
    },

    testNodeToArrayMultiLevelRightLength: function(test) {
        test.expect(4);

        let parent = new Node({
            type: "parent"
        });
        test.equal(parent.children.length, 0);

        let child = new Node({
            type: "text",
            value: "foo"
        });

        child.add(new Node({
            type: "text",
            value: "asdf"
        }));

        parent.add(child);

        child = new Node({
            type: "text",
            value: "bar"
        });

        child.add(new Node({
            type: "text",
            value: "blah"
        }));

        parent.add(child);

        test.equal(parent.children.length, 2);

        let array = parent.toArray();

        test.ok(array);

        test.equal(array.length, 8);

        test.done();
    },

    testNodeToArrayMultiLevelRightContents: function(test) {
        test.expect(24);

        let parent = new Node({
            type: "parent"
        });

        let child = new Node({
            type: "text",
            value: "foo"
        });

        child.add(new Node({
            type: "text",
            value: "asdf"
        }));

        parent.add(child);

        child = new Node({
            type: "text",
            value: "bar"
        });

        child.add(new Node({
            type: "text",
            value: "blah"
        }));

        parent.add(child);

        test.equal(parent.children.length, 2);

        let array = parent.toArray();

        test.ok(array);

        test.equal(array[0].type, "parent");
        test.equal(array[0].use, "start");

        test.equal(array[1].type, "text");
        test.equal(array[1].value, "foo");
        test.equal(array[1].use, "start");

        test.equal(array[2].type, "text");
        test.equal(array[2].value, "asdf");
        test.ok(!array[2].use);

        test.equal(array[3].type, "text");
        test.equal(array[3].value, "foo");
        test.equal(array[3].use, "end");

        test.equal(array[4].type, "text");
        test.equal(array[4].value, "bar");
        test.equal(array[4].use, "start");

        test.equal(array[5].type, "text");
        test.equal(array[5].value, "blah");
        test.ok(!array[5].use);

        test.equal(array[6].type, "text");
        test.equal(array[6].value, "bar");
        test.equal(array[6].use, "end");

        test.equal(array[7].type, "parent");
        test.equal(array[7].use, "end");

        test.done();
    },

    testNodeFromArrayRightNumberOfChildren: function(test) {
        test.expect(3);

        let array = [];
        array.push(new Node({
            type: "parent",
            use: "start"
        }));
        array.push(new Node({
            type: "text",
            value: "foo"
        }));
        array.push(new Node({
            type: "text",
            value: "bar"
        }));
        array.push(new Node({
            type: "parent",
            use: "end"
        }));

        let node = Node.fromArray(array);

        test.ok(node);
        test.ok(node.children);
        test.equal(node.children.length, 2);

        test.done();
    },

    testNodeFromArrayRightChildren: function(test) {
        test.expect(6);

        let array = [];
        array.push(new Node({
            type: "parent",
            use: "start"
        }));
        array.push(new Node({
            type: "text",
            value: "foo"
        }));
        array.push(new Node({
            type: "text",
            value: "bar"
        }));
        array.push(new Node({
            type: "parent",
            use: "end"
        }));

        let node = Node.fromArray(array);

        test.ok(node);
        test.ok(node.children);

        test.equal(node.children[0].type, "text");
        test.equal(node.children[0].value, "foo");

        test.equal(node.children[1].type, "text");
        test.equal(node.children[1].value, "bar");

        test.done();
    },

    testNodeFromArrayMultiLevelRightContents: function(test) {
        test.expect(24);

        let array = [];
        array.push(new Node({
            type: "parent",
            use: "start"
        }));
        array.push(new Node({
            type: "text",
            value: "foo",
            use: "start"
        }));
        array.push(new Node({
            type: "text",
            value: "asdf"
        }));
        array.push(new Node({
            type: "text",
            value: "foo",
            use: "end"
        }));
        array.push(new Node({
            type: "text",
            value: "bar",
            use: "start"
        }));
        array.push(new Node({
            type: "text",
            value: "blah"
        }));
        array.push(new Node({
            type: "text",
            value: "bar",
            use: "end"
        }));
        array.push(new Node({
            type: "parent",
            use: "end"
        }));

        test.equal(array.length, 8);

        var node = Node.fromArray(array);

        test.ok(node);
        test.ok(node.children);
        test.equal(node.children.length, 2);
        test.equal(node.type, "parent");
        test.ok(!node.use);

        let child = node.children[0];

        test.equal(child.type, "text");
        test.equal(child.value, "foo");
        test.ok(child.children);
        test.equal(child.children.length, 1);
        test.ok(!child.use);

        let grandchild = child.children[0];

        test.equal(grandchild.type, "text");
        test.equal(grandchild.value, "asdf");
        test.equal(grandchild.children.length, 0);
        test.ok(!grandchild.use);

        child = node.children[1];

        test.equal(child.type, "text");
        test.equal(child.value, "bar");
        test.ok(child.children);
        test.equal(child.children.length, 1);
        test.ok(!child.use);

        grandchild = child.children[0];

        test.equal(grandchild.type, "text");
        test.equal(grandchild.value, "blah");
        test.equal(grandchild.children.length, 0);
        test.ok(!grandchild.use);

        test.done();
    },

    testNodeFromArraySelfClosing: function(test) {
        test.expect(6);

        let array = [];
        array.push(new Node({
            type: "parent",
            use: "start"
        }));
        array.push(new Node({
            type: "component",
            extra: {name: "A"},
            use: "startend"
        }));
        array.push(new Node({
            type: "parent",
            use: "end"
        }));

        let node = Node.fromArray(array);

        test.ok(node);
        test.ok(node.children);
        test.equal(node.children.length, 1);

        test.ok(node.children[0]);
        test.ok(node.children[0].children);
        test.equal(node.children[0].children.length, 0);

        test.done();
    },

    testNodeFromArrayDegenerate: function(test) {
        test.expect(4);

        let array = [new Node({
            type: "parent"
        })];

        test.equal(array.length, 1);

        var node = Node.fromArray(array);

        test.ok(node);
        test.equal(node.children.length, 0);
        test.equal(node.type, "parent");

        test.done();
    },

    testNodeFromArrayRejectUndefined: function(test) {
        test.expect(1);

        var node = Node.fromArray();

        test.ok(!node);

        test.done();
    },

    testNodeFromArrayRejectNullArray: function(test) {
        test.expect(1);

        var node = Node.fromArray(null);

        test.ok(!node);

        test.done();
    },

    testNodeFromArrayRejectNullValue: function(test) {
        test.expect(2);

        let array = [null];

        test.equal(array.length, 1);

        var node = Node.fromArray(array);

        test.ok(!node);

        test.done();
    },

    testNodeFromArrayRejectIntrinsicArray: function(test) {
        test.expect(1);

        var node = Node.fromArray(5);

        test.ok(!node);

        test.done();
    },

    testNodeFromArrayRejectIntrinsicValues: function(test) {
        test.expect(2);

        let array = [5, "array", true];

        test.equal(array.length, 3);

        var node = Node.fromArray(array);

        test.ok(!node);

        test.done();
    },

    testNodeFromArrayRejectEmpty: function(test) {
        test.expect(2);

        let array = [];

        test.equal(array.length, 0);

        var node = Node.fromArray(array);

        test.ok(!node);

        test.done();
    },

    testNodeFromArrayRejectNonNodes: function(test) {
        test.expect(2);

        let array = [{
            type: "foo",
            value: "bar"
        }];

        test.equal(array.length, 1);

        var node = Node.fromArray(array);

        test.ok(!node);

        test.done();
    },

    testNodeFromArrayNonTree: function(test) {
        test.expect(14);

        let array = [];
        array.push(new Node({
            type: "text",
            value: "foobar"
        }));
        array.push(new Node({
            type: "component",
            use: "start",
            extra: {
                name: "X"
            }
        }));
        array.push(new Node({
            type: "component",
            extra: {name: "A"},
            use: "startend"
        }));
        array.push(new Node({
            type: "component",
            use: "end"
        }));
        array.push(new Node({
            type: "text",
            value: "asdf asdf"
        }));

        let node = Node.fromArray(array);

        // should get an automatic root node and the
        // nodes above should be its children
        test.ok(node);

        test.equal(node.type, "root");
        test.ok(node.children);
        test.equal(node.children.length, 3);

        test.ok(node.children[0]);
        test.equal(node.children[0].type, "text");
        test.equal(node.children[0].value, "foobar");

        test.ok(node.children[1]);
        test.equal(node.children[1].type, "component");
        test.deepEqual(node.children[1].extra, {name: "X"});
        test.equal(node.children[1].children.length, 1);

        test.ok(node.children[2]);
        test.equal(node.children[2].type, "text");
        test.equal(node.children[2].value, "asdf asdf");

        test.done();
    },

    testNodeFromArrayNotWellFormed: function(test) {
        test.expect(12);

        let array = [];
        array.push(new Node({
            type: "text",
            value: "asdf",
        }));
        array.push(new Node({
            type: "parent",
            use: "start"
        }));
        array.push(new Node({
            type: "text",
            value: "bar",
        }));
        array.push(new Node({
            type: "parent",
            use: "end"
        }));
        // this one is an end without a start:
        array.push(new Node({
            type: "parent",
            use: "end"
        }));
        // this one should not cause an exception
        array.push(new Node({
            type: "text",
            value: "foo",
        }));

        let node = Node.fromArray(array);

        test.ok(node);

        test.equal(node.type, "root");
        test.ok(node.children);
        test.equal(node.children.length, 3);

        test.ok(node.children[0]);
        test.equal(node.children[0].type, "text");
        test.equal(node.children[0].value, "asdf");

        test.ok(node.children[1]);
        test.equal(node.children[1].type, "parent");

        test.ok(node.children[2]);
        test.equal(node.children[2].type, "text");
        test.equal(node.children[2].value, "foo");

        test.done();
    }
};