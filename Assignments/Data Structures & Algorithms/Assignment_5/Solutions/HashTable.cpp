#include <iostream>
#include <vector>
#include <list>    // double linked list
#include <functional>
#include <algorithm>    // hashFunction
#include <stdexcept>

using namespace std;


// Table => Bucket => Element
template<class KeyType, class ValueType>
class MapEntry {
    KeyType Key;
    ValueType Value;
    public:
        // constructor
        MapEntry(KeyType _Key, ValueType _Value)
            : Key(_Key), Value(_Value) {}
        // getters
        KeyType GetKey() const { return Key; }
        ValueType GetValue() const { return Value; }
};


template<class KeyType, class ValueType>
class HashTable {
    vector<list<MapEntry<KeyType, ValueType>>> theLists;
    int currentSize;

    public:
        // ============ constructors ============
        explicit HashTable(int Size = 101): theLists(Size), currentSize(0) {}

        // ============ methods ============
        bool Contains(const KeyType& x) const {
            // search for the bucket that has the key
            // loop through the bucket (linked list)
                // if: key found => return true
            // not found => return false

            int bucketIndex = HashFunction(key);   // index of bucket
            auto &bucket = table[bucketIndex];
            for (auto itr = bucket.begin(); itr != bucket.end() ; itr++) {
                if (itr->GetKey() == key) return true;
            }
            return false;
        }

        bool Insert(const KeyType& X, const ValueType& Y) {
            // check if the key is already in the hash table => return false
            // find the index of the key that represents the bucket
            // find the bucket of that index
            // add the key-value pair to the bucket
            // currentSize++
            // return true
            
            if (Contains(X)) return false;
            int WhichList = MyHashFunction(X);
            theLists[WhichList].push_back(MapEntry<KeyType, ValueType>(X, Y));
            currentSize++;
            return true;
        }

        bool Remove(const KeyType& X) {
            // find the element that has the key
                // find the index of the bucket
                // find the bucket using its index
                // loop through the bucket (linked list)
                    // if the key is found
                        // remove the element
                        // currentSize--
                        // return true
                // not found => return false

            int WhichList = MyHashFunction(X);
            auto& bucket = theLists[WhichList];
            for (auto itr = bucket.begin(); itr != bucket.end(); ++itr) {
                if (itr->GetKey() == X) {
                    bucket.erase(itr);
                    currentSize--;
                    return true;
                }
            }
            return false;
        }

        void MakeEmpty() {
            // loop through all the buckets
                // clear the bucket
            // currentSize = 0

            for (auto& lst : theLists)
                lst.clear();
            currentSize = 0;
        }

        ValueType LookUP(const KeyType& key) const {
            // find the index of the bucket
            // find the bucket using its index
            // loop through the bucket (linked list)
                // if the key is found
                    // return the value
                // not found => throw exception


            int WhichList = MyHashFunction(key);
            const auto& bucket = theLists[WhichList];
            for (const auto& entry : bucket)
                if (entry.GetKey() == key)
                    return entry.GetValue();

            return ValueType();
        }

    protected:
        int MyHashFunction(const KeyType& x) const {
            // create a hash function (object of std::hash<KeyType>)
            // ensure its retrieved index won't go beyond the size of the hash table

            hash<KeyType> hashFunction;
            return hashFunction(x) % theLists.size();
        }
};




int main() {
    // Create HashTable<KeyType, ValueType>
    HashTable<int, string> ht;

    // Insert elements
    ht.Insert(1, "Ahmed");
    ht.Insert(2, "Ali");
    ht.Insert(3, "Sara");

    // Test Contains
    cout << "Contains key 2? "
        << (ht.Contains(2) ? "Yes" : "No") << endl;

    cout << "Contains key 5? "
        << (ht.Contains(5) ? "Yes" : "No") << endl;

    // Lookup values
    cout << "Value for key 1: " << ht.LookUP(1) << endl;
    cout << "Value for key 3: " << ht.LookUP(3) << endl;

    // Remove a key
    ht.Remove(2);
    cout << "After removing key 2, contains 2? "
        << (ht.Contains(2) ? "Yes" : "No") << endl;

    // Empty the table
    ht.MakeEmpty();
    cout << "After MakeEmpty, contains key 1? "
        << (ht.Contains(1) ? "Yes" : "No") << endl;

    return 0;
}