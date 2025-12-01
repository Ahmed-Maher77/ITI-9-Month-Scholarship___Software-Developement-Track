# 🎓 Computer Networks — ITI 9-Month Journey  
## Lesson 8: Routing Fundamentals, Static Routes & Default Gateways

In today’s lesson, we explored how data travels across networks and the mechanisms that make communication possible between different subnets, LANs, and remote networks. Understanding routing is essential for designing scalable, secure, and well-structured network topologies.

---

## 🔹 1. What Is Routing?

Routing is the process of selecting the **best path** for data to travel from one network to another.  
A router analyzes **destination IP addresses** and forwards packets based on its **routing table**.

Routing is needed when:  
✔️ Devices are on different networks  
✔️ Communication must pass through multiple hops  
✔️ Internet connectivity is required  

---

## 🔹 2. Default Gateway — Your Door to the Outside Network

A **Default Gateway** is the router IP address used when a device wants to communicate **outside its local network**.

**Example:**  
- **PC IP:** 192.168.1.10  
- **Mask:** 255.255.255.0  
- **Gateway:** 192.168.1.1  

If the destination is **not in 192.168.1.x**, the packet is sent to the default gateway (192.168.1.1).

👉 **Default Gateway = First Router Hop**

---

## 🔹 3. The Routing Table

Every router (and every PC) maintains a **routing table** containing:

| Field | Meaning |
|-------|---------|
| 🌐 **Network** | The destination network/subnet ID the packet is trying to reach |
| 🎭 **Mask** | Subnet mask that identifies the size of the destination network |
| ↷ **Next Hop** | The IP address of the next router the packet should go to |
| 🔌 **Interface** | The outgoing port (physical/logical) used to send the packet |
| 💰 **Metric** | The “cost” of the route — lower metric = preferred path |

**View PC routing table:**  
```bash
route print
```

---

## 🔹 4. Static Routing (Manual Routing)

Static routing means routes are **manually configured** by the network engineer.

### 📌 Example Scenario  
A company has two networks:  
- **192.168.1.0/24**  
- **192.168.2.0/24**

Router1 must reach **192.168.2.0** through Router2.

### 🖥️ Static Route Command (Windows)
```bash
route add 192.168.2.0 mask 255.255.255.0 192.168.1.2
```

---

### ✔️ When to Use Static Routes  
- Small, stable networks  
- Security-focused environments  
- Backup / failover routes  
- Point-to-point connections  

---

### ⭐ Benefits  
- Predictable behavior  
- No routing overhead  
- Full manual control over traffic flow  

---

### ⚠️ Limitations  
- Not scalable for large or frequently changing networks  
- Requires manual configuration and updates  
- Higher risk of human error  

---

## 🔹 5. Routing Decision Process

Routers use a structured process to decide how to forward packets:

1️⃣ **Check directly connected networks**  
2️⃣ **Check static routes**  
3️⃣ **Check dynamic routes**  
4️⃣ If no matching route → **drop the packet** or **use the default route**  

---

## 🔹 6. Real-World Example: Internet Access

When you open **Google.com**:

✔️ Your PC checks its **routing table**  
✔️ Traffic is sent to the **default gateway**  
✔️ The gateway forwards it to your **ISP**  
✔️ ISP routers use global routing tables to reach **Google’s servers**  

This demonstrates routing from your **local network** to the **global Internet**.

---

## ⭐ Key Takeaways

- Routing enables communication **between different networks**  
- The **default gateway** handles traffic leaving your LAN  
- Routing tables store **paths to all known networks**  
- Static routes are **simple, secure, and predictable**  
- Understanding routing logic is key for **network design and troubleshooting**  

---

## 🙏 Special Thanks  

A sincere appreciation to our instructor **[Eng. Hager Taha](https://www.linkedin.com/in/hager-taha-moustafa/)** for her exceptional guidance, clear explanations, and dedication throughout the learning journey.

Grateful acknowledgment to the **[Information Technology Institute (ITI)](https://www.linkedin.com/school/information-technology-institute-iti-/)** for providing high-quality training and a supportive environment that empowers learners to build strong technical foundations.

---

## 🏷️ Hashtags  
#ITI #ComputerNetworks #NetworkingBasics #Routing #StaticRouting #DefaultGateway  
#RoutingTable #NetworkDesign #NetworkEngineering #LAN #Subnetting #InternetAccess  
#NetworkSecurity #TechLearning #ITJourney #AhmedMaher #NetworkFundamentals  
#RoutingProtocols #NetworkTroubleshooting #CyberSecurity #ITInfrastructure
