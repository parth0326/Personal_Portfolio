// All my projects in one place. The cards, the filters, the breakdown circle
// and the chat assistant all read from this list, so adding a project is just
// adding another object here.
//
// fields:
//   type       Team project / Lab / Case study / Course project / Personal project
//   category   security category, or null if it isn't a security project
//   languages  [] if there wasn't really any code involved
//   area       which filter buttons it shows up under: security, ai, other
//   link       optional, shows a GitHub link on the card
//   featured   optional, makes the card span the full row

const PROJECTS = [
  {
    title: "Multi-Agent LLM Penetration Testing Tool",
    when: "Apr – May 2026",
    summary: "Built with my group: a four-agent pipeline (orchestrator, recon, vulnerability analyst, report writer) that runs recon and vuln analysis against a Metasploitable 2 box and writes up a structured report. I wrapped nmap, whois and hping3 so their raw output becomes clean input for the analysis agent, and the orchestrator refuses any target that isn't on a hardcoded allowlist.",
    type: "Team project",
    category: "Offensive Security",
    languages: ["Python"],
    tools: ["LangChain", "Claude API", "Nmap", "WHOIS", "hping3"],
    area: ["security", "ai"],
    featured: true
  },
  {
    title: "St. Mary's Security Assessment",
    summary: "My group assessed St. Mary's Property Development across MFA, access control, incident response, patching, backups, asset management, training and AI tool use. We found inconsistent MFA, no formal IR plan, incomplete asset tracking and no AI usage policy, then wrote up recommendations.",
    type: "Team project",
    category: "GRC & Risk",
    languages: [],
    tools: ["Security assessment", "Policy review"],
    area: ["security"]
  },
  {
    title: "Wazuh SIEM and EDR Lab",
    summary: "Stood up Wazuh, enrolled a Linux endpoint and watched failed SSH logins and sudo activity come through as alerts. Worked through the dashboard's rule levels, agent status and vulnerability data the way a SOC analyst would.",
    type: "Lab",
    category: "Security Operations",
    languages: [],
    tools: ["Wazuh", "Linux"],
    area: ["security"]
  },
  {
    title: "Linux Security Auditing and Hardening",
    summary: "Ran a Lynis audit on a Linux system and used systemd's security analysis on services like Apache, then tightened the config to cut back unnecessary permissions and exposure.",
    type: "Lab",
    category: "System Hardening",
    languages: [],
    tools: ["Lynis", "systemd-analyze", "Apache"],
    area: ["security"]
  },
  {
    title: "Honeypot and Malware Detection Lab",
    summary: "Tested ClamAV detection with the EICAR file and set up a Cowrie SSH honeypot to capture login attempts and attacker activity. Used firewall logging to pick out SSH attempts and likely port scans.",
    type: "Lab",
    category: "Security Operations",
    languages: [],
    tools: ["Cowrie", "ClamAV", "EICAR"],
    area: ["security"]
  },
  {
    title: "Centralized Syslog Server",
    summary: "Configured Linux machines to ship logs over rsyslog, set up facilities, severity levels and custom log destinations so everything lands in one place for investigation and troubleshooting.",
    type: "Lab",
    category: "Security Operations",
    languages: [],
    tools: ["rsyslog", "Linux"],
    area: ["security"]
  },
  {
    title: "Wireshark and Network Traffic Analysis",
    summary: "A set of packet capture labs covering HTTP, FTP, TCP, ICMP, ARP and SMB: following file transfers, pulling HTTP requests, reading FTP commands, spotting suspicious traffic and recognizing ARP poisoning.",
    type: "Lab",
    category: "Network Security",
    languages: [],
    tools: ["Wireshark"],
    area: ["security"]
  },
  {
    title: "Vulnerability Scanning with Nmap",
    summary: "Scanned a vulnerable Linux machine with Nmap and its vuln scripts. Turned up the VSFTPD backdoor, POODLE, Logjam, Slowloris, possible SQL injection and other outdated services, then ranked them by CVSS.",
    type: "Lab",
    category: "Vulnerability Management",
    languages: [],
    tools: ["Nmap", "NSE scripts", "CVSS"],
    area: ["security"]
  },
  {
    title: "Firewall and NAT Configuration",
    summary: "Wrote iptables rules to control traffic on Linux and worked through NAT, routing and double-NAT setups to see how packets actually move between networks.",
    type: "Lab",
    category: "Network Security",
    languages: [],
    tools: ["iptables", "Linux routing"],
    area: ["security"]
  },
  {
    title: "Network Reconnaissance",
    summary: "Used Nmap, tcpdump, curl, ARP and standard Linux networking commands to find hosts, open ports, HTTP headers, routes and ARP entries, and captured traffic along the way.",
    type: "Lab",
    category: "Offensive Security",
    languages: [],
    tools: ["Nmap", "tcpdump", "curl"],
    area: ["security"]
  },
  {
    title: "SSH, Tunneling and Secure Connections",
    summary: "Moved from passwords to key-based SSH, then used SSH tunnels and a SOCKS proxy to reach systems through a jump host. Also used SCP and SFTP for transfers.",
    type: "Lab",
    category: "Network Security",
    languages: [],
    tools: ["OpenSSH", "SCP", "SFTP"],
    area: ["security"]
  },
  {
    title: "OpenSSL and Encryption",
    summary: "Decrypted AES-encrypted messages, checked and verified certificate fingerprints, and generated self-signed certificates with OpenSSL to get a feel for how TLS holds together.",
    type: "Lab",
    category: "Cryptography",
    languages: [],
    tools: ["OpenSSL", "AES", "TLS"],
    area: ["security"]
  },
  {
    title: "Docker and Nginx Web Server",
    summary: "Deployed Nginx inside a Docker container to see how containers keep a service separated from the host, with some Linux networking and web server config along the way.",
    type: "Lab",
    category: "Cloud & Infrastructure",
    languages: [],
    tools: ["Docker", "Nginx"],
    area: ["security", "other"]
  },
  {
    title: "AWS S3 Static Website",
    summary: "Set up an S3 bucket to host a static site, which meant actually understanding bucket permissions and how public web access works in AWS.",
    type: "Lab",
    category: "Cloud & Infrastructure",
    languages: [],
    tools: ["AWS S3"],
    area: ["security", "other"]
  },
  {
    title: "Ransomware Incident Response Scenario",
    summary: "Traced a ransomware attack on a healthcare org from initial access through lateral movement to encryption, then mapped out which controls (EDR, access control, monitoring, AD hardening) would have stopped or caught each stage.",
    type: "Case study",
    category: "Incident Response",
    languages: [],
    tools: ["Active Directory", "EDR"],
    area: ["security"]
  },
  {
    title: "SOC Packet Capture Investigation",
    summary: "Dug through a capture of suspicious SMB and RPC traffic against a Windows host and found the attacker opening and clearing event logs. Mapped it to the MITRE ATT&CK techniques for defense evasion and indicator removal.",
    type: "Case study",
    category: "Incident Response",
    languages: [],
    tools: ["Wireshark", "MITRE ATT&CK"],
    area: ["security"]
  },
  {
    title: "Security Event Correlation",
    summary: "Pieced together a chain of events at a law firm across an external-facing server and an internal workstation, recommended fixes, and explained the whole thing for a non-technical audience.",
    type: "Case study",
    category: "Incident Response",
    languages: [],
    tools: ["Log analysis"],
    area: ["security"]
  },
  {
    title: "Vulnerability Risk Assessment",
    summary: "Assessed the Apache 2.4.49 path traversal / RCE bug for a financial organization, weighed the risk to customer data against PCI DSS and GLBA, and prioritized the fixes.",
    type: "Case study",
    category: "Vulnerability Management",
    languages: [],
    tools: ["CVE analysis", "PCI DSS", "GLBA"],
    area: ["security"]
  },
  {
    title: "AI-Based Anomaly Detection",
    summary: "Looked at training a model on normal login, network and system activity so anything unusual gets flagged, plus the hard parts: false positives and attackers deliberately blending in.",
    type: "Course project",
    category: "AI Security",
    languages: [],
    tools: ["Machine learning"],
    area: ["security", "ai"]
  },
  {
    title: "Generative AI Coursework",
    summary: "Worked with models that generate text, images and other data: prompt engineering, model evaluation, working through APIs, and adapting models for specific tasks.",
    type: "Course project",
    category: null,
    languages: ["Python"],
    tools: ["LLM APIs", "Prompt engineering"],
    area: ["ai"]
  },
  {
    title: "Deep Learning and Machine Learning",
    summary: "The fundamentals of training neural networks: train/validation/test splits, features and labels, overfitting, evaluation, and supervised vs. unsupervised learning.",
    type: "Course project",
    category: null,
    languages: [],
    tools: ["Neural networks"],
    area: ["ai"]
  },
  {
    title: "Uninformed Search Algorithms",
    summary: "Implemented and compared breadth-first, depth-limited and iterative deepening search, looking at where each one wins and where it falls over.",
    type: "Course project",
    category: null,
    languages: [],
    tools: ["BFS", "DLS", "IDS"],
    area: ["ai"]
  },
  {
    title: "A* 8-Puzzle Solver",
    summary: "Solved the 8-puzzle with A*, using heuristics to steer the search toward the goal instead of brute-forcing the state space.",
    type: "Course project",
    category: null,
    languages: [],
    tools: ["A*", "Heuristics"],
    area: ["ai"]
  },
  {
    title: "Pohl's Weighted Search",
    summary: "Studied Pohl's search method and compared it with other heuristic searches to see how weighting changes speed versus solution quality.",
    type: "Course project",
    category: null,
    languages: [],
    tools: ["Heuristic search"],
    area: ["ai"]
  },
  {
    title: "8-Queens Hill Climbing",
    summary: "Used hill climbing on 8-Queens, scoring each board by the number of attacking pairs and moving to better boards until it got stuck or solved it.",
    type: "Course project",
    category: null,
    languages: [],
    tools: ["Hill climbing", "Local search"],
    area: ["ai"]
  }
];

// the netlify chat function requires this file too
if (typeof module !== 'undefined') module.exports = PROJECTS;
