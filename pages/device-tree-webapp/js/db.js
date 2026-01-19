/**
 * ETHERNET DEVICE TREE DATABASE
 * 
 * Architecture: Template Inheritance Model
 * - Templates: Generic DTS skeletons with {{PLACEHOLDERS}}
 * - Families: Chip-level defaults (ZynqMP, Versal, Kria)
 * - Boards: Hardware-specific configuration variables
 * - Quirks: Version-aware mutation logic (2020.1 - 2024.2)
 * 
 * Source: Comprehensive Audit of Xilinx Kernel Bindings
 */

// ============================================================================
// TEMPLATES (The Skeletons)
// ============================================================================

export const ETHERNET_DB = {
    templates: {
        /**
         * ZynqMP GEM Template (MPSoC Standard PS Ethernet)
         * Compatible: xlnx,zynqmp-gem
         * Used by: ZCU102, ZCU104, ZCU106, Ultra96-V2
         */
        zynqmp_gem: `&{{GEM_NODE}} {
    status = "okay";
    phy-handle = <&{{PHY_LABEL}}>;
    phy-mode = "{{PHY_MODE}}";
{{EXTRA_PROPS}}
    mdio {
        #address-cells = <1>;
        #size-cells = <0>;
        
        {{PHY_LABEL}}: ethernet-phy@{{PHY_ADDR}} {
            reg = <{{PHY_ADDR}}>;
            compatible = "{{PHY_COMPATIBLE}}";
{{PHY_DELAYS}}
        };
    };
};`,

        /**
         * Versal GEM Template (Versal Standard PS Ethernet)
         * Compatible: xlnx,versal-gem
         * Used by: VCK190, VMK180
         * MANDATORY: xlnx,ptp-enet-clock property
         */
        versal_gem: `&{{GEM_NODE}} {
    status = "okay";
    phy-handle = <&{{PHY_LABEL}}>;
    phy-mode = "{{PHY_MODE}}";
{{EXTRA_PROPS}}
    mdio {
        #address-cells = <1>;
        #size-cells = <0>;
        
        {{PHY_LABEL}}: ethernet-phy@{{PHY_ADDR}} {
            reg = <{{PHY_ADDR}}>;
            compatible = "{{PHY_COMPATIBLE}}";
{{PHY_DELAYS}}
        };
    };
};`,

        /**
         * AXI Ethernet Template (PL-based 1G/10G/25G)
         * Compatible: xlnx,axi-ethernet-[version]
         * Used by: Custom PL designs
         */
        axi_ethernet: `{{AXI_NODE}}: ethernet@{{AXI_BASE_ADDR}} {
    compatible = "xlnx,axi-ethernet-7.2", "xlnx,axi-ethernet-1.00.a";
    device_type = "network";
    reg = <0x0 {{AXI_BASE_ADDR}} 0x0 0x40000>;
    interrupt-parent = <&gic>;
    interrupts = <0 {{IRQ_NUM}} 4>;
    phy-mode = "{{PHY_MODE}}";
    phy-handle = <&{{PHY_LABEL}}>;
    xlnx,rxmem = <0x1000>;
    xlnx,txcsum = <0x2>;
    xlnx,rxcsum = <0x2>;
    status = "okay";
{{EXTRA_PROPS}}
    mdio {
        #address-cells = <1>;
        #size-cells = <0>;
        
        {{PHY_LABEL}}: ethernet-phy@{{PHY_ADDR}} {
            reg = <{{PHY_ADDR}}>;
            compatible = "{{PHY_COMPATIBLE}}";
{{PHY_DELAYS}}
        };
    };
};`
    },

    // ========================================================================
    // FAMILIES (Chip-Level Defaults)
    // ========================================================================

    families: {
        zynqmp: {
            gem_compatible: "xlnx,zynqmp-gem",
            phy_compatible: "ethernet-phy-id2000.a231", // TI DP83867
            requires_ptp_clock: false,
            default_phy_mode: "rgmii-id"
        },
        versal: {
            gem_compatible: "xlnx,versal-gem",
            phy_compatible: "ethernet-phy-id2000.a231", // TI DP83867
            requires_ptp_clock: true, // MANDATORY for Versal
            default_phy_mode: "rgmii-id"
        },
        kria: {
            gem_compatible: "xlnx,zynqmp-gem",
            phy_compatible: "ethernet-phy-id2000.a231", // TI DP83867
            requires_ptp_clock: false,
            default_phy_mode: "rgmii-id"
        }
    },

    // ========================================================================
    // BOARDS (Hardware-Specific "DNA")
    // ========================================================================
    // Schema: Multi-Interface Support
    // Each board can have multiple ethernet interfaces (PS GEM, PL Ethernet, etc.)

    boards: {
        zcu102: {
            name: "ZCU102",
            family: "zynqmp",
            description: "MPSoC ZCU102 Evaluation Kit",
            interfaces: [
                {
                    id: "ps_gem0",
                    type: "ps_gem",
                    label: "Cadence Gigabit Ethernet MAC",
                    template: "zynqmp_gem",
                    gem_node: "gem0",
                    phy_addr: "0x1",
                    phy_label: "phy1",
                    phy_mode: "rgmii-id",
                    phy_model: "ethernet-phy-ieee802.3-c22",
                    phy_compatible: "ethernet-phy-ieee802.3-c22",
                    interface_type: "EMIO",
                    note: "Available for PL-based ethernet via EMIO. "
                },
                {
                    id: "ps_gem1",
                    type: "ps_gem",
                    label: "Cadence Gigabit Ethernet MAC",
                    template: "zynqmp_gem",
                    gem_node: "gem1",
                    phy_addr: "0x2",
                    phy_label: "phy2",
                    phy_mode: "rgmii-id",
                    phy_model: "ethernet-phy-ieee802.3-c22",
                    phy_compatible: "ethernet-phy-ieee802.3-c22",
                    interface_type: "EMIO",
                    note: "Available for PL-based ethernet via EMIO. "
                },
                {
                    id: "ps_gem2",
                    type: "ps_gem",
                    label: "Cadence Gigabit Ethernet MAC",
                    template: "zynqmp_gem",
                    gem_node: "gem2",
                    phy_addr: "0x3",
                    phy_label: "phy3",
                    phy_mode: "rgmii-id",
                    phy_model: "ethernet-phy-ieee802.3-c22",
                    phy_compatible: "ethernet-phy-ieee802.3-c22",
                    interface_type: "EMIO",
                    note: "Available for PL-based ethernet via EMIO. "
                },
                {
                    id: "ps_gem3",
                    type: "ps_gem",
                    label: "Hardwired to onboard TI DP83867 PHY via MIO pins",
                    template: "zynqmp_gem",
                    gem_node: "gem3",
                    phy_addr: "0xc",
                    phy_label: "phy0",
                    phy_mode: "rgmii-id",
                    phy_model: "ti,dp83867",
                    phy_compatible: "ethernet-phy-id2000.a231",
                    interface_type: "MIO",
                    locked: true,
                    reset_gpio: "&gpio 38 0",
                    note: "Hardware Fixed - This ethernet connection is hardwired on the board and cannot be reconfigured"
                },
                {
                    id: "pl_axi_1g",
                    type: "pl_ethernet",
                    label: "AXI 1G/2.5G Ethernet",
                    template: "axi_ethernet",
                    axi_node: "axi_ethernet_0",
                    axi_base_addr: "0xa0000000",
                    phy_mode: "sgmii",
                    interface_type: "PL",
                    note: "AXI 1G/2.5G Ethernet Subsystem with 1G/2.5G PCS/PMA under the hood. "
                },
                {
                    id: "pl_10g",
                    type: "pl_ethernet",
                    label: "PL 10G Ethernet",
                    template: "axi_ethernet",
                    axi_node: "axi_ethernet_10g",
                    axi_base_addr: "0xa4000000",
                    phy_mode: "10gbase-r",
                    interface_type: "SFP+",
                    note: "10GBASE-R SerDes - No MDIO/PHY"
                }
            ]
        },

        zcu104: {
            name: "ZCU104",
            family: "zynqmp",
            description: "MPSoC ZCU104 Evaluation Kit",
            interfaces: [
                {
                    id: "ps_gem0",
                    type: "ps_gem",
                    label: "Cadence Gigabit Ethernet MAC",
                    template: "zynqmp_gem",
                    gem_node: "gem0",
                    phy_addr: "0x1",
                    phy_label: "phy1",
                    phy_mode: "rgmii-id",
                    phy_model: "ethernet-phy-ieee802.3-c22",
                    phy_compatible: "ethernet-phy-ieee802.3-c22",
                    interface_type: "EMIO",
                    note: "Available for PL-based ethernet via EMIO. "
                },
                {
                    id: "ps_gem1",
                    type: "ps_gem",
                    label: "Cadence Gigabit Ethernet MAC",
                    template: "zynqmp_gem",
                    gem_node: "gem1",
                    phy_addr: "0x2",
                    phy_label: "phy2",
                    phy_mode: "rgmii-id",
                    phy_model: "ethernet-phy-ieee802.3-c22",
                    phy_compatible: "ethernet-phy-ieee802.3-c22",
                    interface_type: "EMIO",
                    note: "Available for PL-based ethernet via EMIO. "
                },
                {
                    id: "ps_gem2",
                    type: "ps_gem",
                    label: "Cadence Gigabit Ethernet MAC",
                    template: "zynqmp_gem",
                    gem_node: "gem2",
                    phy_addr: "0x3",
                    phy_label: "phy3",
                    phy_mode: "rgmii-id",
                    phy_model: "ethernet-phy-ieee802.3-c22",
                    phy_compatible: "ethernet-phy-ieee802.3-c22",
                    interface_type: "EMIO",
                    note: "Available for PL-based ethernet via EMIO. "
                },
                {
                    id: "ps_gem3",
                    type: "ps_gem",
                    label: "Hardwired to onboard TI DP83867 PHY via MIO pins",
                    template: "zynqmp_gem",
                    gem_node: "gem3",
                    phy_addr: "0xc",
                    phy_label: "phy0",
                    phy_mode: "rgmii-id",
                    phy_model: "ti,dp83867",
                    phy_compatible: "ethernet-phy-id2000.a231",
                    interface_type: "MIO",
                    locked: true,
                    reset_gpio: "&gpio 38 0",
                    note: "Hardware Fixed - This ethernet connection is hardwired on the board and cannot be reconfigured"
                },
                {
                    id: "pl_axi_1g",
                    type: "pl_ethernet",
                    label: "AXI 1G/2.5G Ethernet",
                    template: "axi_ethernet",
                    axi_node: "axi_ethernet_0",
                    axi_base_addr: "0xa0000000",
                    phy_mode: "sgmii",
                    interface_type: "PL",
                    note: "AXI 1G/2.5G Ethernet Subsystem with 1G/2.5G PCS/PMA under the hood. "
                },
                {
                    id: "pl_10g",
                    type: "pl_ethernet",
                    label: "PL 10G Ethernet",
                    template: "axi_ethernet",
                    axi_node: "axi_ethernet_10g",
                    axi_base_addr: "0xa4000000",
                    phy_mode: "10gbase-r",
                    interface_type: "SFP+",
                    note: "10GBASE-R SerDes - No MDIO/PHY"
                }
            ]
        },

        zcu106: {
            name: "ZCU106",
            family: "zynqmp",
            description: "MPSoC ZCU106 Evaluation Kit",
            interfaces: [
                {
                    id: "ps_gem0",
                    type: "ps_gem",
                    label: "Cadence Gigabit Ethernet MAC",
                    template: "zynqmp_gem",
                    gem_node: "gem0",
                    phy_addr: "0x1",
                    phy_label: "phy1",
                    phy_mode: "rgmii-id",
                    phy_model: "ethernet-phy-ieee802.3-c22",
                    phy_compatible: "ethernet-phy-ieee802.3-c22",
                    interface_type: "EMIO",
                    note: "Available for PL-based ethernet via EMIO. "
                },
                {
                    id: "ps_gem1",
                    type: "ps_gem",
                    label: "Cadence Gigabit Ethernet MAC",
                    template: "zynqmp_gem",
                    gem_node: "gem1",
                    phy_addr: "0x2",
                    phy_label: "phy2",
                    phy_mode: "rgmii-id",
                    phy_model: "ethernet-phy-ieee802.3-c22",
                    phy_compatible: "ethernet-phy-ieee802.3-c22",
                    interface_type: "EMIO",
                    note: "Available for PL-based ethernet via EMIO. "
                },
                {
                    id: "ps_gem2",
                    type: "ps_gem",
                    label: "Cadence Gigabit Ethernet MAC",
                    template: "zynqmp_gem",
                    gem_node: "gem2",
                    phy_addr: "0x3",
                    phy_label: "phy3",
                    phy_mode: "rgmii-id",
                    phy_model: "ethernet-phy-ieee802.3-c22",
                    phy_compatible: "ethernet-phy-ieee802.3-c22",
                    interface_type: "EMIO",
                    note: "Available for PL-based ethernet via EMIO. "
                },
                {
                    id: "ps_gem3",
                    type: "ps_gem",
                    label: "Hardwired to onboard TI DP83867 PHY via MIO pins",
                    template: "zynqmp_gem",
                    gem_node: "gem3",
                    phy_addr: "0xc",
                    phy_label: "phy0",
                    phy_mode: "rgmii-id",
                    phy_model: "ti,dp83867",
                    phy_compatible: "ethernet-phy-id2000.a231",
                    interface_type: "MIO",
                    locked: true,
                    reset_gpio: "&gpio 38 0",
                    note: "Hardware Fixed - This ethernet connection is hardwired on the board and cannot be reconfigured"
                },
                {
                    id: "pl_axi_1g",
                    type: "pl_ethernet",
                    label: "AXI 1G/2.5G Ethernet",
                    template: "axi_ethernet",
                    axi_node: "axi_ethernet_0",
                    axi_base_addr: "0xa0000000",
                    phy_mode: "sgmii",
                    interface_type: "PL",
                    note: "AXI 1G/2.5G Ethernet Subsystem with 1G/2.5G PCS/PMA under the hood. "
                },
                {
                    id: "pl_10g",
                    type: "pl_ethernet",
                    label: "PL 10G Ethernet",
                    template: "axi_ethernet",
                    axi_node: "axi_ethernet_10g",
                    axi_base_addr: "0xa4000000",
                    phy_mode: "10gbase-r",
                    interface_type: "SFP+",
                    note: "10GBASE-R SerDes - No MDIO/PHY"
                }
            ]
        },

        ultra96v2: {
            name: "Ultra96-V2",
            family: "zynqmp",
            description: "Avnet Ultra96-V2",
            interfaces: [
                {
                    id: "ps_gem3",
                    type: "ps_gem",
                    label: "PS GEM3 (RGMII)",
                    template: "zynqmp_gem",
                    gem_node: "gem3",
                    phy_addr: "0x4",
                    phy_label: "phy0",
                    phy_mode: "rgmii-id",
                    phy_model: "micron,ksz9031",
                    phy_compatible: "ethernet-phy-ieee802.3-c22",
                    interface_type: "MIO"
                }
            ]
        },

        kr260: {
            name: "KR260",
            family: "kria",
            description: "Kria KR260 Robotics Starter Kit (Multi-Interface)",
            carrier_note: "Official Xilinx Carrier Card - 3x Ethernet Interfaces",
            interfaces: [
                {
                    id: "ps_gem0_sgmii",
                    type: "ps_gem",
                    label: "Hardwired for SGMII over GTR transceivers",
                    template: "zynqmp_gem",
                    gem_node: "gem0",
                    phy_addr: "0x4",
                    phy_label: "phy4",
                    phy_mode: "sgmii",
                    phy_model: "ti,dp83867",
                    phy_compatible: "ethernet-phy-id2000.a231",
                    interface_type: "GTR",
                    locked: true,
                    note: "Hardware Fixed - This ethernet connection is hardwired on the board and cannot be reconfigured"
                },
                {
                    id: "ps_gem1_rgmii",
                    type: "ps_gem",
                    label: "Hardwired to onboard TI DP83867 PHY via MIO pins",
                    template: "zynqmp_gem",
                    gem_node: "gem1",
                    phy_addr: "0x8",
                    phy_label: "phy8",
                    phy_mode: "rgmii-id",
                    phy_model: "ti,dp83867",
                    phy_compatible: "ethernet-phy-id2000.a231",
                    interface_type: "MIO",
                    locked: true,
                    reset_gpio: "&gpio 44 0",
                    note: "Hardware Fixed - This ethernet connection is hardwired on the board and cannot be reconfigured"
                },
                {
                    id: "ps_gem2_emio",
                    type: "ps_gem",
                    label: "Cadence Gigabit Ethernet MAC",
                    template: "zynqmp_gem",
                    gem_node: "gem2",
                    phy_addr: "0x3",
                    phy_label: "phy3",
                    phy_mode: "rgmii-id",
                    phy_model: "ethernet-phy-ieee802.3-c22",
                    phy_compatible: "ethernet-phy-ieee802.3-c22",
                    interface_type: "EMIO",
                    note: "Available for PL-based ethernet via EMIO. Can be used with PL PCS/PMA for SFP+ connectivity."
                },
                {
                    id: "ps_gem3_emio",
                    type: "ps_gem",
                    label: "Cadence Gigabit Ethernet MAC",
                    template: "zynqmp_gem",
                    gem_node: "gem3",
                    phy_addr: "0x4",
                    phy_label: "phy4",
                    phy_mode: "rgmii-id",
                    phy_model: "ethernet-phy-ieee802.3-c22",
                    phy_compatible: "ethernet-phy-ieee802.3-c22",
                    interface_type: "EMIO",
                    note: "Available for PL-based ethernet via EMIO. Can be used with PL PCS/PMA for SFP+ connectivity."
                },
                {
                    id: "pl_axi_1g",
                    type: "pl_ethernet",
                    label: "AXI 1G/2.5G Ethernet",
                    template: "axi_ethernet",
                    axi_node: "axi_ethernet_1",
                    axi_base_addr: "0xa0000000",
                    phy_mode: "sgmii",
                    interface_type: "PL",
                    note: "AXI 1G/2.5G Ethernet Subsystem with 1G/2.5G PCS/PMA under the hood. "
                },
                {
                    id: "pl_sfp_10g",
                    type: "pl_ethernet",
                    label: "PL SFP+ (10G)",
                    template: "axi_ethernet",
                    axi_node: "axi_ethernet_0",
                    axi_base_addr: "0xa0040000",
                    phy_mode: "10gbase-r",
                    interface_type: "SFP+",
                    note: "Direct SerDes connection, no MDIO"
                }
            ]
        },

        kv260: {
            name: "KV260",
            family: "kria",
            description: "Kria KV260 Vision AI Starter Kit",
            carrier_note: "Official Xilinx Carrier Card",
            interfaces: [
                {
                    id: "ps_gem1_rgmii",
                    type: "ps_gem",
                    label: "PS GEM1 (RGMII)",
                    template: "zynqmp_gem",
                    gem_node: "gem1",
                    phy_addr: "0x1",  // CORRECTED: Was 0x8, audit confirms 0x1
                    phy_label: "phy1",
                    phy_mode: "rgmii-id",
                    phy_model: "ti,dp83867",
                    phy_compatible: "ethernet-phy-id2000.a231",
                    interface_type: "RGMII",
                    reset_gpio: "&gpio 44 0"
                },
                {
                    id: "pl_axi_1g",
                    type: "pl_ethernet",
                    label: "AXI 1G/2.5G Ethernet",
                    template: "axi_ethernet",
                    axi_node: "axi_ethernet_0",
                    axi_base_addr: "0xa0000000",
                    phy_mode: "sgmii",
                    interface_type: "PL",
                    note: "AXI 1G/2.5G Ethernet Subsystem with 1G/2.5G PCS/PMA under the hood. "
                }
            ]
        },

        kd240: {
            name: "KD240",
            family: "kria",
            description: "Kria KD240 Drive Starter Kit",
            carrier_note: "Official Xilinx Carrier Card",
            interfaces: [
                {
                    id: "ps_gem1_rgmii",
                    type: "ps_gem",
                    label: "PS GEM1 (RGMII)",
                    template: "zynqmp_gem",
                    gem_node: "gem1",
                    phy_addr: "0x8",
                    phy_label: "phy8",
                    phy_mode: "rgmii-id",
                    phy_model: "adi,adin1300",  // CORRECTED: Was ti,dp83867, audit confirms adi,adin1300
                    phy_compatible: "ethernet-phy-ieee802.3-c22",
                    interface_type: "RGMII",
                    reset_gpio: "&gpio 44 0"
                },
                {
                    id: "pl_axi_1g",
                    type: "pl_ethernet",
                    label: "AXI 1G/2.5G Ethernet",
                    template: "axi_ethernet",
                    axi_node: "axi_ethernet_0",
                    axi_base_addr: "0xa0000000",
                    phy_mode: "sgmii",
                    interface_type: "PL",
                    note: "AXI 1G/2.5G Ethernet Subsystem with 1G/2.5G PCS/PMA under the hood. "
                }
            ]
        },

        vck190: {
            name: "VCK190",
            family: "versal",
            description: "Versal VCK190 Evaluation Kit (Dual GEM)",
            interfaces: [
                {
                    id: "ps_gem0_rgmii",
                    type: "ps_gem",
                    label: "PS GEM0 (RGMII)",
                    template: "versal_gem",
                    gem_node: "gem0",
                    phy_addr: "0x1",
                    phy_label: "phy1",
                    phy_mode: "rgmii-id",
                    phy_model: "ti,dp83867",
                    phy_compatible: "ethernet-phy-id2000.a231",
                    interface_type: "RGMII"
                },
                {
                    id: "ps_gem1_rgmii",
                    type: "ps_gem",
                    label: "PS GEM1 (RGMII)",
                    template: "versal_gem",
                    gem_node: "gem1",
                    phy_addr: "0x2",
                    phy_label: "phy2",
                    phy_mode: "rgmii-id",
                    phy_model: "ti,dp83867",
                    phy_compatible: "ethernet-phy-id2000.a231",
                    interface_type: "RGMII",
                    note: "Shares MDIO bus with GEM0"
                }
            ]
        },

        vmk180: {
            name: "VMK180",
            family: "versal",
            description: "Versal VMK180 Evaluation Kit (Dual GEM)",
            interfaces: [
                {
                    id: "ps_gem0_rgmii",
                    type: "ps_gem",
                    label: "PS GEM0 (RGMII)",
                    template: "versal_gem",
                    gem_node: "gem0",
                    phy_addr: "0x1",
                    phy_label: "phy1",
                    phy_mode: "rgmii-id",
                    phy_model: "ti,dp83867",
                    phy_compatible: "ethernet-phy-id2000.a231",
                    interface_type: "RGMII"
                },
                {
                    id: "ps_gem1_rgmii",
                    type: "ps_gem",
                    label: "PS GEM1 (RGMII)",
                    template: "versal_gem",
                    gem_node: "gem1",
                    phy_addr: "0x2",
                    phy_label: "phy2",
                    phy_mode: "rgmii-id",
                    phy_model: "ti,dp83867",
                    phy_compatible: "ethernet-phy-id2000.a231",
                    interface_type: "RGMII",
                    note: "Shares MDIO bus with GEM0"
                }
            ]
        }
    }
};

