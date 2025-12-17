// Priority Queue => implementation as: Min Binary Heap

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

template<typename T>
class BinaryHeap {
private:
    vector<T> arr;  // Underlying array to store heap elements

    // ================== Helper Functions ==================
    int parent(int i) { 
        return (i - 1) / 2; 
    }
    int left(int i) { 
        return 2 * i + 1; 
    }
    int right(int i) {
        return 2 * i + 2; 
    }

public:
    // ================== Constructors ==================
    BinaryHeap() = default;  // Default constructor

    // Copy constructor
    BinaryHeap(const BinaryHeap &other) {
        arr = other.arr;
    }

    // Operator [] overloading for easy access
    T& operator[](int index) {
        return arr[index];
    }

    // ================== Heap Operations ==================
    void heapifyUp(int index) {
        while (index > 0 && arr[index] < arr[parent(index)]) {
            swap(arr[index], arr[parent(index)]);
            index = parent(index);
        }
    }

    void heapifyDown(int index) {
        int smallest = index;
        int l = left(index);
        int r = right(index);

        if (l < arr.size() && arr[l] < arr[smallest])
            smallest = l;

        if (r < arr.size() && arr[r] < arr[smallest])
            smallest = r;

        if (smallest != index) {
            swap(arr[index], arr[smallest]);
            heapifyDown(smallest);
        }
    }

    void insert(T ele) {
        // Add new element to the heap and restore heap property
        arr.push_back(ele);
        heapifyUp(arr.size() - 1);
    }

    void removeMin() {
        if (isEmpty()) {
            cout << "Heap is empty" << endl;
            return;
        }

        // Replace root with last element and heapify down
        arr[0] = arr.back();
        arr.pop_back();

        if (!arr.empty()) {
            heapifyDown(0);
        }
    }

    void removeFrom(int index) {
        if (index < 0 || index >= arr.size()) {
            cout << "Invalid index" << endl;
            return;
        }

        // Replace element with last and remove last
        arr[index] = arr.back();
        arr.pop_back();

        if (index < arr.size()) {
            // Restore heap property
            if (index > 0 && arr[index] < arr[parent(index)]) {
                heapifyUp(index);
            } else {
                heapifyDown(index);
            }
        }
    }

    T getMin() const {
        if (isEmpty()) {
            cout << "Heap is empty" << endl;
            return T{};
        }
        return arr[0];
    }

    int getSize() const {
        return arr.size();
    }

    void viewHeap() const {
        for (auto x : arr)
            cout << x << " ";
        cout << endl;
    }

    bool isEmpty() const {
        return arr.empty();
    }
};

// ================== Main Function ==================
int main() {
    BinaryHeap<int> heap;

    // Insert elements
    heap.insert(40);
    heap.insert(10);
    heap.insert(30);
    heap.insert(5);
    heap.insert(20);

    cout << "Heap elements: ";
    heap.viewHeap();

    cout << "Top element: " << heap.getMin() << endl;

    // Remove min element
    heap.removeMin();
    cout << "After removeMin(): ";
    heap.viewHeap();

    // Remove element at index 1
    heap.removeFrom(1);
    cout << "After removeFrom(1): ";
    heap.viewHeap();

    return 0;
}
