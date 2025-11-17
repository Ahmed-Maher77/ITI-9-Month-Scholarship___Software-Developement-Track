# 📘 OOP Assignments — Solutions Collection  
A complete set of OOP assignments implemented in multiple versions to demonstrate raw pointers, vectors, dynamic memory, copy constructors, composition, and object-oriented design.

Each assignment contains several versions showing how the same problem evolves from basic to advanced C++ concepts.

---

# 🟦 Assignment 1 — Library & Books

### ✅ **v1 — Using Raw Pointers**  
- Author stored using a *raw pointer*  
- Library stores books in *raw dynamic arrays*  
- Full manual memory management (`new` / `delete`)  
📄 File: `solutions/Assignment_1_v1_raw_pointers.cpp`

---

### ✅ **v2 — Using `vector<Book>`**  
- Replaces raw arrays with `std::vector<Book>`  
- Safe, modern C++ memory handling  
📄 File: `solutions/Assignment_1_v2_vector.cpp`

---

### ✅ **v3 — Static Author + Dynamic Books**  
- Author is a static object  
- Books stored dynamically  
- Library stores raw pointers  
📄 File: `solutions/Assignment_1_v3_static_author_dynamic_books.cpp`

---

### ✅ **v4 — Vector + Copy Constructor + Assignment Operator**  
- Library stores books in `vector<Book>`  
- Implements:
  - Custom copy constructor  
  - Custom copy assignment operator  
📄 File: `solutions/Assignment_1_v4_vector_copy_constructor.cpp`

---

# 🟩 Assignment 2 — Shapes & Picture (SimpleGraphics)

### ✅ **v1 — Static Objects Only**  
- Circle, Rect, Picture created as normal (non-dynamic) objects  
- No pointers  
📄 File: `solutions/Assignment_2_v1_static_objects.cpp`

---

### ✅ **v2 — Dynamic Arrays (Raw Pointers)**  
- User enters number of shapes  
- Picture stores arrays of `Circle*`, `Rect*`  
- Uses raw dynamic memory  
📄 File: `solutions/Assignment_2_v2_dynamic_arrays.cpp`

---

### ✅ **v3 — Copy Constructor Version**  
- Deep copy of picture (circles + rectangles)  
- Follows *Rule of Three*  
📄 File: `solutions/Assignment_2_v3_copy_constructor.cpp`

---

### ✅ **v4 — Add Ellipse Class + Draw Ellipse**  
- Implements new Ellipse shape  
- Integrates with Picture class  
- Demonstrates polymorphic extension  
📄 File: `solutions/Assignment_2_v4_add_ellipse.cpp`

---

# 📂 Helper Files

All helper files related to **SimpleGraphics.h** (including the ASCII drawing helpers and internal utilities)  
are located inside the: `helpers/`

These files are required to run Assignment 2.  
You do **not** need to modify them — just include them in your project.

---

# 📌 Notes
- Every version is independent and demonstrates a specific C++ concept.  
- Assignment 2 requires the SimpleGraphics helper files (included in the repository under `helpers/`).  
- Proper memory management is demonstrated using raw pointers, vectors, and copy semantics.
