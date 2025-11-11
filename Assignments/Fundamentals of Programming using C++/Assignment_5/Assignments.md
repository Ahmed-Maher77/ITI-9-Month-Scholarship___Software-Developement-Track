# 🧠 C++ Assignments Collection

A collection of **C++ assignments** demonstrating key programming concepts such as **pointers, references, dynamic memory allocation, terminal I/O handling, and smart pointers**.  
Each assignment includes clean, well-documented code and can be compiled independently.

---

## 📂 Folder Structure

| Folder | Description |
|--------|--------------|
| **Assignment1_SwapIntegers** | Swap two integers by address and by reference |
| **Assignment2_ArrayIO_Pointers** | Input and output array elements using pointers |
| **Assignment3_LineEditor** | Line editor using terminal control and raw mode |
| **Assignment4_EmployeeMenu_ModernPointers** | Employee form with dynamic allocation and smart pointers |
| **Assignment5_LineEditor_Dynamic** | Dynamic line editor using raw pointers |
| **Assignment6_PointerToPointer** | Examples of pointer-to-pointer using raw and modern pointers |

---

## 🛠️ Compilation & Execution

Each assignment can be compiled using any C++ compiler such as `g++`:

```bash
g++ main.cpp -o app
./app
```

Or, for Windows (MinGW):

```bash
g++ main.cpp -o app.exe
app.exe
```

---

## 💡 Concepts Covered

- Call by reference and call by address
- Pointer arithmetic
- Raw and smart pointers (`unique_ptr`)
- Dynamic memory allocation (`new` / `delete`)
- Terminal manipulation using `termios`
- Simple menu-driven programs
- Pointer to pointer (`int**` and `unique_ptr<unique_ptr<T[]>>`)
