import { SidebarMenuInfos } from '../../configs/Sidebar.js'



const SidebarUnit = ({ Menu, onChangeToggle, toggle }) => {
    const bg_color = toggle === Menu ? settings.main_color : "bg-white";
    const text_color = toggle === Menu ? "text-white" : "text-black";
  
    return (
      <div
        className={`relative mt-6 rounded-xl ${bg_color} shadow py-12 px-20 flex flex-col`}
        onClick={() => onChangeToggle(Menu)}
      >
        <span
          className={`absolute left-3 top-3 ${text_color} font-medium text-lg`}
        >
          {SidebarMenuInfos[Menu].label}
        </span>
        <span
          className={`absolute left-3 top-11 ${text_color} font-normal leading-tight text-sm w-36`}
        >
          {SidebarMenuInfos[Menu].description}
        </span>
      </div>
    );
  };

  export default SidebarUnit;