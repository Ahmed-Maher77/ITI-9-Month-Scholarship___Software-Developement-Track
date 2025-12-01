# 🎓 Computer Networks — ITI 9-Month Journey  
## Lesson 6: ARP, VLANs & TCP/IP Layers Explained

In this lesson, we explored three fundamental networking concepts that form the backbone of modern communication: **ARP**, **VLANs**, and the **TCP/IP Model**. These topics are essential for understanding how networks identify devices, segment traffic, and deliver data efficiently.

---

## 🔹 1. ARP (Address Resolution Protocol)

**ARP** is used to map a known **IP address** to its corresponding **MAC address** within a local network (LAN).

### 🔍 How ARP Works — Real-World Example  
When **PC1** wants to communicate with **PC2** in the same LAN, it only knows PC2’s **IP address**.

Steps:

1. **PC1 broadcasts an ARP Request:**  
   _“Who has 192.168.1.20? Tell 192.168.1.10.”_

2. **PC2 replies with an ARP Reply** containing its MAC address.

3. **PC1 stores the mapping** in its ARP cache for faster future communication.

### 🖥️ Useful ARP Commands
```bash
arp -a   # View ARP cache  
arp -d   # Delete ARP entries
```

---

## 🔹 2. VLAN (Virtual Local Area Network)

A **VLAN** allows you to segment a single physical network into multiple logical networks.

### 🔸 Why VLANs Are Important
- ✔️ Improve network performance  
- ✔️ Enhance security  
- ✔️ Reduce broadcast traffic  
- ✔️ Enable network flexibility without additional hardware  

### 📘 Real-World Example  
A company may configure VLANs like this:

- **VLAN 10 → HR**  
- **VLAN 20 → IT**  
- **VLAN 30 → Finance**

Even though all users are connected to the same physical switch, VLANs isolate these departments as if they were separate networks.

---

## 🔹 3. TCP/IP Layers — The Core Architecture of the Internet

The **TCP/IP Model** consists of 4 essential layers:

1. **Application Layer** – HTTP, DNS, FTP  
2. **Transport Layer** – TCP, UDP  
3. **Internet Layer** – IP, ICMP  
4. **Network Access Layer** – Ethernet, MAC, physical transmission  

### 💡 Why TCP/IP Still Dominates
- Scalable  
- Reliable  
- Flexible  
- Designed for real-world networking needs  

### 📱 Example  
Opening **Facebook** and **YouTube** at the same time uses different port numbers — a Transport Layer capability that enables multiple simultaneous sessions.

---

## ⭐ Key Takeaways

- 🔸 **ARP** maps IP → MAC for device communication within a LAN  
- 🔸 **VLANs** logically segment networks for better performance and security  
- 🔸 **TCP/IP** forms the foundation of internet communication  
- 🔸 These concepts are essential for troubleshooting, design, and network engineering  

---

## 🙏 Special Thanks  
**[Eng. Hager Taha](https://www.linkedin.com/in/hager-taha-moustafa/)** — for her insightful explanations and hands-on teaching.  
**[Information Technology Institute (ITI)](https://www.linkedin.com/school/information-technology-institute-iti-/)** — for delivering a high-quality learning experience.

