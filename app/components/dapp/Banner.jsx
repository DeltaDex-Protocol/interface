import { BannerInfos } from "../../configs/Banner";


const Banner = ({ Unit }) => {
    const { label, description } = BannerInfos[Unit]

    return (
            <div className={`mb-5 px-4 py-2 bg-violet-500  h-24 rounded-xl flex flex-col`}>
                <span className="sm:text-md text-xl font-medium text-white mt-2">
                    {label}
                </span>
                <span className="text-base font-normal text-white">
                    {description}
                </span>
            </div>
    )
}

export default Banner;