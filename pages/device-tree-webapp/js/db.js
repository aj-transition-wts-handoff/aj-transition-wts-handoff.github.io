// Device Tree Database - Hardware configurations extracted from parent ethernet-interfaces.html
// This database contains actual hardware data for ZCU102/KR260/KD240 boards across multiple Vivado versions

export const ETHERNET_DB = {
  "2020.1/zcu102": {
    "version": "2020.1",
    "design": "zcu102",
    "board": "zcu102",
    "ethernet_nodes": [
      {
        "name": "ethernet@ff0e0000",
        "compatible": "cdns,zynqmp-gem\\0cdns,gem",
        "status": "okay",
        "interrupt-parent": "0x04",
        "interrupts": "0x00 0x3f 0x04 0x00 0x3f 0x04",
        "reg": "0x00 0xff0e0000 0x00 0x1000",
        "clock-names": "pclk\\0hclk\\0tx_clk\\0rx_clk\\0tsu_clk",
        "#address-cells": "0x01",
        "#size-cells": "0x00",
        "#stream-id-cells": "0x01",
        "iommus": "0x0e 0x877",
        "power-domains": "0x0c 0x20",
        "clocks": "0x03 0x1f 0x03 0x6b 0x03 0x30 0x03 0x34 0x03 0x2c",
        "phy-handle": "0x0f",
        "pinctrl-names": "default",
        "pinctrl-0": "0x10",
        "phy-mode": "rgmii-id",
        "xlnx,ptp-enet-clock": "0x00",
        "local-mac-address": "[00 0a 35 00 22 01]",
        "phandle": "0x71",
        "nodeType": "PS GEM3 (EMIO)",
        "phy_nodes": [
          {
            "name": "ethernet-phy@c",
            "reg": "0x0c",
            "ti,rx-internal-delay": "0x08",
            "ti,tx-internal-delay": "0x0a",
            "ti,fifo-depth": "0x01",
            "ti,dp83867-rxctrl-strap-quirk": true,
            "phandle": "0x0f"
          }
        ]
      },
      {
        "name": "ethernet@a0040000",
        "axistream-connected": "0x3a",
        "axistream-control-connected": "0x3a",
        "clock-frequency": "0x5f5e100",
        "clock-names": "rx_core_clk\\0dclk\\0s_axi_aclk\\0s_axi_lite_aclk\\0m_axi_sg_aclk\\0m_axi_mm2s_aclk\\0m_axi_s2mm_aclk",
        "clocks": "0x39 0x03 0x47 0x03 0x47 0x03 0x47 0x03 0x47 0x39 0x39",
        "compatible": "xlnx,xxv-ethernet-3.2\\0xlnx,xxv-ethernet-1.0",
        "device_type": "network",
        "local-mac-address": "[00 0a 35 00 00 01]",
        "phy-mode": "base-r",
        "reg": "0x00 0xa0040000 0x00 0x40000",
        "xlnx": "0x00",
        "xlnx,add-gt-cntrl-sts-ports": "0x00",
        "xlnx,anlt-clk-in-mhz": "0x64",
        "xlnx,axis-tdata-width": "0x40",
        "xlnx,axis-tkeep-width": "0x07",
        "xlnx,base-r-kr": "BASE-R",
        "xlnx,clocking": "Asynchronous",
        "xlnx,cmac-core-select": "CMACE4_X0Y0",
        "xlnx,core": "Ethernet MAC+PCS/PMA 64-bit",
        "xlnx,data-path-interface": "AXI Stream",
        "xlnx,enable-datapath-parity": "0x00",
        "xlnx,enable-pipeline-reg": "0x00",
        "xlnx,enable-preemption": "0x00",
        "xlnx,enable-preemption-fifo": "0x00",
        "xlnx,enable-rx-flow-control-logic": "0x00",
        "xlnx,enable-time-stamping": "0x00",
        "xlnx,enable-tx-flow-control-logic": "0x00",
        "xlnx,enable-vlane-adjust-mode": "0x00",
        "xlnx,family-chk": "zynquplus",
        "xlnx,fast-sim-mode": "0x00",
        "xlnx,gt-diffctrl-width": "0x04",
        "xlnx,gt-drp-clk": "100.00",
        "xlnx,gt-group-select": "Quad X0Y0",
        "xlnx,gt-location": "0x01",
        "xlnx,gt-ref-clk-freq": "156.25",
        "xlnx,gt-type": "GTH",
        "xlnx,gtm-group-select": "NA",
        "xlnx,include-auto-neg-lt-logic": "None",
        "xlnx,include-axi4-interface": "0x01",
        "xlnx,include-dre": true,
        "xlnx,include-fec-logic": "0x00",
        "xlnx,include-hybrid-cmac-rsfec-logic": "0x00",
        "xlnx,include-rsfec-logic": "0x00",
        "xlnx,include-shared-logic": "0x01",
        "xlnx,include-statistics-counters": "0x01",
        "xlnx,include-user-fifo": "0x01",
        "xlnx,ins-loss-nyq": "0x1e",
        "xlnx,lane1-gt-loc": "X1Y14",
        "xlnx,lane2-gt-loc": "NA",
        "xlnx,lane3-gt-loc": "NA",
        "xlnx,lane4-gt-loc": "NA",
        "xlnx,line-rate": "0x0a",
        "xlnx,mii-ctrl-width": "0x04",
        "xlnx,mii-data-width": "0x20",
        "xlnx,num-of-cores": "0x01",
        "xlnx,ptp-clocking-mode": "0x00",
        "xlnx,ptp-operation-mode": "0x02",
        "xlnx,runtime-switch": "0x00",
        "xlnx,rx-eq-mode": "AUTO",
        "xlnx,rxmem": "0x40000",
        "xlnx,statistics-regs-type": "0x00",
        "xlnx,switch-1-10-25g": "0x00",
        "xlnx,tx-latency-adjust": "0x00",
        "xlnx,tx-total-bytes-width": "0x04",
        "xlnx,xgmii-interface": "0x01",
        "phandle": "0xa4",
        "nodeType": "PL Ethernet (10G/25G)",
        "status": "okay",
        "mdio": {
          "name": "mdio",
          "#address-cells": "0x01",
          "#size-cells": "0x00",
          "phandle": "0xa5"
        }
      }
    ],
    "count": 2
  },
  "2024.1/zcu102": {
    "version": "2024.1",
    "design": "zcu102",
    "board": "zcu102",
    "ethernet_nodes": [
      {
        "name": "ethernet@ff0e0000",
        "compatible": "xlnx,zynqmp-gem\\0cdns,gem",
        "status": "okay",
        "reg": "0x00 0xff0e0000 0x00 0x1000",
        "phy-mode": "rgmii-id",
        "nodeType": "PS GEM3 (MIO)",
        "phy_nodes": [
          {
            "name": "ethernet-phy@c",
            "reg": "0x0c",
            "phandle": "0x15"
          }
        ]
      }
    ],
    "count": 1
  },
  "2023.2/zcu102": {
    "version": "2023.2",
    "design": "zcu102",
    "board": "zcu102",
    "ethernet_nodes": [
      {
        "name": "ethernet@ff0e0000",
        "compatible": "xlnx,zynqmp-gem\\0cdns,gem",
        "status": "okay",
        "reg": "0x00 0xff0e0000 0x00 0x1000",
        "phy-mode": "rgmii-id",
        "nodeType": "PS GEM",
        "phy_nodes": [
          {
            "name": "ethernet-phy@c",
            "reg": "0x0c",
            "ti,rx-internal-delay": "0x08",
            "ti,tx-internal-delay": "0x0a",
            "ti,fifo-depth": "0x01",
            "ti,dp83867-rxctrl-strap-quirk": true,
            "phandle": "0x15"
          }
        ]
      }
    ],
    "count": 1
  },
  "2025.1/zcu102": {
    "version": "2025.1",
    "design": "zcu102",
    "board": "zcu102",
    "ethernet_nodes": [
      {
        "name": "ethernet@ff0e0000",
        "compatible": "xlnx,zynqmp-gem\\0cdns,gem",
        "status": "okay",
        "reg": "0x00 0xff0e0000 0x00 0x1000",
        "phy-mode": "rgmii-id",
        "nodeType": "PS GEM3 (MIO)",
        "phy_nodes": [
          {
            "name": "ethernet-phy@c",
            "reg": "0x0c",
            "phandle": "0x15"
          }
        ]
      }
    ],
    "count": 1
  },
  "2025.1/kd240": {
    "version": "2025.1",
    "design": "kd240",
    "board": "kd240",
    "ethernet_nodes": [
      {
        "name": "ethernet@ff0c0000",
        "phy-handle": "0x187",
        "assigned-clock-rates": "0xee6b280",
        "pinctrl-0": "0x186",
        "pinctrl-names": "default",
        "compatible": "xlnx,zynqmp-gem\\0cdns,gem",
        "status": "okay",
        "interrupt-parent": "0x0e",
        "interrupts": "0x00 0x3b 0x04 0x00 0x3b 0x04",
        "reg": "0x00 0xff0c0000 0x00 0x1000",
        "clock-names": "pclk\\0hclk\\0tx_clk\\0rx_clk\\0tsu_clk",
        "power-domains": "0x7c 0x1e",
        "resets": "0x03 0x1e",
        "reset-names": "gem1_rst",
        "clocks": "0x73 0x1f 0x73 0x69 0x73 0x2e 0x73 0x32 0x73 0x2c",
        "assigned-clocks": "0x73 0x2c",
        "xlnx,is-cache-coherent": "0x00",
        "xlnx,has-mdio": "0x2faf080",
        "xlnx,gem-board-interface": "custom",
        "phy-mode": "rgmii-id",
        "xlnx,tz-nonsecure": "0x01",
        "xlnx,enet-slcr-1000mbps-div0": "0x08",
        "xlnx,enet-slcr-10mbps-div0": "0x32",
        "xlnx,enet-slcr-1000mbps-div1": "0x01",
        "xlnx,enet-slcr-10mbps-div1": "0x08",
        "xlnx,enet-tsu-clk-freq-hz": "0xee6a8ba",
        "xlnx,ip-name": "psu_ethernet",
        "xlnx,eth-mode": "0x01",
        "xlnx,enet-reset": "0x2faf080",
        "xlnx,enet-clk-freq-hz": "0x773545d",
        "xlnx,enet-slcr-100mbps-div0": "0x28",
        "xlnx,ptp-enet-clock": "0x00",
        "xlnx,enet-slcr-100mbps-div1": "0x01",
        "phandle": "0x39",
        "nodeType": "PS GEM",
        "mdio": {
          "name": "mdio",
          "phandle": "0x18c",
          "#size-cells": "0x00",
          "#address-cells": "0x01",
          "phy_nodes": [
            {
              "name": "ethernet-phy@8",
              "phandle": "0x187",
              "reset-gpios": "0x47 0x4d 0x01",
              "reset-deassert-us": "0x1388",
              "reset-assert-us": "0x0a",
              "adi,fifo-depth-bits": "0x08",
              "adi,tx-internal-delay-ps": "0x7d0",
              "adi,rx-internal-delay-ps": "0x7d0",
              "reg": "0x08",
              "compatible": "ethernet-phy-id0283.bc30",
              "#phy-cells": "0x01"
            }
          ]
        }
      }
    ],
    "count": 1
  },
  "2025.1/kr260": {
    "version": "2025.1",
    "design": "kr260",
    "board": "kr260",
    "ethernet_nodes": [
      {
        "name": "ethernet@ff0b0000",
        "assigned-clock-rates": "0xee6b280",
        "phy-handle": "0x18f",
        "phys": "0x62 0x00 0x08 0x00 0x00",
        "compatible": "xlnx,zynqmp-gem\\0cdns,gem",
        "status": "okay",
        "interrupt-parent": "0x0f",
        "interrupts": "0x00 0x39 0x04 0x00 0x39 0x04",
        "reg": "0x00 0xff0b0000 0x00 0x1000",
        "clock-names": "pclk\\0hclk\\0tx_clk\\0rx_clk\\0tsu_clk",
        "power-domains": "0x7e 0x1d",
        "resets": "0x03 0x1d",
        "reset-names": "gem0_rst",
        "clocks": "0x75 0x1f 0x75 0x68 0x75 0x2d 0x75 0x31 0x75 0x2c",
        "assigned-clocks": "0x75 0x2c",
        "xlnx,is-cache-coherent": "0x00",
        "xlnx,has-mdio": "0x2faf080",
        "xlnx,gem-board-interface": "custom",
        "phy-mode": "sgmii",
        "xlnx,tz-nonsecure": "0x01",
        "xlnx,enet-slcr-1000mbps-div0": "0x08",
        "xlnx,enet-slcr-10mbps-div0": "0x32",
        "xlnx,enet-slcr-1000mbps-div1": "0x01",
        "xlnx,enet-slcr-10mbps-div1": "0x08",
        "xlnx,enet-tsu-clk-freq-hz": "0xee6a8ba",
        "xlnx,ip-name": "psu_ethernet",
        "xlnx,eth-mode": "0x02",
        "xlnx,enet-reset": "0x2faf080",
        "xlnx,enet-clk-freq-hz": "0x773545d",
        "phy-mode": "sgmii",
        "nodeType": "PS GEM",
        "phandle": "0x38"
      }
    ],
    "count": 1
  }
};
