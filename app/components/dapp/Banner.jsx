import { BannerInfos } from "../../configs/banner.config";


const Banner = ({ Unit }) => {
    const { label, description } = BannerInfos[Unit]

    return (
            <div className={`mb-5 px-4 py-2 bg-violet-500  h-24 rounded-xl flex flex-col`}>
                <span className="sm:text-md md:text-lg font-medium text-white mt-2">
                    {label}
                </span>
                <span className="text-sm md:text-md font-normal text-white">
                    {description}
                </span>
            </div>
    )
}

export default Banner;