// ============================================================================
// MUTATION LOGIC (Version-Aware "Time Travel" Rules)
// ============================================================================

/**
 * Generate version-specific quirks and properties (Multi-Interface Version)
 * Implements the four critical mutation rules from the audit:
 * 
 * Rule 1: GPIO Reset Shift (2021.1)
 * Rule 2: Versal PTP Clock Mandate
 * Rule 3: TI DP83867 PHY Delays (Hex Precision)
 * Rule 4: ADI ADIN1300 PHY Delays (KD240)
 * 
 * @param {Object} interfaceConfig - Interface configuration object from board.interfaces[]
 * @param {string} version - Vivado/Kernel version (e.g., "2020.1", "2021.1", "2024.2")
 * @param {string} family - Board family (zynqmp, versal, etc.)
 * @returns {Object} { extra_props, phy_delays }
 */
export function getQuirks(interfaceConfig, version, family) {
    let extra_props = [];
    let phy_delays = [];

    if (!interfaceConfig || !version) {
        return { extra_props: '', phy_delays: '' };
    }

    // Parse version (e.g., "2021.1" -> 2021.1)
    const versionFloat = parseFloat(version);

    // ------------------------------------------------------------------------
    // RULE 1: The GPIO Reset Shift (2021.1)
    // ------------------------------------------------------------------------
    // Xilinx changed the property name in 2021.1 and often flipped the active flag
    // Old: phy-reset-gpios = <&gpio 38 0>;  (active-high, in GEM node)
    // New: reset-gpios = <&gpio 38 1>;      (active-low, in PHY node)
    
    if (interfaceConfig.reset_gpio) {
        if (versionFloat >= 2021.1) {
            // Flip the last digit (0 -> 1 or 1 -> 0) for active-low
            const gpio = interfaceConfig.reset_gpio.replace(/ 0$/, ' 1');
            phy_delays.push('\t\t\t\treset-gpios = <' + gpio + '>;  /* Active-low since 2021.1 */');
        } else {
            extra_props.push('\t\tphy-reset-gpios = <' + interfaceConfig.reset_gpio + '>;  /* Active-high before 2021.1 */');
        }
    }

    // ------------------------------------------------------------------------
    // RULE 2: Versal PTP Clock Mandate
    // ------------------------------------------------------------------------
    // Versal family REQUIRES xlnx,ptp-enet-clock or driver crashes on boot
    
    if (family === 'versal') {
        extra_props.push('    xlnx,ptp-enet-clock = <0x0>;  /* MANDATORY for Versal */');
    }

    // ------------------------------------------------------------------------
    // RULE 3: TI DP83867 PHY Delays (Hex Precision)
    // ------------------------------------------------------------------------
    // CRITICAL: Use exact hex strings - DO NOT convert to decimal
    // These values are hardware-calibrated for RGMII skew compensation
    
    if (interfaceConfig.phy_model === 'ti,dp83867') {
        phy_delays.push('\t\t\t\tti,rx-internal-delay = <0x8>;');
        phy_delays.push('\t\t\t\tti,tx-internal-delay = <0xa>;');
        phy_delays.push('\t\t\t\tti,fifo-depth = <0x1>;');
        phy_delays.push('\t\t\t\tti,dp83867-rxctrl-strap-quirk;');
    }

    // ------------------------------------------------------------------------
    // RULE 4: ADI ADIN1300 PHY Delays (KD240-Specific)
    // ------------------------------------------------------------------------
    // Analog Devices ADIN1300 used on KD240 with 2ns RGMII delays
    
    if (interfaceConfig.phy_model === 'adi,adin1300') {
        phy_delays.push('\t\t\t\tadi,rx-internal-delay-ps = <2000>;');
        phy_delays.push('\t\t\t\tadi,tx-internal-delay-ps = <2000>;');
        phy_delays.push('\t\t\t\tadi,fifo-depth-bits = <8>;');
    }

    // For non-TI PHYs (e.g., Micron KSZ9031), add generic delay if needed
    if (interfaceConfig.phy_model === 'micron,ksz9031') {
        phy_delays.push('            /* Generic PHY - adjust delays per datasheet */');
    }

    return {
        extra_props: extra_props.join('\n'),
        phy_delays: phy_delays.join('\n')
    };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get family defaults for a board
 * @param {string} boardId - Board identifier (e.g., "zcu102")
 * @returns {Object} Family configuration
 */
export function getFamilyDefaults(boardId) {
    const board = ETHERNET_DB.boards[boardId];
    if (!board) {
        throw new Error(`Unknown board: ${boardId}`);
    }
    return ETHERNET_DB.families[board.family];
}

/**
 * Get template for a board
 * @param {string} boardId - Board identifier
 * @returns {string} DTS template string
 */
export function getTemplate(boardId) {
    const board = ETHERNET_DB.boards[boardId];
    if (!board) {
        throw new Error(`Unknown board: ${boardId}`);
    }
    return ETHERNET_DB.templates[board.template];
}

/**
 * Replace all placeholders in a template
 * @param {string} template - DTS template with {{PLACEHOLDERS}}
 * @param {Object} replacements - Key-value pairs for substitution
 * @returns {string} Generated DTS code
 */
export function fillTemplate(template, replacements) {
    let result = template;
    for (const [key, value] of Object.entries(replacements)) {
        const placeholder = `{{${key}}}`;
        result = result.replaceAll(placeholder, value);
    }
    return result;
}

/**
 * Generate complete DTS code for a board and version
 * @param {string} boardId - Board identifier
 * @param {string} version - Vivado/Kernel version
 * @returns {string} Complete DTS code
 */
export function generateDTS(boardId, version) {
    const board = ETHERNET_DB.boards[boardId];
    if (!board) {
        throw new Error(`Unknown board: ${boardId}`);
    }

    const template = getTemplate(boardId);
    const quirks = getQuirks(board, version);

    const replacements = {
        GEM_NODE: board.gem_node,
        PHY_LABEL: board.phy_label,
        PHY_MODE: board.phy_mode,
        PHY_ADDR: board.phy_addr,
        PHY_COMPATIBLE: board.phy_compatible,
        EXTRA_PROPS: quirks.extra_props,
        PHY_DELAYS: quirks.phy_delays,
        // AXI Ethernet specific (if applicable)
        AXI_NODE: board.axi_node || 'axi_ethernet_0',
        AXI_BASE_ADDR: board.axi_base_addr || '0x80000000',
        IRQ_NUM: board.irq_num || '89'
    };

    return fillTemplate(template, replacements);
}

/**
 * Get list of all supported boards
 * @returns {Array} Array of board objects with id and name
 */
export function getSupportedBoards() {
    return Object.entries(ETHERNET_DB.boards).map(([id, board]) => ({
        id,
        name: board.name,
        description: board.description,
        family: board.family
    }));
}

/**
 * Validate board and version combination
 * @param {string} boardId - Board identifier
 * @param {string} version - Vivado/Kernel version
 * @returns {Object} { valid, warnings, errors }
 */
export function validateConfiguration(boardId, version) {
    const warnings = [];
    const errors = [];

    // Check board exists
    if (!ETHERNET_DB.boards[boardId]) {
        errors.push(`Unknown board: ${boardId}`);
        return { valid: false, warnings, errors };
    }

    const board = ETHERNET_DB.boards[boardId];
    const versionFloat = parseFloat(version);

    // Version range check
    if (versionFloat < 2020.1 || versionFloat > 2024.2) {
        warnings.push(`Version ${version} is outside tested range (2020.1 - 2024.2)`);
    }

    // Kria carrier card warning
    if (board.family === 'kria' && board.carrier_note) {
        warnings.push(board.carrier_note);
    }

    // Versal PTP clock reminder
    if (board.family === 'versal') {
        warnings.push('Versal requires xlnx,ptp-enet-clock property (auto-included)');
    }

    return {
        valid: errors.length === 0,
        warnings,
        errors
    };
}
