function HashTable(size) {
  this.buckets = Array(size);
  this.numBuckets = this.buckets.length;
}
// The contents of a position in the array is a key value pair and a pointer to the next pair, if there is one.
function HashNode(key, value, next) {
  this.key = key;
  this.value = value;
  this.next = next || null;
}
// Calculate a hash given an alphanumeric input
HashTable.prototype.hash = function (key) {
  var total = 0;
  for (var i = 0; i < key.length; i++) {
    total += key.charCodeAt(i);
  }
  var bucket = total % this.numBuckets;
  return bucket;
};
// Create a key value pair
HashTable.prototype.insert = function (key, value) {
  // Create has to determine which bucket (index) to receive node
  var index = this.hash(key);
  console.log("INDEX: ", index);
  // If the bucket is empty, assign the node to the bucket
  if (!this.buckets[index]) this.buckets[index] = new HashNode(key, value);
  // Check the first node in the bucket. Does it match the input key?
  else if (this.buckets[index].key === key) {
    this.buckets[index].value = value;
  }
  // Check all subsequent nodes in the bucket. Find the one that matches the key.
  else {
    // traverse the chain with the while loop, and add new node to end of the chain.
    var currentNode = this.buckets[index];
    // While there is a next node
    while (currentNode.next) {
      // We use 'next' to ensure we see the last node in the chain.
      // Check the next node to see person is there. If so, update the value.
      if (currentNode.next.key === key) {
        currentNode.next.value = value;
        return;
      }
      currentNode = currentNode.next;
    }
    currentNode.next = new HashNode(key, value);
  }
};
HashTable.prototype.get = function (key) {
  var index = this.hash(key);
  if (!this.buckets[index]) return "The directory is empty.";
  else {
    var currentNode = this.buckets[index];
    while (currentNode) {
      if (currentNode.key === key) return currentNode.value;
      currentNode = currentNode.next;
    }
    return "No such person is on file.";
  }
};
// Print all buckets and nodes
HashTable.prototype.printAll = function () {
  var allNodes = [];
  for (var i = 0; i < this.numBuckets; i++) {
    // Start with the first bucket
    var currentNode = this.buckets[i];
    // Successively push all buckets and nodes to the array
    while (currentNode) {
      allNodes.push(currentNode);
      currentNode = currentNode.next;
    }
  }
  return allNodes;
};
var myHT = new HashTable(30);
myHT.insert("Dean", "dean@gmail.com");
myHT.insert("Megan", "megan@gmail.com");
myHT.insert("Dane", "dane@yahoo.com");
myHT.insert("Dean", "deanmachine@gmail.com");
myHT.insert("Megan", "maygain@gmail.com");
myHT.insert("Dane", "dane1010@outlook.com");
// console.log(myHT.buckets);
// console.log("The record is: ", myHT.get("Megan"));
// Performance is O(1) constant time lookup and insertion.
// Use these to store anything that needs to be looked up immediately.
// Pros: fast | Cons: don't reference any other data unless you add that property.
console.log(myHT.printAll());
