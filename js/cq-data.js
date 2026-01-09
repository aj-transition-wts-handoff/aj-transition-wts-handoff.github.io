// Community Questions (CQ) Data
const cqData = [
    {
        id: "CQ-0001",
        date: "12/12/2025, 4:05 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000Cus3dKAB",
        details: "To use J380A and J380B, you can either enable GEM0 and GEM1 in CIPS or use AXI Ethernet , which includes a TEMAC-based PL MAC. If you choose to use the PS GEMs, you must use the PG047 1G/2.5G PCS/PMA in SGMII mode to interfac",
        questionId: "0D7Pd00000Cus3dKAB"
    },
    {
        id: "CQ-0002",
        date: "12/12/2025, 10:02 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000Cu0o1KAB",
        details: "Can you try this design instead: https://github.com/ajayadaha1/Versal-Ethernet/tree/master/VEK280-Ethernet  ",
        questionId: "0D7Pd00000Cu0o1KAB"
    },
    {
        id: "CQ-0003",
        date: "12/12/2025, 9:43 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000Ctx29KAB",
        details: "Also, another quick test you could try is building the 2024.1 Petalinux image using the 2023.1 XSA to see if the link comes up at 2.5G. If it does, then the issue is definitely in the driver, and you will need to patch it in 2023.x in order to bring t",
        questionId: "0D7Pd00000Ctx29KAB"
    },
    {
        id: "CQ-0004",
        date: "12/12/2025, 9:37 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000CtsCAKAZ",
        details: "Please select the best answer and close this.",
        questionId: "0D7Pd00000CtsCAKAZ"
    },
    {
        id: "CQ-0005",
        date: "12/10/2025, 12:46 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000Cpov7KAB",
        details: "I worked on 2.5G design for Versal 2023.2 and found that the driver support was missing so we had to patch the driver. So, you need to back port these two patches to 2023.1: https://github.com/ajayadaha1/Versal-Ethernet/tree/master/VCK190",
        questionId: "0D7Pd00000Cpov7KAB"
    },
    {
        id: "CQ-0006",
        date: "12/10/2025, 12:44 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000CpoWvKAJ",
        details: "Here is the change that is needed from the device tree side: https://github.com/ajayadaha1/Versal-Ethernet/blob/master/VCK190-Ethernet/2024.2/pl_eth_2p5g_1g/Software/PetaLinux/project-spec/meta-user/recipes-bsp/device-tree/files/system-user.dtsi",
        questionId: "0D7Pd00000CpoWvKAJ"
    },
    {
        id: "CQ-0007",
        date: "12/9/2025, 12:34 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000CnJdhKAF",
        details: "2500Base-x was added in 2024.1: https://github.com/Xilinx/linux-xlnx/blob/xilinx-v2024.1/drivers/net/ethernet/xilinx/xilinx_axienet.h#L347",
        questionId: "0D7Pd00000CnJdhKAF"
    },
    {
        id: "CQ-0008",
        date: "12/9/2025, 10:16 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000CmpfdKAB",
        details: "in addition to rambati, since you mentioned Ubuntu, we also have wiki pages below that can help you get started: https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1413611532/Canonical+Ubuntu https://xilinx-wiki.atlassian.net/wik",
        questionId: "0D7Pd00000CmpfdKAB"
    },
    {
        id: "CQ-0009",
        date: "12/9/2025, 10:02 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000CmmhlKAB",
        details: "You can follow the steps from here and port to 24.04 instead of 22.04: https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/2363129857/Getting+Started+with+Certified+Ubuntu+22.04+LTS+for+Xilinx+Devices  ",
        questionId: "0D7Pd00000CmmhlKAB"
    },
    {
        id: "CQ-0010",
        date: "12/9/2025, 9:59 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000CmmGLKAZ",
        details: "Here is more info: https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/3257466965/Zephyr+OS https://github.com/Xilinx/zephyr-amd  ",
        questionId: "0D7Pd00000CmmGLKAZ"
    },
    {
        id: "CQ-0011",
        date: "12/9/2025, 9:55 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000CmlSLKAZ",
        details: "Can you try adding this in your device tree: / { chosen { bootargs = \"earlycon console=ttyPS0,115200 root=/dev/mmcblk0p2 rw rootwait modprobe.blacklist=xilinx_ib,xilinx_kmm,pl_allocator\"; stdout-path = \"serial0:115200n8&qu",
        questionId: "0D7Pd00000CmlSLKAZ"
    },
    {
        id: "CQ-0012",
        date: "12/9/2025, 9:48 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000CmjlVKAR",
        details: "If your FPGA image has changes to any of the peripherals (that requires Linux driver), it is recommended to export a new XSA and use that to configure the Petalinux project: petalinux-config --get-hw-description <PATH TO XSA> --silentco",
        questionId: "0D7Pd00000CmjlVKAR"
    },
    {
        id: "CQ-0013",
        date: "12/9/2025, 8:11 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000Cm9V8KAJ",
        details: "Ok got it. Can you please share your device tree complete node for the 10G node? You can use dtc to decompile the dtb file to dts.",
        questionId: "0D7Pd00000Cm9V8KAJ"
    },
    {
        id: "CQ-0014",
        date: "12/8/2025, 5:27 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000ClNDZKA3",
        details: "Have you tested both SFP in the different design with Microblaze and they have worked together in the same setup/connection?  ",
        questionId: "0D7Pd00000ClNDZKA3"
    },
    {
        id: "CQ-0015",
        date: "12/8/2025, 5:25 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000ClN77KAF",
        details: "We have a known good design here: https://github.com/ajayadaha1/Versal-Ethernet/tree/master/VCK190-Ethernet/2023.2/pl_eth_10g Please try this and let me know if you still see the same error. If you do, the issue could be in your setup.",
        questionId: "0D7Pd00000ClN77KAF"
    },
    {
        id: "CQ-0016",
        date: "12/8/2025, 5:22 PM",
        year: 2025,
        url: "https://support.xilinx.com/s/question/0D7Pd00000ClMvpKAF",
        details: "I have worked on a CMAC design recently. Please try to port this to your part: https://github.com/ajayadaha1/ZCU670-100G-CMAC  ",
        questionId: "0D7Pd00000ClMvpKAF"
    },
    {
        id: "CQ-0017",
        date: "12/8/2025, 5:21 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000ClMqzKAF",
        details: "If this issue is resolved, please mark closed.",
        questionId: "0D7Pd00000ClMqzKAF"
    },
    {
        id: "CQ-0018",
        date: "12/8/2025, 5:20 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000ClMpNKAV",
        details: "Hi , If this is resolved, please mark closed. Thank you",
        questionId: "0D7Pd00000ClMpNKAV"
    },
    {
        id: "CQ-0019",
        date: "12/8/2025, 5:17 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000ClMcTKAV",
        details: "I have worked on a Linux driver recently for USXGMII, please try my design: https://github.com/ajayadaha1/ZCU102-USXGMII",
        questionId: "0D7Pd00000ClMcTKAV"
    },
    {
        id: "CQ-0020",
        date: "12/8/2025, 5:15 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000ClMMLKA3",
        details: "VPK180 4x25G might be better because VPK120 is in narrow mode: https://github.com/ajayadaha1/Versal-Ethernet/tree/master/VPK180-Ethernet/2024.2/pl_4x25g_mrmac",
        questionId: "0D7Pd00000ClMMLKA3"
    },
    {
        id: "CQ-0021",
        date: "12/8/2025, 5:13 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000ClMEHKA3",
        details: "The issue you are seeing could be because of what's mentioned here: https://adaptivesupport.amd.com/s/article/000037700?language=en_US  ",
        questionId: "0D7Pd00000ClMEHKA3"
    },
    {
        id: "CQ-0022",
        date: "12/8/2025, 5:09 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000ClM4bKAF",
        details: "You need to enable tick register. Please check PG203 v3.1 Page 202 Table 103: Tick reg.",
        questionId: "0D7Pd00000ClM4bKAF"
    },
    {
        id: "CQ-0023",
        date: "12/8/2025, 5:07 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000ClLtJKAV",
        details: "Which SFP module are you using and have you tried using ethtool to set the rate to 2500? Not sure if 2021.1 driver is compatible to run at 2.5G without patching the driver.  ",
        questionId: "0D7Pd00000ClLtJKAV"
    },
    {
        id: "CQ-0024",
        date: "11/17/2025, 9:49 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000CCzf7KAD",
        details: "Hi   Can you please share the details of the SFP module?",
        questionId: "0D7Pd00000CCzf7KAD"
    },
    {
        id: "CQ-0025",
        date: "10/21/2025, 2:05 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000BV69FKAT",
        details: " ",
        questionId: "0D7Pd00000BV69FKAT"
    },
    {
        id: "CQ-0026",
        date: "10/17/2025, 10:48 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000BPSFhKAP",
        details: "I also checked your TCL script and noticed that you have two sub-hierarchies, and for each Ethernet core, you’ve instantiated a separate GT quad. You can instead use the same GT quad and connect both Ethernet cores to different channels within that qu",
        questionId: "0D7Pd00000BPSFhKAP"
    },
    {
        id: "CQ-0027",
        date: "10/17/2025, 10:34 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000BPPRVKA5",
        details: "Who is the link partner and what kind of cable are you using? If using Active Optical, you will have to modify the design and disable LPMODE as explained here: https://adaptivesupport.amd.com/s/article/000036847?language=en_US   Also",
        questionId: "0D7Pd00000BPPRVKA5"
    },
    {
        id: "CQ-0028",
        date: "10/17/2025, 10:29 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000BPOonKAH",
        details: "fhage​  Please share your device tree.",
        questionId: "0D7Pd00000BPOonKAH"
    },
    {
        id: "CQ-0029",
        date: "10/17/2025, 10:25 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000BPOLlKAP",
        details: "Hi Kim​ , Yes, it’s possible to use multiple SFP ports. The design you’re referring to uses the Versal MRMAC configured in 4×25G Wide mode, utilizing the QSFP port, which provides four 10G/25G Ethernet interfaces in Linux.   If you w",
        questionId: "0D7Pd00000BPOLlKAP"
    },
    {
        id: "CQ-0030",
        date: "10/17/2025, 10:19 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000BPMqDKAX",
        details: "Are you using an Active Optical QSFP or a DAC? If using Optical, you might want to check this AR (I believe this is relevant for VPK180 too): https://adaptivesupport.amd.com/s/article/000036847?language=en_US  ",
        questionId: "0D7Pd00000BPMqDKAX"
    },
    {
        id: "CQ-0031",
        date: "10/17/2025, 10:07 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000BPKrdKAH",
        details: "Hi , This issue has been fixed. You can find the driver patch in the reference design below: https://github.com/ajayadaha1/ZCU102-USXGMII/tree/main   Patch: https://github.com/ajayadaha1/ZCU102-USXGMII/blob/main/Softwar",
        questionId: "0D7Pd00000BPKrdKAH"
    },
    {
        id: "CQ-0032",
        date: "10/17/2025, 9:58 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7Pd00000BPIcvKAH",
        details: "Hi   You can use the following design to validate this IP on ZCU102 board running Petalinux: https://github.com/ajayadaha1/ZCU102-1G-10G-Switching-Core  ",
        questionId: "0D7Pd00000BPIcvKAH"
    },
    {
        id: "CQ-0033",
        date: "7/1/2025, 9:35 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7KZ000000pV8S0AU",
        details: "Recently, I have seen a customer having issues with the MDIO bus in AXI Ethernet. They had to use TEMAC and PCS/PMA separately to connect to the EXT PHY. What I mean by MDIO bus connection is if you have IOB logic added in the interface:",
        questionId: "0D7KZ000000pV8S0AU"
    },
    {
        id: "CQ-0034",
        date: "7/1/2025, 9:30 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7KZ000000pV880AE",
        details: "Have you tried connecting with a different link partner? For example, with a different board? The design does not support auto-negotiation; most likely, you need to configure your switch settings to disable AN and run at 10G (same as your board from e",
        questionId: "0D7KZ000000pV880AE"
    },
    {
        id: "CQ-0035",
        date: "6/30/2025, 12:58 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7KZ000000pUZr0AM",
        details: "Which Ethernet core are you using? AXI Ethernet configured in RGMII? Have you tried using TEMAC instead? How's your MDIO bus connection looking? Please follow the guidelines from PG051 v9.0, Page 151/152.   Alternatively, if you have",
        questionId: "0D7KZ000000pUZr0AM"
    },
    {
        id: "CQ-0036",
        date: "6/30/2025, 12:40 PM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7KZ000000pUYF0A2",
        details: "Hi Kim​, Who is the link partner, and what speed is the partner running at? Is AN off in the link partner side? What does the ethtool report? Yes, as Marcus suggested, you can place the GT in internal loopback from IBERT.",
        questionId: "0D7KZ000000pUYF0A2"
    },
    {
        id: "CQ-0037",
        date: "4/8/2025, 9:29 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7KZ000000olEF0AY",
        details: "Hi ​, Are you using GEM <-> GMII2RGMII <-> External PHY? Do you have the GMII2RGMII driver enabled? If not, please see the link below on how to enable it. https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1",
        questionId: "0D7KZ000000olEF0AY"
    },
    {
        id: "CQ-0038",
        date: "4/7/2025, 9:53 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7KZ000000okVK0AY",
        details: "Hi shenko​, In addition to @Sai Vikas T R​'s suggestion, below we have a VPK180 reference design in 2024.2, which will soon be pushed to the upstream repo. There have been a few changes in the device tree in 2024.2, so this ref design might",
        questionId: "0D7KZ000000okVK0AY"
    },
    {
        id: "CQ-0039",
        date: "4/7/2025, 9:45 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7KZ000000okUv0AI",
        details: "Hi aonkar​ , Does your PHY have an option to add skew on the RX clock? Please read the articles below on how this can be added: https://ethernetfmc.com/docs/ethernet-fmc/rgmii-timing/#:~:text=The%20RGMII%20standard%20specifies%",
        questionId: "0D7KZ000000okUv0AI"
    },
    {
        id: "CQ-0040",
        date: "4/1/2025, 8:48 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7KZ000000ohZn0AI",
        details: "ananda​ , How did you start your petalinux project? Did you use --template microblaze or versal, or a BSP?",
        questionId: "0D7KZ000000ohZn0AI"
    },
    {
        id: "CQ-0041",
        date: "4/1/2025, 8:37 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7KZ000000ohZ90AI",
        details: "Hi   Are packets dropping when the PC pings the RFSoC? Could you share the ifconfig output from the RFSoC side?   If you're experiencing packet drops, you may need to adjust networking rules, such as disabling reverse path",
        questionId: "0D7KZ000000ohZ90AI"
    },
    {
        id: "CQ-0042",
        date: "3/27/2025, 11:24 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D7KZ000000ofel0AA",
        details: "Hi , How did you create this design? Is this design based on the Vivado example design? Does the IBERT show the correct clock and rate? Does your application require a bare-metal design or plan to use Petalinux later? If us",
        questionId: "0D7KZ000000ofel0AA"
    },
    {
        id: "CQ-0043",
        date: "3/12/2025, 6:32 AM",
        year: 2025,
        url: "https://support.xilinx.com/s/question/0D74U000009x6WRSAY",
        details: "Hi, It should be possible to generate tcs files using this tool: https://www.renesas.",
        questionId: "0D74U000009x6WRSAY"
    },
    {
        id: "CQ-0044",
        date: "2/20/2025, 8:19 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000009x1IESAY",
        details: "Are you using GEM with RGMII PHY via MIO? You can enable the external FIFO interface in the GEM settings. Please note that the driver does not support external FIFO: https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18841740/Macb+Driver#Macb",
        questionId: "0D74U000009x1IESAY"
    },
    {
        id: "CQ-0045",
        date: "2/19/2025, 8:27 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000009x0yESAQ",
        details: "It sounds like your external PHY could be held in reset. Please use reset-gpios property to connect a PS-EMIO GPIO pin to your external PHY: https://github.com/Xilinx/linux-xlnx/blob/master/Documentation/devicetree/bindings/net/ethernet-p",
        questionId: "0D74U000009x0yESAQ"
    },
    {
        id: "CQ-0046",
        date: "2/19/2025, 8:22 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000009x0y4SAA",
        details: "Hi /p> May I please know which board you are using? We have various ethernet designs for the ZCU102 board that you could get ideas from here: https://github.com/Xilinx-Wiki-Projects/ZCU102-Ethernet In addition please check the lin",
        questionId: "0D74U000009x0y4SAA"
    },
    {
        id: "CQ-0047",
        date: "2/18/2025, 9:14 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000009x0g0SAA",
        details: "Hi /p> PG210 states \"refclk must be chosen so that the tx_serdes_refclk meets the requirements of 802.3, which is within 100 ppm of 390.625 MHz for 25G, 156.25 MHz for 64-bit 10G, and 312.5 MHz for 32-bit 10G.\" https://docs.am",
        questionId: "0D74U000009x0g0SAA"
    },
    {
        id: "CQ-0048",
        date: "2/18/2025, 8:58 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000009x0fvSAA",
        details: "Hi wda​  Please provide additional information. PS-GTR is connected to external PHY DP83867 with no MDIO? Please share your bootlog ( dmesg | grep macb ). decompiled device tree for this GEM. How are you i",
        questionId: "0D74U000009x0fvSAA"
    },
    {
        id: "CQ-0049",
        date: "2/18/2025, 8:48 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000009x0fqSAA",
        details: "Hi p> Please add IODELAY in your design as explained in PG051: \"The following figure shows that IODELAY elements are used by the receiver logic. An IDELAYCTRL module must therefore be instantiated in the design.\" https:/",
        questionId: "0D74U000009x0fqSAA"
    },
    {
        id: "CQ-0050",
        date: "2/18/2025, 8:27 AM",
        year: 2025,
        url: "https://support.xilinx.com/s/question/0D74U000009x0fWSAQ",
        details: "Hi an you reproduce this issue on the latest version of the BSP? I recommend building the BSP as-is changing the image recipe to petalinux-image-minimal. Once you verify you don't see that issue anymore, you can use your XSA to build the ne",
        questionId: "0D74U000009x0fWSAQ"
    },
    {
        id: "CQ-0051",
        date: "2/18/2025, 8:19 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000009x0fCSAQ",
        details: "Hi Looks like the MAC address issue is resolved with the updated system-user.dtsi?  Have you connected the QPLL reset to both cores? Usually, it gives a",
        questionId: "0D74U000009x0fCSAQ"
    },
    {
        id: "CQ-0052",
        date: "2/18/2025, 8:07 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000009x0enSAA",
        details: "nington​  Have you made any progress on this? What version of tools are you using? Can you reproduce this issue on the latest version if using an old version?",
        questionId: "0D74U000009x0enSAA"
    },
    {
        id: "CQ-0053",
        date: "1/30/2025, 8:45 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000009wvdjSAA",
        details: "What version are you using? Have you tried building and testing this on a recent version of tools? Not sure if you got a chance to go through the register dumps, but my observation is that you have a couple of extra features enabled like jumbo f",
        questionId: "0D74U000009wvdjSAA"
    },
    {
        id: "CQ-0054",
        date: "1/29/2025, 10:52 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000009wvLzSAI",
        details: "Can you please share ifconfig log for this interface? To see if there are any dropped packets. decompiled device tree (system.dtb located inside image dir, you can use dtc -I dtb -O dts -o <path to output> <pat",
        questionId: "0D74U000009wvLzSAI"
    },
    {
        id: "CQ-0055",
        date: "1/29/2025, 8:46 AM",
        year: 2025,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000009wvIvSAI",
        details: "Hi gton​  Looks like you using PS-GTR. You can ignore the \"unable to generate target frequency\" warning as the GT generates the clock and there were limitations in the CCF to prevent that warning. To help debug PS-GTR designs, w",
        questionId: "0D74U000009wvIvSAI"
    },
    {
        id: "CQ-0056",
        date: "11/26/2024, 6:38 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007untsSAA",
        details: "Hi on​, The design files have been sent to your FAE. Please contact them for assistance. If you have more questions, reach out here. If not, please accept the solution.",
        questionId: "0D74U000007untsSAA"
    },
    {
        id: "CQ-0057",
        date: "11/20/2024, 7:24 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007umHeSAI",
        details: "Hi on​, I have acquired the design files but we have some requirements of having NDA with the customers before we can release it. Do you know if you have an active NDA with AMD or Avnet?",
        questionId: "0D74U000007umHeSAI"
    },
    {
        id: "CQ-0058",
        date: "11/10/2024, 9:56 AM",
        year: 2024,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000007ujKqSAI",
        details: "What device are you using Versal/MPSoC/? Is it an eval board? We don't have a system-level example design using the TEMAC and PCS/PMA blocks for 2.5G. However, the AXI 1G/2.5G Ethernet subsystem is essentially TEMAC, PCS/PMA, and an Ethernet buffe",
        questionId: "0D74U000007ujKqSAI"
    },
    {
        id: "CQ-0059",
        date: "11/8/2024, 10:35 AM",
        year: 2024,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000007ui46SAA",
        details: "Please go through the GEM debug guide and provide register dump for all: https://ad",
        questionId: "0D74U000007ui46SAA"
    },
    {
        id: "CQ-0060",
        date: "11/8/2024, 7:50 AM",
        year: 2024,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000007ui1qSAA",
        details: "And regarding the is-internal-pcspma , https://adaptivesupport.amd.com/s/article/72674 AR72674 is a hack to poll the SGMII PCS link status even when there is no MDIO PHY registered externally and there is no solution for that in Lin",
        questionId: "0D74U000007ui1qSAA"
    },
    {
        id: "CQ-0061",
        date: "11/8/2024, 7:48 AM",
        year: 2024,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000007ui1lSAA",
        details: "  is-internal-pcspma  is not used by Linux drivers from 2022.1 onwards. Do you have a fixed-link property in your DT? If so, remove it so that it can complete the auto-negotiation. That patch is for the macb driver which bypasses the fi",
        questionId: "0D74U000007ui1lSAA"
    },
    {
        id: "CQ-0062",
        date: "11/8/2024, 7:04 AM",
        year: 2024,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000007ui0xSAA",
        details: "Please go through the GEM debug guide and share the register dump (registers to be read twice because of sticky bits): https://adaptivesupport.amd.com/s/article/1027406?language=en_US    ",
        questionId: "0D74U000007ui0xSAA"
    },
    {
        id: "CQ-0063",
        date: "11/8/2024, 6:59 AM",
        year: 2024,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000007ui0nSAA",
        details: "We have an example design for 2.5GE: https://github.com/Xilinx-Wiki-Projects/Versal-Ethernet/tree/master/VCK190-Ethernet/2023.2/pl_basex_2_5g",
        questionId: "0D74U000007ui0nSAA"
    },
    {
        id: "CQ-0064",
        date: "11/8/2024, 6:53 AM",
        year: 2024,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000007ui0dSAA",
        details: "What part are you using? For MPSoC US+, we have CMAC: https://www.xilinx.com/products/intellectual-property/cmac_usplus.html   Thank you, AJ",
        questionId: "0D74U000007ui0dSAA"
    },
    {
        id: "CQ-0065",
        date: "11/8/2024, 6:47 AM",
        year: 2024,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000007ui0YSAQ",
        details: "Looks like your PHY has AN enabled by default: The Atheros Smartspeed function is an enhanced feature of auto-negotiation that allows the AR8031 device to fall back in speed based on cabling conditions as well as operate over CAT3 cabling (in",
        questionId: "0D74U000007ui0YSAQ"
    },
    {
        id: "CQ-0066",
        date: "11/4/2024, 10:02 AM",
        year: 2024,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000007ugknSAA",
        details: "Hi HAKUMARIBABU​, Have you made any progress on this? Can you please provide your network topology? Is it a PS MIO/EMIO or PL-based design? What is the link partner? What's the iperf test look like?  We have different validated",
        questionId: "0D74U000007ugknSAA"
    },
    {
        id: "CQ-0067",
        date: "10/28/2024, 7:20 AM",
        year: 2024,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000007uetzSAA",
        details: "Hi  , If you still need help on this, please go through the GEM debug guide and share your reg dump: https://adaptivesupport.amd.com/s/article/1027406?language=en_US If the issue has been resolved, please mark this as solved.  ",
        questionId: "0D74U000007uetzSAA"
    },
    {
        id: "CQ-0068",
        date: "10/18/2024, 8:00 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007ucTzSAI",
        details: "Hi on​, We sincerely apologize for the delay. The release process is undergoing a thorough review by the legal team, and there are still steps that need to be completed before it can be made publicly available. The TRD team is awaiting final ap",
        questionId: "0D74U000007ucTzSAI"
    },
    {
        id: "CQ-0069",
        date: "9/26/2024, 6:21 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uX2DSAU",
        details: "We are still waiting for the legal sweep to be completed.",
        questionId: "0D74U000007uX2DSAU"
    },
    {
        id: "CQ-0070",
        date: "9/15/2024, 6:24 AM",
        year: 2024,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000007uTxZSAU",
        details: "A link you might find helpful: https://adaptivesupport.amd.com/s/question/0D52E00006hpcNqSAI/petalinux-20164-on-zcu102-resets-si570-mgt-to-1485-mhz-during-boot?language=en_US",
        questionId: "0D74U000007uTxZSAU"
    },
    {
        id: "CQ-0071",
        date: "9/15/2024, 6:22 AM",
        year: 2024,
        url: "https://adaptivesupport.amd.com/s/question/0D74U000007uTxUSAU",
        details: "Hi  , Sounds like you have already selected 125MHz on the HW side. Using this new XSA, can you rebuild the Petalinux by changing the system-user.dtsi? The ref clock is generated from the onboard Si570. https://github.com/Xilinx-Wiki-Proj",
        questionId: "0D74U000007uTxUSAU"
    },
    {
        id: "CQ-0072",
        date: "9/3/2024, 8:26 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uQrWSAU",
        details: "Share your XSA and I will try to build an image locally and get back to you.",
        questionId: "0D74U000007uQrWSAU"
    },
    {
        id: "CQ-0073",
        date: "9/3/2024, 8:07 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uQrCSAU",
        details: "Hi on​, I recently discovered that the design team is going through the final validation and is expected to complete the process in a few weeks. The website will be updated with a link once the process is completed. For SDI-related queries, ple",
        questionId: "0D74U000007uQrCSAU"
    },
    {
        id: "CQ-0074",
        date: "8/26/2024, 6:47 PM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uOwhSAE",
        details: "Please go through this; the user had similar issues to yourself explained at the end of the comments section. And they resolved it by overriding it via system-user.dtsi: https://support.xilinx.com/s/question/0D52E00006hprRnSAI/gmiitorgmii-driver",
        questionId: "0D74U000007uOwhSAE"
    },
    {
        id: "CQ-0075",
        date: "8/26/2024, 11:15 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uOs1SAE",
        details: "Here is an example from KR260 BSP: ./ ├── components │  └── plnx_workspace │    └── device-tree │      └── device-tree │        └── include │          └── dt-bindings │            ├── clock │      ",
        questionId: "0D74U000007uOs1SAE"
    },
    {
        id: "CQ-0076",
        date: "8/26/2024, 11:05 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uOrcSAE",
        details: "The resources are made available here: https://www.xilinx.com/support/nic-support.html https://www.xilinx.c",
        questionId: "0D74U000007uOrcSAE"
    },
    {
        id: "CQ-0077",
        date: "8/26/2024, 10:55 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uOrDSAU",
        details: "https://docs.amd.com/r/en-US/ug1144-petalinux-tools-reference-guide/Additional-BSP-Packaging-Options It puts the specified hardware project(Vivado) source to <plnx-proj-root>/hardware/ inside MY.BSP archive (and yes you could include XSA i",
        questionId: "0D74U000007uOrDSAU"
    },
    {
        id: "CQ-0078",
        date: "8/26/2024, 9:58 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uOpqSAE",
        details: "Hi Velasco​ , I am not very familiar with this IP so don't know if it works for a higher width, however, there might be a way you could change that parameter. Try to locate the file in the directory that contains the parameter that you are",
        questionId: "0D74U000007uOpqSAE"
    },
    {
        id: "CQ-0079",
        date: "8/26/2024, 9:51 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uOpSSAU",
        details: "Hi ark​  I see the issue you described. I am looking into this.",
        questionId: "0D74U000007uOpSSAU"
    },
    {
        id: "CQ-0080",
        date: "8/26/2024, 9:44 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uOpbSAE",
        details: "Hi Try petalinux-package -- prebuilt --fpga <BITSTREAM>",
        questionId: "0D74U000007uOpbSAE"
    },
    {
        id: "CQ-0081",
        date: "8/26/2024, 9:38 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uOpRSAU",
        details: "Hi ​, We have added resources regarding solarflare driver in the following area: https://www.xilinx.com/support/nic-support.html  ",
        questionId: "0D74U000007uOpRSAU"
    },
    {
        id: "CQ-0082",
        date: "8/26/2024, 9:29 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uOpHSAU",
        details: "Hi ar​ , Are you trying to use both PS and PL ethernet at the same? Trying to understand if you are having issues when you have both PS and PL ethernet enabled in the HW. Can you share your block diagram of your board? How many PHYs do you hav",
        questionId: "0D74U000007uOpHSAU"
    },
    {
        id: "CQ-0083",
        date: "8/22/2024, 7:38 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uNzASAU",
        details: "Hi ​,   As per the limitation section in the",
        questionId: "0D74U000007uNzASAU"
    },
    {
        id: "CQ-0084",
        date: "8/21/2024, 2:53 PM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uNjHSAU",
        details: "​ , try to use the wic file with balena etcher to prepare the SD card. petalinux-package --wic https://etcher.balena.io/",
        questionId: "0D74U000007uNjHSAU"
    },
    {
        id: "CQ-0085",
        date: "8/20/2024, 9:22 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uNH3SAM",
        details: "​, petalinux-config Change image packaging to petalinux-image-minimal petalinux-package --boot --fsbl images/linux/zynqmp_fsbl.elf --fpga images/linux/*.bit --pmufw images/linux/pmufw.elf --u-boot --force",
        questionId: "0D74U000007uNH3SAM"
    },
    {
        id: "CQ-0086",
        date: "8/20/2024, 6:43 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uNEDSA2",
        details: "Hi ​ ,   It looks like you already have built petalinux-image-minimal. Have you tried the petalinux-package command? petalinux-package --boot --fsbl images/linux/zynqmp_fsbl.elf --fpga images/linux/*.bit --pmufw ima",
        questionId: "0D74U000007uNEDSA2"
    },
    {
        id: "CQ-0087",
        date: "8/14/2024, 3:01 PM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uM3RSAU",
        details: "Hi ​ , Can you please try the solution explained here: https://support.xilinx.com/s/question/0D52E00006iHwVISA0/axi-ethernet-scattergather-mode-interrupt-example?language=en_US",
        questionId: "0D74U000007uM3RSAU"
    },
    {
        id: "CQ-0088",
        date: "8/9/2024, 1:25 PM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uL2wSAE",
        details: "​, you can use one of the pl_* designs from the link above (no CMAC) and use vitis to open an example design for LwIP TCP/IP: https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18842366/Standalone+LWIP+library You might also find this",
        questionId: "0D74U000007uL2wSAE"
    },
    {
        id: "CQ-0089",
        date: "8/9/2024, 1:19 PM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uL2cSAE",
        details: "Hi ​ , As Simreet mentioned the port is only available for GEM0. \"Is there any way we can give the PL access to the synchronized clock in GEM3?\" Can you utilize the PS GEM TSU register in the PL? https://suppo",
        questionId: "0D74U000007uL2cSAE"
    },
    {
        id: "CQ-0090",
        date: "8/6/2024, 12:22 PM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uKFkSAM",
        details: "Hi ​ , Are you able to ping between the boards? Is the ethernet working? If so, you could use the Vitis Vision library as suggested.",
        questionId: "0D74U000007uKFkSAM"
    },
    {
        id: "CQ-0091",
        date: "8/6/2024, 12:18 PM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uKFVSA2",
        details: "Hi ​ , We are working on upgrading those designs, please try the 2024.1 from the repo below: https://github.com/ajayadaha1/VCK190-Ethernet",
        questionId: "0D74U000007uKFVSA2"
    },
    {
        id: "CQ-0092",
        date: "7/12/2024, 9:52 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007uDh1SAE",
        details: "Just to add findings from the SR:   To clarify, the GMII2SGMII is a proper PHY, while the GMII2RGMII is a bridge. For the PCS/PMA SGMII core, the GMII_ISOLATE needs to be asserted when a PHY powers up. The GMII_ISOLATE specification",
        questionId: "0D74U000007uDh1SAE"
    },
    {
        id: "CQ-0093",
        date: "5/13/2024, 10:13 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000007twAzSAI",
        details: "Hi ​,  That's great! Please mark this close.",
        questionId: "0D74U000007twAzSAI"
    },
    {
        id: "CQ-0094",
        date: "4/25/2024, 10:03 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000008IvAfSAK",
        details: "Hi ​, Please share your findings after going through GEM PS-GTR SGMII : https://support.xilinx.com/s/article/1027406?language=en_US Also, you could try to probe the PHY using the PHY Management Register : https://docs.amd",
        questionId: "0D74U000008IvAfSAK"
    },
    {
        id: "CQ-0095",
        date: "4/19/2024, 9:03 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000008ItPlSAK",
        details: "Hi ​ , Can you please try to modify your device tree with a separate mdio node as done here: https://support.xilinx.com/s/question/0D52E00006hpaalSAA/dual-marvell-88e1512-phy-ethernet-problem-xilinx-linux?language=en_US  ",
        questionId: "0D74U000008ItPlSAK"
    },
    {
        id: "CQ-0096",
        date: "4/18/2024, 8:33 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000008It32SAC",
        details: "Hi ​ , You could use our 10G/25G core and a 10G SFP module. We have an example design in the following link for ZCU102: https://github.com/Xilinx-Wiki-Projects/ZCU102-Ethernet/tree/main/2019.2/pl_eth_10g   You can find more inf",
        questionId: "0D74U000008It32SAC"
    },
    {
        id: "CQ-0097",
        date: "4/17/2024, 10:33 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000008IsjqSAC",
        details: "The RPU and APU are components of two distinct systems and typically do not share an interrupt controller. The GEM typically has a single SPI. If an interrupt source connected to this SPI is registered with both processors, a race condition may occur",
        questionId: "0D74U000008IsjqSAC"
    },
    {
        id: "CQ-0098",
        date: "4/17/2024, 10:22 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000008IsjgSAC",
        details: "Hi, Can you confirm your PHY address is correct? Please go through this link to debug this issue: https://support.xilinx.com/s/article/1027406?language=en_US   Thank you, Ajaya Dahal",
        questionId: "0D74U000008IsjgSAC"
    },
    {
        id: "CQ-0099",
        date: "3/28/2024, 8:56 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000008In0eSAC",
        details: "Hi Marc, Please go through the possible design with our available ethernet IPs in the following link. This is for Zynq MPSoC but it is relevant to Versal as well.",
        questionId: "0D74U000008In0eSAC"
    },
    {
        id: "CQ-0100",
        date: "3/25/2024, 8:29 AM",
        year: 2024,
        url: "https://support.xilinx.com/s/question/0D74U000008vOb3SAE",
        details: "Hi, When using the TEMAC core with an internal interface option, this core is used with PCS/PMA (PG047) in MAC mode. Or with PHY Interface selected to GMII that can then be connected to an external PHY. Please review the links below:",
        questionId: "0D74U000008vOb3SAE"
    },
    {
        id: "CQ-0101",
        date: "9/18/2023, 7:13 AM",
        year: 2023,
        url: "https://support.xilinx.com/s/question/0D74U000008cQz1SAE",
        details: "Hi Sylvain, Thank you for your suggestion. We are working on upgrading our ZCU102 GitHub repo. For your Petalinux project, please check our wiki to make sure you have configured the kernel correctly:",
        questionId: "0D74U000008cQz1SAE"
    },
    {
        id: "CQ-0102",
        date: "9/12/2023, 7:01 AM",
        year: 2023,
        url: "https://support.xilinx.com/s/question/0D74U000008cP4GSAU",
        details: "Hi Sylvain, The first issue looks like it is due to the DDR4 SODIM change. Please see the Design Advisory for Zynq UltraScale+ MPSoC ZCU102 and ZCU106 Evaluation Kits - DDR4 SODIMM change here:",
        questionId: "0D74U000008cP4GSAU"
    }
];
