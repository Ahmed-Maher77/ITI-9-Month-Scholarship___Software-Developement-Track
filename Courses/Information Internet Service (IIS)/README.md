# IIS (Information Internet Service)

## Internet

The global network that consists of a huge number of devices connected to each other around the world, allowing them to communicate and share data and resources.

## Web

One of the services that can be accessed through the internet.
Examples:

- File storage
- Electronic mail
- Accessing websites

## Network Architectures

- Client-server
- Peer-to-peer

## Server

A powerful computer connected to the internet that works 24/7 and provides services to clients through installed OS/software.
It receives requests, processes them, then sends responses.

## Protocols

Rules and guidelines that define how devices communicate and share resources with each other.

## How Desktop Apps Receive Update Notifications

Any application we install opens a port on the computer to listen for requests from a website/server.

## URL vs URI

- **URL**: The location of a resource and the method to access it.
    - Analogy: Person's address + directions
    - Example: `https://api.com/users/1`
- **URI**: A resource identifier.
    - Analogy: Person's name
    - Example: `/users/1`

## How to Convert Your PC into a Server That Hosts a Website (Using IIS)

> IIS can deal with about 20 concurrent users.

1. Open:
    - Control Panel -> Programs -> Turn Windows features on or off
    - Internet Information Services (IIS)
    - Select: **World Wide Web Services** and **Web Management Tools**
    - Click **OK**

2. Open browser and go to:
    - `http://localhost`
    - You should see the default IIS page.

3. Press `Windows + R`, type `inetmgr`, and open IIS Manager.
    - Click **Default Web Site**
    - Right click -> Manage Website -> Browse
    - You should see the default page.

4. Copy your website files to:
    - `C:\inetpub\wwwroot`

5. Create a new site from sidebar:
    - Sites -> Add Website
    - Site name: your choice
    - Physical path: `C:/inetpub/wwwroot`
    - Port: `2200` (outside reserved range `0:1024`)
    - IP address: **All Unassigned** (takes IP automatically)
    - Click **OK**
    - Browse from right panel -> `http://localhost:2200`

6. IIS creates a file inside the website folder:
    - `web.config`
    - Used to configure website settings.

7. Set default document:
    - IIS Manager -> Select site -> Default Document -> Add -> `index.html`
    - Move it to the top
    - Refresh page to show `index.html` content.

8. Check machine IP from binding:
    - Right panel -> Bindings -> Edit
    - IP Address dropdown shows current machine IP (example: `192.168.1.4:2200`)
    - Access from another device via `192.168.1.4:2200`

9. Allow other devices through firewall (port `2200`):
    - Windows Defender Firewall -> Inbound Rules -> New Rule
    - Rule Type: Port
    - TCP -> Specific local ports: `2200`
    - Allow the connection -> Next
    - Select all profiles: Domain, Private, Public
    - Rule name: `MyWebsitePort`
    - Finish

10. Create a virtual domain name using local DNS:

- Open Notepad as Administrator
- Open file: `C:\Windows\System32\drivers\etc\hosts`
- Add line: `192.168.1.4 MyWebsite.com`
- Save
- IIS Manager -> Select website -> Bindings -> Edit
- Host name: `MyWebsite.com`
- Browse: `http://MyWebsite.com:2200`

11. Enable HTTPS with SSL certificate:

- **Paid certificate**:
    - IIS Manager -> Server Certificates -> Create Certificate Request
    - Fill details:
        - Common Name: `godaddy`
        - Organization / Organizational Unit: `web`
        - City/State: `eg`
        - Region: `EG`
        - Bit length: `2048`
    - Save request file on desktop as `ui-certificate.txt`

- **Free self-signed certificate** (some browsers may detect it as fake):
    - IIS Manager -> Server Certificates -> Create Self-Signed Certificate
    - Name: `ui-certificate`
    - Certificate store: Personal
    - Select site -> Bindings -> Add
        - Type: `https`
        - Port: `443`
        - Host name: `MyWebsite.com`
        - Certificate: `ui-certificate`
    - Browse: `https://MyWebsite.com:443`
    - Browser warning appears because certificate is self-signed
    - Click **Advanced** -> **Proceed to MyWebsite.com (unsafe)**

- **If previous method does not work**:
    - Open PowerShell as Administrator and run:
        - `New-SelfSignedCertificate -DnsName "MyWebsite.com" -CertStoreLocation "cert:\LocalMachine\My"`
    - Open MMC (Microsoft Management Console)
    - File -> Open -> `Console1.msc`
    - Personal -> Certificates
    - Find `MyWebsite.com` certificate
    - Right click -> All Tasks -> Export
    - Select password: `tech#T55`
    - Save on desktop as `ui-certificate.pfx`
    - Trusted Root Certification Authorities -> Certificates
    - Right click -> All Tasks -> Import
    - Select `ui-certificate.pfx`
    - Enter password: `tech#T55`
    - IIS Manager -> Select website -> Bindings -> Edit
    - Select certificate with same website name (`MyWebsite.com`)
    - Browse using HTTPS
    - If browser still says "not secure", it indicates a self-signed certificate is being used.

## Sometimes IIS Crashes

- Open Command Prompt as Administrator:
    - `iisreset`
        - If the server was processing a request, it will be terminated and response may be returned as internal server error.
    - `iisreset -noforce`
        - Waits for current request processing to finish, then resets.

## Application Pool

A process that serves multiple websites/applications. Each application can have its own application pool.
