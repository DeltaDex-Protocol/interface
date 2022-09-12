import { SidebarMenuInfos } from '../../configs/sidebar.config.js'



const SidebarUnit = ({Unit, activeUnit, setActiveUnit }) => {
    const bg_color = Unit === activeUnit ? "bg-violet-500" : "bg-gray-100";
    const text_color = Unit === activeUnit ? "text-white" : "text-black";
  
    return (
        <div className={`relative rounded-xl ${bg_color} shadow h-24 w-40 flex flex-col`}
            onClick={() => setActiveUnit(Unit)}>
        <span className={`absolute left-3 top-3 ${text_color} font-medium text-lg`}>
          {SidebarMenuInfos[Unit].label}
        </span>
        <span className={`absolute left-3 top-11 ${text_color} font-normal leading-tight text-sm w-36`}>
          {SidebarMenuInfos[Unit].description}
        </span>
      </div>
    );
  };

  export default SidebarUnit;