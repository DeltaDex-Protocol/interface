const SidebarMenuInfos = {
    VanillaOptions: {
      label: "Vanilla options",
      description: "Replicate your vanilla option",
    },
    CurvedOptions: {
      label: "Curved options",
      description: "Hedge against impermanent loss",
    },
    YourPositions: {
      label: "My positions",
      description: "Click to see your current replications",
    },
    AllPositions: {
      label: "All positions",
      description: "View all open positions",
    },
};

const SidebarMenuLabels = Object.keys(SidebarMenuInfos).map(el => SidebarMenuInfos[el].label)


export { SidebarMenuInfos, SidebarMenuLabels }