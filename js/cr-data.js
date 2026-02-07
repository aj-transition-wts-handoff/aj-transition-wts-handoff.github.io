// CR Data - Contributed Change Requests
const allCRs = [
  {
    "number": "CR-1257723",
    "summary": "1G/2.5G Ethernet PCS/PMA IP Core Clock Constraints",
    "status": "Assigned",
    "assignee": "pachimak"
  },
  {
    "number": "CR-1237546",
    "summary": "Versal MRMAC-TFTP does not work in U-boot when connected to a switch",
    "status": "Assigned",
    "assignee": "Begari, Padmarao"
  },
  {
    "number": "CR-1213126",
    "summary": "AXI 1G/2.5G Ethernet Subsystem - 2.5G Versal Recovery Reset Logic - Enhancement request",
    "status": "New",
    "assignee": "Unassigned"
  },
  {
    "number": "CR-1256112",
    "summary": "WTS-WWG-Ethernet-Testing - Need ZCU670 SFP connection for 100G ethernet testing",
    "status": "Closed",
    "assignee": "Wen, Michael"
  },
  {
    "number": "CR-1255895",
    "summary": "VPK120-5 is down",
    "status": "Closed",
    "assignee": "Lam, Hue"
  },
  {
    "number": "CR-1253164",
    "summary": "WTS-WWG-Ethernet-Testing - Need a VEK385 to VEK385 connection via QSFP",
    "status": "Closed",
    "assignee": "Lam, Hue"
  },
  {
    "number": "CR-1251125",
    "summary": "PS-GEM- wget does not work in U-boot",
    "status": "Closed",
    "assignee": "Dahal, Ajaya"
  },
  {
    "number": "CR-1250694",
    "summary": "PS PCIe Kernel Crash",
    "status": "Closed",
    "assignee": "Musham, Sai Krishna"
  },
  {
    "number": "CR-1247245",
    "summary": "Versal PS-GEM Ethernet Device Tree is Missing reset-gpios",
    "status": "Closed",
    "assignee": "Simek, Michal"
  },
  {
    "number": "CR-1243393",
    "summary": "USXGMII - GT reset handling and removing XXV specific code",
    "status": "Closed",
    "assignee": "Gupta, Suraj"
  },
  {
    "number": "CR-1242683",
    "summary": "WTS-WWG-Ethernet-Testing - Need ZCU111 SFP connection for 25G ethernet testing",
    "status": "Closed",
    "assignee": "Wen, Michael"
  },
  {
    "number": "CR-1242197",
    "summary": "2024.2 DTG fails to build with MRMAC IP",
    "status": "Closed",
    "assignee": "Pothuraju, Rajukumar"
  },
  {
    "number": "CR-1241140",
    "summary": "WTS-WWG-Ethernet-Testing - Need ZCU670 SFP connection for 1G/10G ethernet testing",
    "status": "Closed",
    "assignee": "Kasa, Sivasankara Rao"
  },
  {
    "number": "CR-1241005",
    "summary": "PS GEM + PL PCS/PMA Auto-Negotiation TIMEOUT",
    "status": "Closed",
    "assignee": "Begari, Padmarao"
  },
  {
    "number": "CR-1237791",
    "summary": "WTS-WWG-Ethernet-Testing - VCU118 connection with a Mellanox NIC",
    "status": "Closed",
    "assignee": "Wen, Michael"
  },
  {
    "number": "CR-1233141",
    "summary": "Versal MRMAC-TFTP not working in U-boot",
    "status": "Closed",
    "assignee": "Dahal, Ajaya"
  },
  {
    "number": "CR-1232780",
    "summary": "WTS-WWG-Ethernet-Testing - VEK280 board to board setup",
    "status": "Closed",
    "assignee": "Wen, Michael"
  },
  {
    "number": "CR-1232357",
    "summary": "WTS-WWG-Ethernet-Testing - VCK180 connection with a Mellanox NIC",
    "status": "Closed",
    "assignee": "Wen, Michael"
  },
  {
    "number": "CR-1232349",
    "summary": "WTS-WWG-Ethernet-Testing - VPK180 connection with a Mellanox NIC",
    "status": "Closed",
    "assignee": "Wen, Michael"
  },
  {
    "number": "CR-1231428",
    "summary": "WTS-WWG-Ethernet-Testing - VPK120 connection with a Mellanox NIC",
    "status": "Closed",
    "assignee": "Wen, Michael"
  },
  {
    "number": "CR-1230555",
    "summary": "GEM Macb driver does not support different PLL clock source",
    "status": "Closed",
    "assignee": "Begari, Padmarao"
  },
  {
    "number": "CR-1226912",
    "summary": "WTS-WWG-Ethernet-Testing - VPK180 to VPK180 connection via QSFP",
    "status": "Closed",
    "assignee": "Lam, Hue"
  },
  {
    "number": "CR-1225173",
    "summary": "Create clock constraint on FMIOGEMTSUCLKTOPLBUFG clock",
    "status": "Closed",
    "assignee": "Kethu, Venkata Nitheesh Kumar Reddy"
  },
  {
    "number": "CR-1225060",
    "summary": "7-Series 2.5G PCS/PMA Reset Sync To Wrong Clock",
    "status": "Closed",
    "assignee": "Sharama Pamu, Shankar"
  },
  {
    "number": "CR-1222776",
    "summary": "WTS-WWG-Ethernet-Testing - VCK190 connection with a Mellanox NIC",
    "status": "Closed",
    "assignee": "Wen, Michael"
  },
  {
    "number": "CR-1219421",
    "summary": "Issues when using LWIP220 with Vitis Unified IDE",
    "status": "Closed",
    "assignee": "Dahal, Ajaya"
  },
  {
    "number": "CR-1217583",
    "summary": "Ease of Use Enhancement Request - Releasing Reserved Boards",
    "status": "Closed",
    "assignee": "Unassigned"
  },
  {
    "number": "CR-1213278",
    "summary": "AXI 1G/2.5G Ethernet Subsystem Generates Incorrect XSA Parameter",
    "status": "Closed",
    "assignee": "Sharama Pamu, Shankar"
  },
  {
    "number": "CR-1212175",
    "summary": "WTS-WWG-Ethernet-Testing - Need a VMK180 to VMK180 connection via SFP",
    "status": "Closed",
    "assignee": "Lam, Hue"
  },
  {
    "number": "CR-1209927",
    "summary": "EmbeddedSW LwIP UDP Perf Server stuck in Windows iperf test",
    "status": "Closed",
    "assignee": "Odela, Venkatesh"
  },
  {
    "number": "CR-1209481",
    "summary": "AXIENET Driver - MRMAC PLL lock with timeout",
    "status": "Closed",
    "assignee": "Gupta, Suraj"
  },
  {
    "number": "CR-1209032",
    "summary": "VCK190-14 2023.1_released hw_server error",
    "status": "Closed",
    "assignee": "Nissim, Daniel"
  },
  {
    "number": "CR-1207126",
    "summary": "AXI Ethernet: EXAMPLE_SIMULATION: Removal of Generics",
    "status": "Closed",
    "assignee": "Sharama Pamu, Shankar"
  },
  {
    "number": "CR-1207103",
    "summary": "MRMAC Ethernet Node: Missing Property: xlnx,include-dre",
    "status": "Closed",
    "assignee": "Gupta, Suraj"
  },
  {
    "number": "CR-1206960",
    "summary": "Need a KCU105 connected to a switch",
    "status": "Closed",
    "assignee": "Unassigned"
  },
  {
    "number": "CR-1206953",
    "summary": "AXIENET Driver - MRMAC Ethernet Issue",
    "status": "Closed",
    "assignee": "Gupta, Suraj"
  },
  {
    "number": "CR-1206659",
    "summary": "AXIENET Driver - 10G/25G Ethernet Issue",
    "status": "Closed",
    "assignee": "Katakam, Harini"
  },
  {
    "number": "CR-1204239",
    "summary": "MRMAC VPK120; driver issues",
    "status": "Closed",
    "assignee": "Katakam, Harini"
  },
  {
    "number": "CR-1204096",
    "summary": "WTS-WWG-Ethernet-Testing - VPK120 to VPK120 QSFP connection",
    "status": "Closed",
    "assignee": "Lam, Hue"
  },
  {
    "number": "CR-1203562",
    "summary": "10G/25G Ethernet Vivado Example Design Fails Timing",
    "status": "Closed",
    "assignee": "Gudhe, Dilip"
  },
  {
    "number": "CR-1202007",
    "summary": "WTS-WWG-Ethernet-Testing - Need ZCU102 SFP connection for 10G ethernet testing",
    "status": "Closed",
    "assignee": "Lam, Hue"
  },
  {
    "number": "CR-1200968",
    "summary": "Need ZC706 SFP connection for 10G ethernet testing",
    "status": "Closed",
    "assignee": "Lam, Hue"
  },
  {
    "number": "CR-1199548",
    "summary": "WTS-WWG-Ethernet-Testing - Need a VCK190 to VCK190 connection via QSFP",
    "status": "Closed",
    "assignee": "Lam, Hue"
  },
  {
    "number": "CR-1198021",
    "summary": "2023.2 DTG fails to build with DCMAC IP",
    "status": "Closed",
    "assignee": "Unassigned"
  },
  {
    "number": "CR-1195506",
    "summary": "xilinx_axienet bug when DRE is not used",
    "status": "Closed",
    "assignee": "Gupta, Suraj"
  },
  {
    "number": "CR-1194636",
    "summary": "23.2 VCK190 MRMAC: GT PPM offset between receiver and transmitter is 0",
    "status": "Closed",
    "assignee": "Unassigned"
  },
  {
    "number": "CR-1194622",
    "summary": "Need a VCK190 to VMK180 setup",
    "status": "Closed",
    "assignee": "Lam, Hue"
  },
  {
    "number": "CR-1193188",
    "summary": "2023.2 : [BD 41-238] Port/Pin property FREQ_HZ does not match between /axi_ethernet_0/gtx_clk(125000000) and /axi_ethernet_0_refclk/clk_out2(124999000)",
    "status": "Closed",
    "assignee": "Kumar, Adarsh"
  },
  {
    "number": "CR-1192992",
    "summary": "VCK190-Ethernet TRD SW Architecture of the Platform: Missing/Unclear Information",
    "status": "Closed",
    "assignee": "Unassigned"
  },
  {
    "number": "CR-1192805",
    "summary": "PetaLinux TSU-Related Clock Problem in GEM3",
    "status": "Closed",
    "assignee": "Dahal, Ajaya"
  },
  {
    "number": "CR-1190812",
    "summary": "Add reserve tag VCK190-13 and VCK190-14",
    "status": "Closed",
    "assignee": "Unassigned"
  },
  {
    "number": "CR-1189597",
    "summary": "Clone of issue with summary: MRMAC 100G IP ports clocking question",
    "status": "Closed",
    "assignee": "Unassigned"
  },
  {
    "number": "CR-1189303",
    "summary": "AXI 1G/2.5G Ethernet : Auto Negotiation",
    "status": "Closed",
    "assignee": "Dahal, Ajaya"
  },
  {
    "number": "CR-1189025",
    "summary": "QSFP setup in VPK180-3",
    "status": "Closed",
    "assignee": "Lam, Hue"
  },
  {
    "number": "CR-1188874",
    "summary": "Requesting for a setup with ZCU1275 with a AES-FMC-NETW1-G",
    "status": "Closed",
    "assignee": "Unassigned"
  },
  {
    "number": "CR-1188873",
    "summary": "vpk180-5 is closed",
    "status": "Closed",
    "assignee": "Unassigned"
  },
  {
    "number": "CR-1188736",
    "summary": "Need assistance to boot from SD card.",
    "status": "Closed",
    "assignee": "Unassigned"
  },
  {
    "number": "CR-1187105",
    "summary": "Need VMK180 board to board setup to test MRMAC TRD",
    "status": "Closed",
    "assignee": "Lam, Hue"
  },
  {
    "number": "CR-1187055",
    "summary": "VCK190 Ethernet TRD does not work in U-boot",
    "status": "Closed",
    "assignee": "Dahal, Ajaya"
  },
  {
    "number": "CR-1184041",
    "summary": "WTS-WWG-Ethernet-Testing - VCK190 board to board setup",
    "status": "Closed",
    "assignee": "Lam, Hue"
  },
  {
    "number": "CR-1182198",
    "summary": "Missing information: Does Versal HDIO support 3.3V RGMII?",
    "status": "Closed",
    "assignee": "asaurabh"
  },
  {
    "number": "CR-1181926",
    "summary": "AXI 1/2.5G Not Working in Versal",
    "status": "Closed",
    "assignee": "Sharma, Ajay (WWG-ENG)"
  },
  {
    "number": "CR-1179374",
    "summary": "GMII2RGMII driver gets stuck in \u201cxilinxgmiitorgmii_startup\u201d",
    "status": "Closed",
    "assignee": "Dahal, Ajaya"
  },
  {
    "number": "CR-1178909",
    "summary": "Interlaken 600G Lane Decommissioning: Number of Lane Does Not Change Even After Writing to the Registers",
    "status": "Closed",
    "assignee": "Chennampalle, Vineel"
  },
  {
    "number": "CR-1176788",
    "summary": "PG292, page 65-66: Refclk for Versal in Clocking section",
    "status": "Closed",
    "assignee": "Zadler, Elizabeth"
  },
  {
    "number": "CR-1176615",
    "summary": "USXGMII support on Versal with a PHY with no option to disable AN",
    "status": "Closed",
    "assignee": "Ganesan, Pradeep"
  },
  {
    "number": "CR-1175650",
    "summary": "Need DC4 for ZC1751",
    "status": "Closed",
    "assignee": "Lam, Hue"
  },
  {
    "number": "CR-1172288",
    "summary": "PG203 - 1588v2 Timestamping",
    "status": "Closed",
    "assignee": "nishat"
  },
  {
    "number": "CR-1171725",
    "summary": "No boot log when flashing Petalinux image in ZC1751 DC1 boards",
    "status": "Closed",
    "assignee": "Chang, Hongkai"
  },
  {
    "number": "CR-1167563",
    "summary": "Missing info on AM011/AM012 - Versal GEM clock selection using GEM_Clk_Ctrl (LPD_IOP_SLCR) Register",
    "status": "Closed",
    "assignee": "rembry"
  },
  {
    "number": "CR-1166248",
    "summary": "Differences in AXI DMA SG Interrupt example vs Linux",
    "status": "Closed",
    "assignee": "Dahal, Ajaya"
  },
  {
    "number": "CR-1164768",
    "summary": "2022.2 DTG fails to build with MRMAC IP",
    "status": "Closed",
    "assignee": "Pothuraju, Rajukumar"
  },
  {
    "number": "CR-1164569",
    "summary": "Connect SFP loopback module in VCK190",
    "status": "Closed",
    "assignee": "Lam, Hue"
  },
  {
    "number": "CR-1164073",
    "summary": "TX EQ GUI input does not seem to have any effect",
    "status": "Closed",
    "assignee": "Kosuna, Santhosh"
  },
  {
    "number": "CR-1161574",
    "summary": "PG047 v16.2: Transceiver Logic for Versal Devices",
    "status": "Closed",
    "assignee": "Chennampalle, Vineel"
  },
  {
    "number": "CR-1160272",
    "summary": "AM002 Table: TX Configurable Driver Attributes TX_DRIVE_MODE [29:28] Missing 2-Bit Encoding",
    "status": "Closed",
    "assignee": "Fuentes, Veronica"
  },
  {
    "number": "CR-1155848",
    "summary": "PG314 - Table: MRMAC Status Port Descriptions - Incorrect Description for stat_tx_local_fault_(0/1/2/3)",
    "status": "Closed",
    "assignee": "Palai, Smruti Santosh"
  },
  {
    "number": "CR-1155847",
    "summary": "PG203 - Table: CORE XCI Top Level Port List - Incorrect Description for stat_tx_local_fault",
    "status": "Closed",
    "assignee": "nishat"
  },
  {
    "number": "CR-1155846",
    "summary": "PG165 - Table: CORE XCI Top-Level Port List - Incorrect Description for stat_tx_local_fault",
    "status": "Closed",
    "assignee": "nishat"
  },
  {
    "number": "CR-1155844",
    "summary": "PG292 - Table TX Path Control/Status/Statistics Signals - Incorrect Description for stat_tx_local_fault_*",
    "status": "Closed",
    "assignee": "nishat"
  },
  {
    "number": "CR-1155842",
    "summary": "PG211 - Table TX Path Control/Status/Statistics Signals - Incorrect Description for stat_tx_local_fault_*",
    "status": "Closed",
    "assignee": "nishat"
  },
  {
    "number": "CR-1155838",
    "summary": "PG210 - Description of stat_tx_local_fault(_*) incorrect in two tables",
    "status": "Closed",
    "assignee": "nishat"
  },
  {
    "number": "CR-1155835",
    "summary": "PG251 Table Statistics Interface \u2013 TX Path - Description of stat_tx_local_fault incorrect",
    "status": "Closed",
    "assignee": "Ganesan, Pradeep"
  },
  {
    "number": "CR-1155263",
    "summary": "Version register mismatch between IP and documentation",
    "status": "Closed",
    "assignee": "nishat"
  }
];
