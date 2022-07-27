import {useState} from "react"
import { Range } from "react-range"
import ReactSlider from "react-slider"

const sliderInfos = {
	'strike' : {
		name: "Strike Price",
		min: 300,
		max: 5900,
		step: 50,
		symbol: "$"
	},
	'expiry': {
		name: "Expiration Date",
		min: 5,
		max: 500,
		step: 1,
		symbol: " days"
	},
	'totalValue': {
		name: "Total value invested in Uniswap V2 LP position",
		min: 100,
		max: 20000,
		step: 100,
		symbol: "$"
	},
	'amountOfToken2': {
		name: "How many options you want to replicate (i.e. 1 ETH)",
		min: 1,
		max: 999,
		step: 1,
		symbol: ""
	},
	'deltaHedgesPerDay': {
		name: "Number of delta hedges per day",
		min: 1,
		max: 24,
		step: 1,
		symbol: ""
	},
	'feesToHedgers': {
		name: "Fees to be splitted between hedgers",
		min: 1,
		max: 900,
		step: 1,
		symbol: "$"
	},
	'riskFree': {
		name: "Risk-free rate",
		min: 0,
		max: 0.2,
		step: 0.01,
		symbol: ""
	}
}


export default function Slider(props) {

	const sliderType = props.sliderType;

	// console.log(props);
	const [value, setValue] = useState(sliderInfos[sliderType].min);

	const name = sliderInfos[sliderType].name;
	const sym = sliderInfos[sliderType].symbol;
	const min = sliderInfos[sliderType].min;
	const max = sliderInfos[sliderType].max;
	const step = sliderInfos[sliderType].step;



	return (
		<div className="w-full flex justify-center z-0">
			<div className="min-w-full ">
				{/*<h1 className="text-4xl">Range</h1>*/}
				{/*<label>React Range</label>*/}
				{/*<Range
					step={1}
					min={0}
					max={75}
					values={values}
					onChange={(values) => {
						setValues(values)
					}}
					renderTrack={({ props, children }) => (
						<div
							{...props}
							className="w-full h-3 pr-2 my-4 bg-gray-200 rounded-md"
						>
							{children}
						</div>
					)}
					renderThumb={({ props }) => (
						<div
							{...props}
							className="w-5 h-5 transform translate-x-10 bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						/>
					)}
				/>*/}
				{/*<span>{values[0]}px</span>*/}
{/*				<br />
				<br />
				<hr />
				<br />*/}
				<label className="mt-2 text-base">{name + ":"}<br/>{" "+ value + sym}</label>
				<ReactSlider
					step={step}
					min={min}
					max={max}
					className="w-full h-3 pr-2 my-3 bg-gray-200 rounded-md cursor-grab"
					thumbClassName="absolute w-5 h-5 cursor-grab bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 -top-2px"
					value={value}
					onChange={(value) => {
						setValue(value);
						// here  handler should be added
						props.onChangeToggle(value);
					}}
				/>
				{/*<span>{value}{sym}</span>*/}
			</div>
		</div>
	)
}
